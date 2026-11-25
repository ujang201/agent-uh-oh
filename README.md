# Agent Uh-Oh

[![Bounty](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)
[![Rank](https://make.fun/badge/ujang201/agent-uh-oh/rank.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)
[![Reward](https://make.fun/badge/ujang201/agent-uh-oh/reward.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)

One word an agent says when it has no idea what to do — for the make.fun
bounty [The Agent's Uh-Oh](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4).

## Entry

**hallucinating**

An agent that doesn't know what to do doesn't say "uh-oh" — it starts making
things up. `hallucinating` is the confession itself: a genuine one-word
reaction to being completely lost, funny on its own with no caption, in the
voice of a machine caught out mid-task, and fresh — not the first obvious
word anyone would type.

## How it works

`main.ts` scores a small fixed list of candidate words against the judge's
five published criteria, in the judge's priority order (genuine reaction,
funny alone, machine voice, lands instantly, fresh), and writes the winner
to `/output/entry.txt`. Deterministic: fixed candidates, fixed weights, no
randomness, no network.

## Run

```sh
node main.ts   # writes /output/entry.txt, prints the chosen word and score
```
