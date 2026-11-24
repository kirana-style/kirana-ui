---
title: AI
description: Agents can build with Kirana UI, and agents can use what you build. What each means, and what generative UI is and is not here.
section: ai
order: 1
keywords: [ai, agents, llms.txt, skill, agent bridge, webmcp, generative ui]
---

# AI

"Built for agents" means two different things, and Kirana UI does both. Neither is generative UI,
which is a third thing and has its own page.

## Agents build with it

The package you install holds a reference of every part and prop (`llms.txt`), a skill and the
checks, for the version you installed.

[Agents build with it](/docs/ai/agents-build)

To start a project that way, copy a prompt for your framework and paste it into your coding agent:

<!-- ::copy-prompt -->

## Agents use what you build

`createAgent()` reads the components on a page built with Kirana UI and asks them to act, through
each component's own handlers. Your policy decides what it may do, a person answers where you ask
for one, and its changes can be undone.

[The agent bridge](/docs/ai/agent-bridge)

## Generative UI

A model choosing from a catalog of real components and filling their props. It is in design, and
not shipped.

[Generative UI](/docs/ai/generative-ui)
