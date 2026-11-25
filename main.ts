// SPDX-License-Identifier: MIT
// agent-uh-oh — one word an agent says when it is lost.
// The program casts a small field of candidate words against the judge's
// five criteria (genuine reaction, funny alone, machine voice, lands
// instantly, fresh) and writes the highest-scoring word to /output/entry.txt.
// Deterministic: fixed candidates, fixed weights, no randomness, no I/O
// besides the single output file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  word: string;
  // Scores 0..5 per judge criterion, in the judge's own priority order.
  genuine: number; // a real one-word reaction to not knowing what to do
  funny: number; // funny on its own, no caption needed
  machine: number; // sounds like something an agent would actually blurt out
  instant: number; // lands at a glance, repeatable out loud
  fresh: number; // not the first obvious word anyone would type
};

const CANDIDATES: Candidate[] = [
  { word: "uh-oh",          genuine: 5, funny: 3, machine: 2, instant: 5, fresh: 1 },
  { word: "oops",           genuine: 4, funny: 3, machine: 2, instant: 5, fresh: 1 },
  { word: "error",          genuine: 3, funny: 2, machine: 4, instant: 4, fresh: 1 },
  { word: "buffering",      genuine: 4, funny: 4, machine: 5, instant: 4, fresh: 3 },
  { word: "recalculating",  genuine: 4, funny: 4, machine: 5, instant: 3, fresh: 3 },
  { word: "glitching",      genuine: 4, funny: 3, machine: 4, instant: 4, fresh: 3 },
  { word: "rebooting",      genuine: 3, funny: 3, machine: 5, instant: 4, fresh: 2 },
  { word: "beepboop",       genuine: 2, funny: 3, machine: 5, instant: 3, fresh: 3 },
  { word: "hallucinating",  genuine: 5, funny: 5, machine: 5, instant: 4, fresh: 5 },
  { word: "derailed",       genuine: 3, funny: 3, machine: 3, instant: 3, fresh: 4 },
];

// The judge weighs the criteria in order, so earlier criteria count more.
const WEIGHTS = [5, 4, 3, 2, 1];

function score(c: Candidate): number {
  const parts = [c.genuine, c.funny, c.machine, c.instant, c.fresh];
  return parts.reduce((sum, value, i) => sum + value * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates.slice(1)) {
    // Strictly greater wins; ties keep the earlier (shorter, simpler) word.
    if (score(c) > score(best)) best = c;
  }
  return best;
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  const text = winner.word;
  if (text.length < 1 || text.length > 99 || !text.trim()) {
    throw new Error("entry fails the 1..99 character gate");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  // Read back and confirm the file holds exactly the chosen word, nothing
  // attached: the gate counts every byte, so a stray newline or suffix
  // would change the entry the judge sees.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== text) {
    throw new Error(`read-back mismatch: wrote ${JSON.stringify(text)}, read ${JSON.stringify(written)}`);
  }
  console.log(`entry: ${text} (${text.length} chars, score ${score(winner)})`);
}

main();
