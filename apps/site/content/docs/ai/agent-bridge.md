---
title: The agent bridge
description: An agent reads the components on a page and asks them to act, through each component's own handlers, with your permission and with undo.
section: ai
order: 3
keywords:
  [
    agent bridge,
    createAgent,
    snapshot,
    act,
    query,
    webmcp,
    tools,
    undo,
    permissions,
  ]
---

# The agent bridge

`createAgent()` from `@kirana-ui/core/agent` lets an agent use a page built with the primitives.
It reads what every part writes on its element, so it is one bridge for every framework, custom
elements included, and nothing has to be registered.

```ts
import { createAgent } from "@kirana-ui/core/agent"

const agent = createAgent()

agent.snapshot()
// [{ ref: "…", component: "switch", label: "Alerts", checked: false, actions: ["setChecked", "toggle"] }, …]

await agent.act({ steps: [{ ref: "Alerts", action: "toggle" }] })
```

| Method                          | What it does                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `snapshot()`                    | The components in the page now: each one's `ref`, kind, label, state and the actions it takes now     |
| `act({ steps })`                | Runs steps in order. A step names a component by its `ref` or its label, an action, and its arguments |
| `query({ text, within, kind })` | Finds components by label or kind; with `within`, the choices of one list, opened to read if closed   |
| `subscribe(listener)`           | Hears the components that changed, a moment after they do                                             |
| `history()`                     | What the agent changed through `act`, the oldest first. A person's changes are not in it              |
| `undo()`, `redo()`              | Takes the agent's last change back, and makes it again                                                |

## It asks the way a person does

A step is a press, typed text or a key on the part's own element. So a change an agent makes
reaches the same callback a person's does, marked as the agent's, and your code can refuse it:

```tsx
<Switch.Root
  onCheckedChange={(checked, details) => {
    if (details.source === "agent" && !checked) details.cancel()
  }}
/>
```

`act` returns each component as it is after its step, so the agent sees a change that was
refused. An action is one the part's element supports, not any method of your code.

## You decide what an agent may do

- `createAgent({ allow })` is asked before every step, with the component, its label and the
  action. Return `false` to refuse it.
- `data-agent-confirm="Deletes the project"` on or around a component marks it as needing a
  person. Without `allow`, a step on it fails with "Needs a person".
- `data-agent-hidden` keeps a component out of what the agent sees.
- `data-agent-secret` keeps a value from being read. Passwords and one-time codes are never read
  out, by their input type and `autocomplete`.
- `createAgent({ root })` limits the agent to one part of the page.

## Undo what the agent did

The bridge keeps what an agent changed through `act`. `undo()` asks the component for what it
held before, through the same handlers, so your callback hears an agent and may refuse. A change
a callback refused is not kept, and a press cannot be taken back.

## Tools for any model

`agentTools` is the bridge as tool definitions: a name, a description and a JSON Schema for each
of `snapshot`, `act` and `query`, to hand to a model's tool-calling API.

```ts
import { agentTools, registerTools } from "@kirana-ui/core/agent"

// Where the browser has an agent of its own (WebMCP, `document.modelContext`), give it the tools.
// Elsewhere this does nothing.
const remove = registerTools(agent, {
  allow: (step) => confirm(`${step.action} ${step.ref}?`),
})
```

## What is not here

There is no published benchmark of the bridge yet; when there is one, its method will be beside
its numbers.
