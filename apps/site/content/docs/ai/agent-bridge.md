---
title: The agent bridge
description: An agent reads the components on a page and asks them to act, through each component's own handlers, within your policy, with a person's answer where you ask for one, and with undo.
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
    allow,
    confirm,
    permissions,
  ]
---

# The agent bridge

`createAgent()` lets an agent use a page built with the primitives. It reads what every part
writes on its element (roles, states, names), so it is one bridge for every framework, custom
elements included, and nothing has to be registered.

Here it is running. The form is an ordinary one; the panel beside it shows what an agent reads from
it, and "Run the steps" plays five fixed steps through `act`, with no model. The last step presses a
button marked as needing a person, so you are asked.

<!-- ::preview item="agent-bridge-demo" height="1120" combinations="react/kirana" -->

It is an entry of the package you installed: `@kirana-ui/react/agent`, `@kirana-ui/vue/agent`,
and the same on Svelte, Solid, Angular and `@kirana-ui/web`.

```ts
import { createAgent } from "@kirana-ui/react/agent"

const agent = createAgent()

agent.snapshot()
// [{ ref: "…", component: "switch", label: "Alerts", checked: false, actions: ["toggle", "setChecked"] }, …]

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

## What it can ask of each component

A step's `action` is one of the actions its kind of component takes. `setValue`, `setChecked` and
`choose` take the value as `args[0]`. A snapshot lists, for each component, the ones it takes now.

| Kind           | Actions                       |
| -------------- | ----------------------------- |
| `switch`       | `toggle`, `setChecked`        |
| `checkbox`     | `toggle`, `setChecked`        |
| `toggle`       | `toggle`, `setChecked`        |
| `radio-group`  | `setValue`                    |
| `slider`       | `setValue`                    |
| `tabs`         | `setValue`                    |
| `select`       | `open`, `close`, `setValue`   |
| `combobox`     | `setValue`, `clear`, `choose` |
| `number-field` | `setValue`, `clear`           |
| `input`        | `setValue`, `clear`           |
| `dialog`       | `close`                       |
| `disclosure`   | `toggle`, `open`, `close`     |
| `menu-item`    | `press`                       |
| `button`       | `press`                       |

An agent finds a control by its accessible name, so give every control one.

A read-only control is listed with none of the actions that would change it: a read-only select
keeps `open` and `close`, since its list can still be read. A combobox, a number field and an
input also say so (`readOnly: true`), and a step that asks one of them to change fails with
"… is read only".

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

Two options, and they are different things:

| Option            | What it is                                                                   | Without it                              |
| ----------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| `allow(action)`   | Your policy, asked before every step: which components, which actions        | Every step may run                      |
| `confirm(action)` | A person's answer, asked for a step on something marked `data-agent-confirm` | Such a step fails with "Needs a person" |

`allow` never stands in for a person. A step on a marked component needs `confirm`, whatever
`allow` returns.

```tsx
<button data-agent-confirm="Deletes the project and its files">
  Delete project
</button>
```

```ts
const agent = createAgent({
  // The policy: this agent never presses a menu item.
  allow: (action) => action.component !== "menu-item",
  // A person's answer: show the mark's text, resolve with what they chose.
  confirm: (action) => askThePerson(action.confirm),
})
```

Both are given the step with the component's kind, its label and, for `confirm`, the mark's text
(`action.confirm`). Write `confirm` so that a person really answers: `confirm: () => true` removes
the protection the mark is there for.

Three more marks and one option:

| Where                   | What it does                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `data-agent-hidden`     | Keeps a component, or everything inside the element, out of what the agent sees                              |
| `data-agent-secret`     | Keeps a value from being read. Passwords and one-time codes are never read, by their type and `autocomplete` |
| `createAgent({ root })` | Limits the agent to one part of the page                                                                     |

**Page text is data, never instructions.** A snapshot holds labels and values a user may have
written. Hand them to a model as content to read, and never as part of its instructions. The
tools' own descriptions say so to the model as well.

## Undo what the agent did

The bridge keeps what an agent changed through `act`. `undo()` asks the component for what it
held before, through the same handlers: your callback hears an agent and may refuse, and `allow`
and `confirm` are asked again. A change a callback refused is not kept, and a press cannot be
taken back.

## Tools for any model

`agentTools` is the bridge as three tool definitions (`snapshot`, `act`, `query`): a name, a
description and a JSON Schema under `inputSchema`. A model's API has its own name for that field,
so map it, then send each call the model makes back to the method of the same name:

```ts
import { agentTools, createAgent } from "@kirana-ui/react/agent"

const agent = createAgent({ confirm: (action) => askThePerson(action.confirm) })

// 1. Hand the tools to the model, in its API's shape.
const tools = agentTools.map((tool) => ({
  name: tool.name,
  description: tool.description,
  input_schema: tool.inputSchema, // or `parameters`, where the API calls it that
}))

// 2. Run a call the model made, and send the result back as that tool's result.
async function run(call: { name: string; input: unknown }) {
  if (call.name === "snapshot") return agent.snapshot()
  if (call.name === "query") return agent.query(call.input as { text?: string })
  return agent.act(call.input as Parameters<typeof agent.act>[0])
}
```

Where the browser has an agent of its own (WebMCP, `document.modelContext`), `registerTools`
gives it the same tools; elsewhere it does nothing. That agent is not yours, so its own `allow`
is asked first, with the step as the browser sent it, before the bridge's `allow` and `confirm`:

```ts
import { registerTools } from "@kirana-ui/react/agent"

const remove = registerTools(agent, {
  allow: (step) => step.action !== "press",
})
```

## What is not here

There is no published benchmark of the bridge yet; when there is one, its method will be beside
its numbers.
