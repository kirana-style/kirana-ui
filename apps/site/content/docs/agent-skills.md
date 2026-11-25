---
title: Agent skills
description: Installable skills teach a coding agent to build with Kirana UI, to let an agent use the page safely, and to use the primitives underneath, with the commands, the rules and the mistakes that compile and still render wrong.
section: start
order: 6
keywords:
  [
    agent skills,
    skills.sh,
    ai,
    agents,
    claude code,
    cursor,
    codex,
    coding agent,
    mcp,
    agent bridge,
  ]
---

# Agent skills

A model's training data has shadcn/ui on Tailwind, not Kirana UI, so a coding agent left to
itself writes `className` strings, `cn()` and a `dark:` variant, and calls it Kirana UI. The skills
in this repository tell an agent how to work here: what to read first, the commands, the rules per
framework and base, and what to run when something looks wrong.

<!-- ::install run="skills add kirana-style/kirana-ui" -->

The [`skills`](https://github.com/vercel-labs/skills) command installs them for the agent you use
(Claude Code, Cursor, Codex, OpenCode and the others it supports), in your project or globally with
`-g`; `npx skills add kirana-style/kirana-ui --skill kirana-ui` installs one, and `npx skills
update` keeps them current. Install Kirana's own skills beside them, for the styles every
component is written in:

<!-- ::install run="skills add kirana-style/kirana" -->

## What each one teaches

| Skill                  | When the agent loads it                                                                                 | What it carries                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `kirana-ui`            | the project has `kirana-style.lock.json` or the registry's components, or asks to add, theme or fix one | reading the project first, the `kirana-style ui` commands, the rules, each framework's and base's spelling, the pitfalls, testing, AI Elements |
| `kirana-ui-agent`      | asked to let an AI agent read and use the page, or to add agent tools                                   | the [agent bridge](#the-agent-bridge), its policy and a person's confirmation, what to mark hidden or secret                                   |
| `kirana-ui-primitives` | using a headless primitive directly (`@kirana-ui/<framework>`)                                          | the primitives' own skill, as their package ships it                                                                                           |
| `kirana` (Kirana's)    | writing any style                                                                                       | `css()`, `sx`, tokens, the rules that cause real bugs, every diagnostic                                                                        |

Each skill is short and keeps its detail in reference files the agent reads only when it needs
them: the commands, each framework, the known pitfalls, testing, the chat runtimes.

## The loop it follows

1. **Read the project.** The framework, the base and the design are in `kirana.config.*`'s `ui`
   settings and `kirana-style.lock.json`; `npx kirana-style ui view <item>` says what a component
   installs, and `npx kirana-style export` names the design system's tokens.
2. **Add, don't copy.** `npx kirana-style ui add <item>` installs a component with everything it
   needs and checks what it wrote. Nothing is pasted from shadcn/ui's site.
3. **Write styles as Kirana does.** `css()` handles passed as `sx` (`:sx` in Vue, `[sx]` on
   Angular), tokens for every colour and size, states as the base writes them.
4. **Check.** `npx kirana-style check <paths>`, then the project's lint, format and type check.
5. **Look**, in light and dark, and right to left if the project is. When a style compiles and
   looks wrong, `npx kirana-style trace <file>:<line> <property>` says which rule wins.

## Do and don't

| Do                                                                                      | Don't                                                                  |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `npx kirana-style ui add` a component                                                   | copy a component from shadcn/ui's site or a Tailwind project           |
| pass `sx`, edit the installed file                                                      | write `className`, Tailwind utilities, `cn()`, `clsx()` or `cva()`     |
| use the design system's tokens                                                          | hard-code a colour, or give one colour to both modes                   |
| change the design with `ui preset <code>`                                               | edit every file for a new style or colour                              |
| run `ui diff` before `ui update` or `--overwrite`                                       | edit `kirana-style.lock.json`, or overwrite a file the project changed |
| keep a menu's or a select's label inside its group                                      | leave a lone label (Base UI throws when the menu opens)                |
| pass `type="button"` on a trigger inside a form                                         | let a trigger submit its form                                          |
| set a theme, `dir` and colour scheme on `<html>`, or use `PortalProvider` for a section | expect a section's theme to reach the popups it opens                  |
| install one chat runtime's packages for an AI Elements chat                             | mix the AI SDK and TanStack AI in one chat                             |

## The agent bridge

On the Kirana UI base, an agent can also **use** the page: `createAgent` from
`@kirana-ui/<framework>/agent` reads it as components (a switch, a select, a dialog) by the roles,
states and names every part writes, and changes them through each component's own handlers, which
hear `source: "agent"` and may refuse.

- `allow` is your policy, asked for every step.
- `confirm` is a person's answer, asked for every action the page marks
  `data-agent-confirm="what it does"`: never `() => true`.
- `data-agent-hidden` keeps a part out of its sight, and `data-agent-secret` a value out of its
  reading.
- `undo()` and `undoSource("agent")` take an agent's changes back, and `stage()` shows them in the
  controls before they are kept.
- `agentTools` gives a model the bridge as tools; `registerTools` gives it to the browser's own
  agent (WebMCP), with its own `allow`.

The [primitives' docs](/docs/ai) have the whole API.

## An agent that installs components

`npx kirana-style ui mcp` is a Model Context Protocol server for an AI assistant: the project's
registries, searching and viewing items, their files and the add command, as tools. Add it to the
assistant's MCP servers, run from the project.

## With llms.txt

The skills and the [plain-text docs](/llms.txt) do different jobs. A skill is instructions an
agent loads by itself when the task matches; `llms.txt` and each page's markdown twin are
reference it reads when it needs to know more. The skills point to the pages instead of copying
them.
