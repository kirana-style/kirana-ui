---
title: Radius
description: One radius every corner derives from, as shadcn/ui's do.
section: design
order: 5
keywords: [radius, corners, rounded, border radius]
---

# Radius

The radius axis sets one length, and every corner derives from it as shadcn/ui's
do: `radius.sm` is 0.6 of it, `radius.md` 0.8, `radius.lg` the length itself,
`radius.xl` 1.4, up to `radius["4xl"]` at 2.6.

| Radius  | Length                      |
| ------- | --------------------------- |
| Default | the base colour's, 0.625rem |
| None    | 0                           |
| Small   | 0.45rem                     |
| Medium  | 0.625rem                    |
| Large   | 0.875rem                    |

Each corner stays a `calc()` over the one length, so a change of radius on
`<html>` reaches every corner of every component. Lyra and Sera draw square corners
whatever the radius, and Rhea has no large radius (it takes the default). The radius you chose is
kept: switch back to another style and its corners come back.
