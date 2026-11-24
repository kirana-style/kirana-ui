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
is asked first, with the step as the browser sent it, before the bridge's `allow` and `confirm`. It is
asked for every step of a call before any of them runs, so one refusal means none run
([WebMCP](/docs/ai/webmcp) has the whole order):

```ts
import { registerTools } from "@kirana-ui/react/agent"

const remove = registerTools(agent, {
  allow: (step) => step.action !== "press",
})
```

## On each headless library

The bridge reads a page by its ARIA roles, so nothing is registered and it is not tied to one
library. How much of a page it can use depends on what that library's markup says. This is the
bridge at 0.3.0 on this site's own demo of each control, for every framework and base the registry
has: is the control found, does it have a name an agent can use, and does one action change what
the next snapshot says.

| Framework and base      | Input | Switch       | Checkbox     | Toggle | Radio group | Select    | Tabs      | Slider             | Disclosure | Dialog    |
| ----------------------- | ----- | ------------ | ------------ | ------ | ----------- | --------- | --------- | ------------------ | ---------- | --------- |
| React · Kirana UI       | yes   | yes, unnamed | yes, unnamed | yes    | no effect   | yes       | yes       | unnamed, no effect | yes        | yes       |
| React · Base UI         | yes   | yes          | yes          | yes    | yes         | yes       | yes       | not found          | yes        | no effect |
| React · React Aria      | yes   | no effect    | not found    | yes    | no effect   | not found | yes       | not found          | yes        | yes       |
| React · UI SDK          | yes   | yes          | yes          | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Vue · Kirana UI         | yes   | yes, unnamed | yes, unnamed | yes    | no effect   | yes       | yes       | unnamed, no effect | yes        | yes       |
| Vue · Ark UI            | yes   | not found    | not found    | yes    | no effect   | yes       | yes       | unnamed, no effect | no effect  | yes       |
| Vue · Reka UI           | yes   | yes          | yes          | yes    | yes         | no effect | no effect | unnamed, no effect | yes        | yes       |
| Vue · UI SDK            | yes   | yes          | yes          | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Svelte · Kirana UI      | yes   | yes, unnamed | yes, unnamed | yes    | no effect   | yes       | yes       | unnamed, no effect | yes        | yes       |
| Svelte · Ark UI         | yes   | not found    | not found    | yes    | no effect   | yes       | yes       | unnamed, no effect | no effect  | yes       |
| Svelte · Bits UI        | yes   | yes          | yes          | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Svelte · UI SDK         | yes   | yes          | yes          | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Solid · Kirana UI       | yes   | yes, unnamed | yes, unnamed | yes    | no effect   | yes       | yes       | yes, unnamed       | yes        | yes       |
| Solid · Ark UI          | yes   | not found    | not found    | yes    | no effect   | yes       | yes       | unnamed, no effect | no effect  | yes       |
| Solid · UI SDK          | yes   | yes          | yes          | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Angular · Kirana UI     | yes   | yes, unnamed | yes, unnamed | yes    | no effect   | yes       | yes       | yes, unnamed       | yes        | yes       |
| Angular · NG Primitives | yes   | yes, unnamed | yes, unnamed | yes    | yes         | yes       | yes       | not found          | yes        | yes       |

| Result             | What it means                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------- |
| yes                | Found, named, and the action took effect                                                 |
| yes, unnamed       | The action took effect, but the control has no name: an agent reaches it by its ref only |
| no effect          | Found and named, and the action changed nothing (or its choices could not be read)       |
| unnamed, no effect | Found, with no name, and the action changed nothing                                      |
| not found          | The bridge does not see a control of that kind on the page                               |

What the table says, plainly:

- **Inputs, toggles and dialogs work nearly everywhere.** Selects, tabs and disclosures work on most.
- **A slider is set on Solid and Angular only.** Elsewhere the bridge moves it one step and still
  reports success. Do not ask an agent to set a slider yet; use a number input.
- **A radio group's choices are not read on the Kirana UI base** or on Ark UI and React Aria, so
  an agent cannot choose one by its value there.
- **A switch or a checkbox named by a `<label for>` has no name on the Kirana UI base.** Name it
  with `aria-labelledby` or `aria-label` on the control itself, as the demo above does.

Each gap is recorded against the bridge. The table is made by `scripts/agent-bridge-bases.ts` in
this site's repository, which you can run against the built site.

## Where to go next

| Guide                                                                         | For                                                        |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Make a screen ready for an agent](/docs/ai/make-a-screen-ready-for-an-agent) | The checklist before an agent is let onto a screen         |
| [Test what an agent can do](/docs/ai/test-what-an-agent-can-do)               | A test that keeps the checklist true                       |
| [Run the model on your server](/docs/ai/run-the-model-on-your-server)         | A model on your server driving the page through the bridge |
| [WebMCP](/docs/ai/webmcp)                                                     | Offering the tools to the browser's own agent              |

## Against driving the page from outside

One task (nine changes to a settings screen of eight controls, then Save), one model, three ways
of reaching the page. Medians of three runs each; every run did the task.

| How the agent reached the page                    | Tool calls | Tokens | Time    |
| ------------------------------------------------- | ---------- | ------ | ------- |
| Playwright's command-line tool, one action a call | 22         | 65,347 | 118.0 s |
| Playwright's command-line tool, free to chain     | 5          | 60,609 | 43.1 s  |
| The agent bridge                                  | 6          | 59,871 | 33.4 s  |

- Against a browser tool that takes one action per call, the bridge needed 73 % fewer tool calls
  and 72 % less time.
- Against the same tool chaining its commands in one call, the bridge was 22 % faster, with the
  same tokens.
- It is not a large saving in tokens on a screen this small: most of each total is the agent's own
  fixed context.

The method, every run, the prompts and what this does not show (three runs, one model, one screen,
no cost in money) are in the repository, to run again:
[benchmarks/agent](https://github.com/kirana-style/kirana-ui/tree/main/benchmarks/agent).

What the bridge changes is less the cost than who is in charge:

| With a tool driving the browser from outside                    | With the bridge                                                           |
| --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| It reads what the page shows, a password field's value included | A secret is read back as `[redacted]`                                     |
| It can press anything a person can                              | Your `allow` decides, and a marked step waits for a person                |
| It needs a browser it controls                                  | It runs in the page: your own chat, or the browser's agent through WebMCP |
| Your code cannot tell its press from a person's                 | A change is marked as the agent's, and your callback may refuse it        |

## What it does not do

- **It reads controls, not the page's text.** An agent cannot confirm a message like "Saved." from
  a snapshot. In the measurement above, the bridge's runs saved correctly and could not see that
  the page said so.
- **`act` takes no signal.** A call runs its steps to the end; to let a person stop a turn, run
  one step per call and check between them
  ([Run the model on your server](/docs/ai/run-the-model-on-your-server) shows it).
- **Not every kind of control on every library.** See the table above.
