---
title: AI
description: What an agent does with Kirana UI. It builds with it, it drives the page you build, and it composes interfaces from it, which is being built.
section: ai
order: 1
keywords: [ai, agents, llms.txt, skill, agent bridge, webmcp, generative ui]
---

# AI

An agent does three things with a design system: it builds with it, it uses the page that results,
and it answers with an interface made of it. Kirana UI is built for the first two today, and says
plainly where the third stands.

| What an agent does | What you get                                                               | State       | Start here                                    |
| ------------------ | -------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| **Builds** with it | A project set up and components added correctly, checked by a compiler     | Released    | [Agents build with it](/docs/ai/agents-build) |
| **Drives** it      | An agent reads the page's controls and acts on them, within your rules     | Released    | [The agent bridge](/docs/ai/agent-bridge)     |
| **Composes** it    | An agent answers with an interface made of the components your project has | Being built | [Generative UI](/docs/ai/generative-ui)       |

## Build: your agent sets it up

Copy a prompt for your framework and paste it into your coding agent in an empty folder. It runs
one command, installs the [agent skills](/docs/agent-skills), adds a first component and runs the
project's checks:

<!-- ::copy-prompt -->

The package you install also holds a reference of every part and prop (`llms.txt`), a skill and
the checks, for the version you installed. Every page of these docs has a Markdown twin an agent
can read: the "Copy page" button at the top of a page gives it.

[Agents build with it](/docs/ai/agents-build)

## Drive: an agent uses what you build

`createAgent()` reads the components on a page built with Kirana UI and asks them to act, through
each component's own handlers. Your policy decides what it may do, a person answers where you ask
for one, and its changes can be undone.

| Guide                                                                         | What you end with                                             |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [The agent bridge](/docs/ai/agent-bridge)                                     | The bridge running, and everything it can read and do         |
| [Make a screen ready for an agent](/docs/ai/make-a-screen-ready-for-an-agent) | A checklist walked: names, marks, a narrow root, a policy     |
| [Test what an agent can do](/docs/ai/test-what-an-agent-can-do)               | A test that fails when a screen stops being safe for an agent |
| [Run the model on your server](/docs/ai/run-the-model-on-your-server)         | A chat that drives the page, the model on your server         |
| [WebMCP](/docs/ai/webmcp)                                                     | The page's tools offered to the browser's own agent           |

## Compose: an agent answers with your components

A model choosing from a catalog of real components and filling their props, never writing code
that runs. The registry's components are published as that catalog; nothing draws an interface
from it yet.

[Generative UI](/docs/ai/generative-ui)
