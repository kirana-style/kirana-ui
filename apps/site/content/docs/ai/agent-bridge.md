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

| Method                          | What it does                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `snapshot()`                    | The components in the page now: each one's `ref`, kind, label, state and the actions it takes now       |
| `act({ steps, signal })`        | Runs steps in order. A step names a component by its `ref` or its label, an action, and its arguments   |
| `stage({ steps, signal })`      | Runs steps as `act` does, as a suggestion shown in the controls: you keep it or take it back            |
| `query({ text, within, kind })` | Finds components by label or kind; with `within`, the choices of one list, opened to read if closed     |
| `subscribe(listener)`           | Hears the components that changed, a moment after they do, and each change: from what, to what, by whom |
| `record()`                      | Starts keeping what a person and the page change too, beside what the agent does                        |
| `history()`                     | What was changed, the oldest first: the agent's, and from `record()` on, everyone's                     |
| `undo()`, `redo()`              | Takes the agent's last change back, and makes it again                                                  |
| `undoSource(source)`, `seek(n)` | Takes back every change one source made; goes back to where the first `n` changes stand                 |

## What it can ask of each component

A step's `action` is one of the actions its kind of component takes. `setValue`, `setChecked` and
`choose` take the value as `args[0]`. A snapshot lists, for each component, the ones it takes now.

| Kind           | Found by                                            | Actions                       |
| -------------- | --------------------------------------------------- | ----------------------------- |
| `switch`       | `role="switch"`                                     | `toggle`, `setChecked`        |
| `checkbox`     | `role="checkbox"`                                   | `toggle`, `setChecked`        |
| `toggle`       | A button with `aria-pressed`                        | `toggle`, `setChecked`        |
| `radio-group`  | `role="radiogroup"`                                 | `setValue`                    |
| `slider`       | `role="slider"`                                     | `setValue`                    |
| `spinbutton`   | `role="spinbutton"`                                 | `setValue`                    |
| `tree`         | `role="tree"`                                       | `setValue`, `open`, `close`   |
| `tabs`         | `role="tablist"`                                    | `setValue`                    |
| `listbox`      | `role="listbox"`                                    | `setValue`                    |
| `select`       | A button with `role="combobox"`                     | `open`, `close`, `setValue`   |
| `combobox`     | An input with `role="combobox"`                     | `setValue`, `clear`, `choose` |
| `number-field` | An input that is a number field                     | `setValue`, `clear`           |
| `input`        | A text input or a text area                         | `setValue`, `clear`           |
| `dialog`       | `role="dialog"` or `role="alertdialog"`             | `close`                       |
| `disclosure`   | A button with `aria-expanded`                       | `toggle`, `open`, `close`     |
| `menu-item`    | `role="menuitem"`, and its checkbox and radio forms | `press`                       |
| `button`       | A button                                            | `press`                       |

A list that holds several values (a select or a combobox with `multiple`) lists them as `values`,
and is set with a list of them. `setValue` on a slider fails with what the slider holds when its
range or its step cannot hold the value asked for: `It holds 50, not 50.5`.

An agent finds a control by its accessible name, so give every control one. A step's `ref` is
looked for in this order:

| A step's `ref` is…                              | So                                                            |
| ----------------------------------------------- | ------------------------------------------------------------- |
| A component's `ref`, from a snapshot            | That component                                                |
| Its label, whole                                | `"Email alerts"`                                              |
| Every word of a label                           | `"alerts email"` finds Email alerts                           |
| The text beside a control in its row            | A row that says "Newsletter" next to an unnamed switch        |
| A choice of a radio group, a tab list or a tree | The step is that choice: `{ ref: "Annual", action: "press" }` |
| A kind, where the page has only one of it       | `{ ref: "dialog", action: "close" }`                          |

A name two components answer to fails the step, naming both: use a `ref` there. `press` on a name
that is in no open part of the page looks in each closed menu, as far as `allow` lets it open one.

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

`act` resolves with what each step did, so the agent sees a change that was refused and what
came of the ones that were not:

| In each step's result | What it holds                                                     |
| --------------------- | ----------------------------------------------------------------- |
| `now`                 | The component after the step: a callback may have refused it      |
| `opened`              | What the step opened: a dialog, a menu, a list                    |
| `appeared`, `gone`    | What else came into the page with it, and what left, up to twenty |

