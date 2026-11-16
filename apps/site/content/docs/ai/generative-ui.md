---
title: Generative UI
description: A model choosing from a catalog of real components and filling their props. In design, not shipped.
section: ai
order: 4
status: planned
keywords: [generative ui, catalog, model, registry, mcp, declarative]
---

# Generative UI

**In design. Not shipped, as of November 2026.**

Generative UI here means one thing: a model chooses from a catalog of real components and fills
their props. It never writes code that runs. The primitives do not generate interfaces, and
neither does the agent bridge.

## What exists today

- **A catalog a model can choose from.** The registry's items are served to an agent by
  `kirana-style ui mcp`. See [Registry](/docs/registry).
- **Every part's states and props, as data a model can be given.** `@kirana-ui/vocabulary` and
  each adapter's `llms.txt`. See [Agents build with it](/docs/ai/agents-build).

## What is being designed

A declarative tree of components a model emits, a validator that checks it against the catalog,
and a renderer for each framework. Until those exist, this site does not say that Kirana UI
generates interfaces from a prompt, streams them, or works with any generative UI protocol.
