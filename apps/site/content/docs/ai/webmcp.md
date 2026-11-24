---
title: WebMCP
description: Offer the agent bridge's tools to the browser's own agent with registerTools, under your policy and a person's answer. In a browser without WebMCP it does nothing.
section: ai
order: 3.4
keywords:
  [
    webmcp,
    modelContext,
    registerTools,
    registerTool,
    browser agent,
    agent bridge,
    allow,
    confirm,
    readOnlyHint,
    untrustedContentHint,
  ]
---

# WebMCP

WebMCP lets a page offer tools to the agent built into the browser, through
`document.modelContext`. `registerTools` gives that agent the [agent bridge](/docs/ai/agent-bridge)'s
three tools, so it can read your page and act on it the way a person does.

At the end of this page you have a page that offers its tools while it is shown, refuses the steps
your policy refuses, asks a person before anything marked, and removes the tools when it goes
away. In a browser without WebMCP the same page works as before.

| You bring                       | The browser brings                |
| ------------------------------- | --------------------------------- |
| The page, its policy, `confirm` | The agent and the model behind it |

You do not call a model or hold an API key. If you want your own model instead, see
[Run the model on your server](/docs/ai/run-the-model-on-your-server).

## Check that a browser has it

Paste this into the browser's console on any page:

```js
typeof document.modelContext?.registerTool
```

`"function"` means the browser has WebMCP. `"undefined"` means it does not, and `registerTools`
will do nothing there.

## 1. Install

Start from a project with `@kirana-ui/react` installed (see
[Installation](/docs/primitives/installation)). The bridge is an entry of the package, so there is
nothing else to add:

<!-- ::install packages="@kirana-ui/react" -->

The same functions are exported by every adapter: `@kirana-ui/vue/agent`,
`@kirana-ui/svelte/agent`, `@kirana-ui/solid/agent`, `@kirana-ui/angular/agent` and
`@kirana-ui/web/agent`.

## 2. Register the tools

```ts title="src/webmcp.ts" showLineNumbers
import { createAgent, registerTools } from "@kirana-ui/react/agent"

export const agent = createAgent({
  // A person's answer, for a step on something marked data-agent-confirm.
  confirm: (action) => window.confirm(action.confirm),
})

/** Gives the page's tools to the browser's agent. Returns the removal. */
export function offerTools() {
  return registerTools(agent, {
    // Your policy for the browser's agent: it may not press buttons.
    allow: (step) => step.action !== "press",
  })
}

/** Whether this browser has WebMCP. */
export function hasWebMCP() {
  const { modelContext } = document as {
    modelContext?: { registerTool?: unknown }
  }
  return typeof modelContext?.registerTool === "function"
}
```

`registerTools` takes the bridge and an `allow`, which is required: the browser's agent is not
yours, so you say what it may do. It returns a function that removes the tools again. TypeScript's
DOM types do not name `document.modelContext` yet, hence the cast in `hasWebMCP`.

`window.confirm` keeps the example short. In your app, show the mark's text (`action.confirm`) in a
dialog of your own and resolve with the person's answer.

## 3. Offer them while the page is shown

Register when the page mounts and remove when it unmounts:

```tsx title="src/App.tsx" showLineNumbers
import { Switch } from "@kirana-ui/react/switch"
import { useEffect } from "react"

import { hasWebMCP, offerTools } from "./webmcp"

export default function App() {
  // Registered while the page is shown; the removal runs on unmount and on hot reload.
  useEffect(() => offerTools(), [])

  return (
    <main>
      <p>
        {hasWebMCP()
          ? "This browser has WebMCP."
          : "This browser has no WebMCP."}
      </p>
      <Switch.Root aria-label="Email alerts">
        <Switch.Thumb />
      </Switch.Root>
      <button type="button" data-agent-confirm="Deletes every saved setting">
        Reset settings
      </button>
    </main>
  )
}
```

`offerTools` returns the removal, and an effect runs what it returns when the component unmounts.
React's development mode mounts twice; the first registration is removed before the second.

Without a framework, or in your app's entry file on any framework, register once and remove before
Vite replaces the module on a hot reload:

```ts title="src/main.ts" showLineNumbers
import { offerTools } from "./webmcp"

// Without a framework: register once, and remove before Vite swaps this module.
const removeTools = offerTools()
import.meta.hot?.dispose(removeTools)
```

Run the page. It says whether the browser has WebMCP. If it has, ask the browser's agent to turn
on email alerts: the switch turns on, through its own `onCheckedChange`, which hears
`details.source === "agent"`.

## What the browser's agent sees

Three tools, with the names, descriptions and schemas of `agentTools`, and two hints each:

| Tool       | What it does                                                     | `readOnlyHint` | `untrustedContentHint` |
| ---------- | ---------------------------------------------------------------- | -------------- | ---------------------- |
| `snapshot` | Lists the components, their state and the actions each takes now | `true`         | `true`                 |
| `query`    | Finds components by label or kind, or the choices of one list    | `true`         | `true`                 |
| `act`      | Runs steps on components, in order                               | `false`        | `true`                 |