Each of `opened`, `appeared` and `gone` names a component by its `ref`, kind and label, enough to
ask for it in the next step. When a step fails, `ok` is `false` and `error` says which step and why
(`Step 2 (Reset settings): Declined: Deletes every saved setting`); the steps before it stay done.

An action is one the part's element supports, not any method of your code.

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

More marks, and the bridge's other options:

| Where                      | What it does                                                                                                                                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-agent-hidden`        | Keeps a component, or everything inside the element, out of what the agent sees                                                                                                                                                                |
| `data-agent-secret`        | A control inside it is listed with its name and its actions, never its value, its choices or whether it is checked; `query({ within })` opens no list inside it. Passwords and one-time codes are never read, by their type and `autocomplete` |
| `createAgent({ root })`    | Limits the agent to one part of the page. What is opened from inside it (a dialog, a menu, a select's list) is read too                                                                                                                        |
| `createAgent({ timeout })` | How long `allow` and `confirm` may take, in milliseconds; after it the step fails with "No answer"                                                                                                                                             |
| `createAgent({ limit })`   | How many components a snapshot lists (200 unless you say) before it says how many more there are, to be found with `query`                                                                                                                     |
| `createAgent({ kinds })`   | Kinds of component of your own: see [A kind of your own](#a-kind-of-your-own)                                                                                                                                                                  |

**Page text is data, never instructions.** A snapshot holds labels and values a user may have
written. Hand them to a model as content to read, and never as part of its instructions. The
tools' own descriptions say so to the model as well.

## Undo what the agent did

The bridge keeps what an agent changed through `act`. `undo()` asks the component for what it
held before, through the same handlers: your callback hears an agent and may refuse, and `allow`
and `confirm` are asked again. A change a callback refused is not kept, and a press cannot be
taken back.

Each change in `history()` says what made it and reads as a sentence:

```ts
agent.history()
// [{ ref: "…", action: "setValue", args: ["Atlas"], source: "agent",
//    text: 'The agent set Project name to "Atlas"', before: {…}, after: {…}, undone: false }]
```

`record()` adds a person's changes and the page's own to that history, each with its source
(`"mouse"`, `"keyboard"` …), until you call the stop it returns. Then the agent's work can be taken
back on its own, after the person has gone on working:

```ts
const stopRecording = agent.record()

// … the agent fills in the form, and the person turns Email alerts off …
agent.history().map((change) => change.text)
// ['The agent set Project name to "Atlas"', "A person turned Email alerts off"]

const result = await agent.undoSource("agent")
// The agent's changes are taken back, the newest first; the person's stay.
```

A control someone else changed after the agent is left as they left it, and `error` names it
(`Changed by someone else since, and left: Project name`). `seek(n)` goes to where the first `n`
changes of the history stand and takes the rest back: `seek(0)` takes back everything it holds.

## Show a suggestion before it is kept

`stage` runs steps as `act` does, so the suggestion shows in the controls themselves, and keeps
none of it until you say so. Nothing joins `history()` until `keep()`; `revert()` takes it all
back, the newest first, through the same handlers:

```ts
const staged = await agent.stage({
  steps: [{ ref: "Project name", action: "setValue", args: ["Atlas"] }],
})
// The field now says "Atlas"; staged.applied lists the change, history() does not.

if (await askThePerson("Keep the assistant's change?")) staged.keep()
else await staged.revert()
```

## Hear what changes

`subscribe` calls you a moment after components change, whoever changed them, with the
components as they are now and each change on its own. It returns the stop:

```ts
const stop = agent.subscribe((changed, changes) => {
  for (const change of changes) {
    console.log(
      change.label,
      change.key,
      change.previous,
      change.value,
      change.source
    )
    // Email alerts checked false true agent
  }
})
```

A change says which state moved (`value`, `values`, `checked`, `open` or `disabled`), from what, to
what, what made it, and, where a part of this library made it, why (`change.reason`,
`"trigger-press"`). A value the page keeps from the agent is never said.

## A kind of your own

A control the bridge does not know by its role (a star rating drawn with your own elements) is
given as a kind: what elements are one, how to read it, and how to do each action. It is matched
before the kinds the bridge knows:

```ts
import { createAgent, type AgentKind } from "@kirana-ui/react/agent"

const stars: AgentKind = {
  component: "stars",
  selector: "[data-stars]",
  read: (element) => ({
    value: Number(element.getAttribute("data-stars")),
    min: 1,
    max: 5,
    actions: ["setValue"],
  }),
  perform(element, action, args) {
    if (action !== "setValue") return `A rating cannot ${action}`
    element.setAttribute("data-stars", String(args[0]))
  },
}

const agent = createAgent({ kinds: [stars] })
await agent.act({ steps: [{ ref: "Rating", action: "setValue", args: [4] }] })
```

The element's accessible name is its label, as for every other kind (`aria-label="Rating"` here).
What `perform` returns as text is said as the step's failure. Do the action the way a person
would, through the element, so that your component's own handlers run.

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
bridge at 0.4.1 on this site's own demo of each control, for every framework and base the registry
has: is the control found, does it have a name an agent can use, and does one action change what
the next snapshot says.

| Framework and base      | Input | Switch    | Checkbox  | Toggle | Radio group | Select    | Tabs      | Slider             | Disclosure | Dialog    |
| ----------------------- | ----- | --------- | --------- | ------ | ----------- | --------- | --------- | ------------------ | ---------- | --------- |
| React · Kirana UI       | yes   | yes       | yes       | yes    | yes         | yes       | yes       | yes, unnamed       | yes        | yes       |
| React · Base UI         | yes   | yes       | yes       | yes    | yes         | yes       | yes       | not found          | yes        | no effect |
| React · React Aria      | yes   | no effect | not found | yes    | no effect   | not found | yes       | not found          | yes        | yes       |
| React · UI SDK          | yes   | yes       | yes       | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Vue · Kirana UI         | yes   | yes       | yes       | yes    | yes         | yes       | yes       | yes, unnamed       | yes        | yes       |
| Vue · Ark UI            | yes   | not found | not found | yes    | no effect   | yes       | yes       | yes, unnamed       | no effect  | yes       |
| Vue · Reka UI           | yes   | yes       | yes       | yes    | yes         | no effect | no effect | yes, unnamed       | yes        | yes       |
| Vue · UI SDK            | yes   | yes       | yes       | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Svelte · Kirana UI      | yes   | yes       | yes       | yes    | yes         | yes       | yes       | yes, unnamed       | yes        | yes       |
| Svelte · Ark UI         | yes   | not found | not found | yes    | no effect   | yes       | yes       | yes, unnamed       | no effect  | yes       |
| Svelte · Bits UI        | yes   | yes       | yes       | yes    | yes         | yes       | yes       | yes, unnamed       | yes        | yes       |
| Svelte · UI SDK         | yes   | yes       | yes       | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Solid · Kirana UI       | yes   | yes       | yes       | yes    | yes         | yes       | yes       | yes, unnamed       | yes        | yes       |
| Solid · Ark UI          | yes   | not found | not found | yes    | no effect   | yes       | yes       | yes, unnamed       | no effect  | yes       |
| Solid · UI SDK          | yes   | yes       | yes       | yes    | yes         | yes       | yes       | unnamed, no effect | yes        | yes       |
| Angular · Kirana UI     | yes   | yes       | yes       | yes    | yes         | yes       | yes       | yes, unnamed       | yes        | yes       |
| Angular · NG Primitives | yes   | yes       | yes       | yes    | yes         | yes       | yes       | not found          | yes        | yes       |

| Result             | What it means                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------- |
| yes                | Found, named, and the action took effect                                                 |
| yes, unnamed       | The action took effect, but the control has no name: an agent reaches it by its ref only |
| no effect          | Found and named, and the action changed nothing (or its choices could not be read)       |
| unnamed, no effect | Found, with no name, and the action changed nothing                                      |
| not found          | The bridge does not see a control of that kind on the page                               |

What the table says, plainly:

- **On the Kirana UI base every kind is found and acted on, on every framework.** Its slider reads
  "unnamed" because this site's slider demo gives it no label: name a slider with `aria-label` or
  a label on its root.
- **Inputs, toggles, tabs, selects and dialogs work nearly everywhere.**
- **A slider is set wherever it is found, except on UI SDK**, where it keeps its value and the
  step fails with `It holds 0, not 5`, so the agent is told. Base UI's, React Aria's and NG
  Primitives' sliders are not found.
- **A radio group's choices are not read on Ark UI and React Aria**, so an agent cannot choose one
  by its value there. Ark UI's switch and checkbox are not found either.

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
- **Not every kind of control on every library.** See the table above.