`untrustedContentHint` tells the browser that what a tool returns may hold text a user wrote: page
text is data, never instructions. The tools' descriptions say so to the model as well.
`readOnlyHint` is `true` for `query` too, though `query` with `within` opens a closed list to read
its choices.

On the page above, `snapshot` returns:

```json
[
  {
    "ref": "c1",
    "component": "switch",
    "label": "Email alerts",
    "checked": false,
    "actions": ["setChecked", "toggle"]
  },
  {
    "ref": "c2",
    "component": "button",
    "label": "Reset settings",
    "confirm": "Deletes every saved setting",
    "actions": ["press"]
  }
]
```

## Who is asked, in order

When the browser's agent calls `act`, four checks stand between it and a change:

| Order | Who                                 | Asked about                                                     | When it says no                                                            |
| ----- | ----------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1     | `registerTools`'s `allow`           | Every step of the call, as the browser sent it, before any runs | Nothing runs: `{ ok: false, steps: [], error: "Step 2 (Reset): Refused" }` |
| 2     | `createAgent`'s `allow`             | Each step, with its component's kind and label                  | That step fails with "Refused"; earlier steps stay done                    |
| 3     | `createAgent`'s `confirm`, a person | A step on anything marked `data-agent-confirm`                  | "Declined: …", or "Needs a person: …" when there is no `confirm`           |
| 4     | The component's own callback        | The change, with `details.source === "agent"`                   | `details.cancel()` keeps it as it was; `now` in the result shows that      |

The first `allow` is asked for every step before the bridge runs any, so a call with one refused
step changes nothing. The second is your policy for every agent, yours included. Neither stands in
for a person: a marked step needs `confirm`, whatever both `allow`s say.

On the page above, a call to press "Reset settings" stops at the first check:

```json
{ "ok": false, "steps": [], "error": "Step 1 (Reset settings): Refused" }
```

`snapshot` and `query` are not asked of either `allow`. To keep something from being read, mark it:
`data-agent-hidden` keeps a component or a region out, `data-agent-secret` keeps a value from being
read, and `createAgent({ root })` limits the bridge to one part of the page. See
[Make a screen ready for an agent](/docs/ai/make-a-screen-ready-for-an-agent).

## In a browser without WebMCP

Nothing happens. `registerTools` finds no `document.modelContext`, registers nothing and returns
a removal that does nothing. The page, the components and your own uses of the bridge work as
before, so the code above needs no check around it.

## Registering and removing

| What                      | What `registerTools` does                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Registering               | Calls `document.modelContext.registerTool` once per tool, each with one `AbortSignal`                          |
| Removing                  | The function it returned aborts that signal, which removes all three tools                                     |
| A registration that fails | The error is ignored, so a page never breaks for it. The tools are then not offered                            |
| Hot reload                | Remove before the module is replaced (the effect's cleanup, or `import.meta.hot.dispose`), then register again |

Register once per page. A second call without removing the first offers the same three names
again; what the browser does with a name it already has is up to the browser, and if it refuses,
the error is ignored and the first tools, on the first bridge, stay.

## What can go wrong

| What you see                                      | Why, and what to do                                                                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| The page says "This browser has no WebMCP"        | The browser does not offer `document.modelContext`. The page works; there is no agent to offer tools to                       |
| The agent cannot find a control                   | It finds controls by accessible name. Give every control one (`aria-label`, a `<label>`)                                      |
| Every `act` fails with "Refused" at step 1        | `registerTools`'s `allow` refuses it. It is asked with the step as the browser sent it: `ref`, `action`, `args`               |
| A step fails with "Needs a person"                | The component is marked `data-agent-confirm` and `createAgent` has no `confirm`                                               |
| After a hot reload the agent acts on a stale page | The old registration was not removed. Return `offerTools()` from the effect, or call the removal in `import.meta.hot.dispose` |

## What was not run here

The code on this page was type-checked and built with `@kirana-ui/react` 0.3.0, and run in
Chromium with a stand-in for `document.modelContext`: the three tools were registered with the
hints above, `act` turned the switch on, the press was refused by `registerTools`'s `allow`, and
the removal aborted the signal all three were registered with. It was not run against a browser's own agent.

## Next

| Page                                                                          | What it adds                                   |
| ----------------------------------------------------------------------------- | ---------------------------------------------- |
| [The agent bridge](/docs/ai/agent-bridge)                                     | Every method, action and mark                  |
| [Make a screen ready for an agent](/docs/ai/make-a-screen-ready-for-an-agent) | What to check before an agent may use a screen |
| [Run the model on your server](/docs/ai/run-the-model-on-your-server)         | The same tools, with a model you call yourself |
