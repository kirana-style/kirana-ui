---
title: Test what an agent can do
description: A test that mounts a screen, gives it to the agent bridge and holds what an agent may and may not do there, so a change to the screen cannot quietly widen it.
section: ai
order: 3.2
keywords:
  [
    agent bridge,
    test,
    vitest,
    browser mode,
    playwright,
    jsdom,
    happy-dom,
    createAgent,
    allow,
    confirm,
    data-agent-confirm,
    data-agent-secret,
    data-agent-hidden,
  ]
---

# Test what an agent can do

What an agent may do on a screen is decided by the screen itself: the names of its controls, the
marks on them and the policy you hand the [agent bridge](/docs/ai/agent-bridge). A test holds all
of it in one place, so a renamed label or a lost mark fails a build instead of reaching an agent.

At the end of this page you will have a settings form built with the primitives and one test file
that proves six things about it:

| The test proves                                                              | By                                                           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| The agent sees the form's controls, and not the part marked hidden           | `snapshot()`, `query()`, and a step on the hidden control    |
| Its steps change the values, through the components' own callbacks           | `act()`, then the input's value and what the callback got    |
| A secret is read back as `[redacted]`                                        | `act()` and `snapshot()` on the token field                  |
| Deleting the account fails without a person, and runs when a person says yes | `act()` with no `confirm`, a `confirm` that says no, and yes |
| The policy refuses a step it does not list                                   | `act()` on a button `allow` leaves out                       |
| The page has none of the faults the library checks for                       | `faults()` from the testing entry                            |

The code is React. The bridge and the test's assertions are the same on every framework, because
the bridge reads the page, not the framework: only the lines that mount the form change.

## Which environment

The bridge presses elements and types into them, so it needs a DOM. These are the results of the
test on this page with `@kirana-ui/react` 0.4.0 and Vitest 5.1:

| Environment                          | Result                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| A real browser (Vitest browser mode) | All six pass, with nothing added                                                                                   |
| jsdom 31                             | All six pass once `settled()` is given a stub for Web Animations (below). Without it every test times out          |
| happy-dom 21                         | Two fail: a switch inside a `<label>` is toggled twice and ends where it started, and `faults()` throws on a style |

Use a real browser. jsdom is a fallback for a project that cannot run one, with the stub below.
happy-dom gives wrong answers for these components today.

## 1. Install the test runner

Start from a React project that has `@kirana-ui/react` installed (see
[Installation](/docs/primitives/installation)). Add Vitest, its browser mode and Playwright, then
the browser Playwright drives:

<!-- ::install dev="vitest @vitest/browser-playwright playwright" -->

<!-- ::install exec="playwright install chromium" -->

## 2. Configure Vitest

```ts title="vitest.config.ts"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["src/**/*.test.tsx"],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
})
```

Every test file now runs in a headless Chromium, with the page's real layout, events and
animations.

## 3. The screen

A settings form: a name, an API token, an alerts switch, a theme select, a section only an owner
should see, and two buttons that matter. Each mark is there for the agent:

| Mark                     | On               | What it does to the agent                                   |
| ------------------------ | ---------------- | ----------------------------------------------------------- |
| `data-agent-secret`      | The token field  | Its value is read as `[redacted]`                           |
| `data-agent-hidden`      | The owner's part | Nothing inside it is in a snapshot, and no step can name it |
| `data-agent-confirm="…"` | Delete account   | A step on it needs a person's yes, shown this sentence      |

```tsx title="src/settings-form.tsx" showLineNumbers
import { Button } from "@kirana-ui/react/button"
import { Field } from "@kirana-ui/react/field"
import { Select } from "@kirana-ui/react/select"
import { Switch } from "@kirana-ui/react/switch"
import type { ChangeDetails } from "@kirana-ui/react"

const THEMES = { light: "Light", dark: "Dark", system: "System" }

export function SettingsForm(props: {
  onAlertsChange?: (checked: boolean, details: ChangeDetails) => void
  onDelete?: () => void
}) {
  return (
    <form aria-label="Settings" onSubmit={(event) => event.preventDefault()}>
      <Field.Root>
        <Field.Label>Display name</Field.Label>
        <Field.Control defaultValue="Ada" />
      </Field.Root>

      <Field.Root data-agent-secret>
        <Field.Label>API token</Field.Label>
        <Field.Control defaultValue="tok_live_8f2a" />
      </Field.Root>

      <label>
        <Switch.Root onCheckedChange={props.onAlertsChange}>
          <Switch.Thumb />
        </Switch.Root>
        Email alerts
      </label>

      <Select.Root defaultValue="system" items={THEMES}>
        <Select.Trigger aria-label="Theme">
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              {Object.entries(THEMES).map(([value, label]) => (
                <Select.Item key={value} value={value}>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      <section data-agent-hidden>
        <label>
          <Switch.Root>
            <Switch.Thumb />
          </Switch.Root>
          Billing owner
        </label>
      </section>

      <Button type="button">Transfer ownership</Button>

      <Button
        type="button"
        data-agent-confirm="Deletes your account and every project in it"
        onClick={props.onDelete}
      >
        Delete account
      </Button>
    </form>
  )
}
```

Every control has an accessible name: a `Field.Label`, a `<label>` around it, an `aria-label` or
its own text. That name is how the agent finds it.

## 4. The test

The test mounts the form, creates the bridge on it with the screen's policy, and asks it what a
model would ask. Two helpers come from the primitives' own testing entry: `recorder()` hears what
the switch's callback was told, and `settled()` waits until no popup is moving. `faults()` reads the
page for the faults the library holds its own components out of (see
[Testing](/docs/primitives/testing)).

```tsx title="src/settings-form.agent.test.tsx" showLineNumbers
import {
  type AgentAction,
  type AgentOptions,
  createAgent,
} from "@kirana-ui/react/agent"
import { faults, known, recorder, settled } from "@kirana-ui/react/testing"
import { flushSync } from "react-dom"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, expect, test, vi } from "vitest"
import { SettingsForm } from "./settings-form"

// What this screen lets an agent do. Anything else is refused.
const ALLOWED = [
  "Display name: setValue",
  "API token: setValue",
  "Email alerts: toggle",
  "Theme: setValue",
  "Delete account: press",
]
const allow = (step: AgentAction) =>
  ALLOWED.includes(`${step.label}: ${step.action}`)

let root: Root | undefined
afterEach(() => {
  root?.unmount()
  document.body.replaceChildren()
})

async function mount(options: Omit<AgentOptions, "root" | "allow"> = {}) {
  const alerts = recorder()
  const onDelete = vi.fn()
  const host = document.createElement("div")
  document.body.append(host)
  const current = (root = createRoot(host))
  flushSync(() =>
    current.render(
      <SettingsForm onAlertsChange={alerts.listen} onDelete={onDelete} />
    )
  )
  await settled()
  const agent = createAgent({ root: host, allow, ...options })
  return { agent, host, alerts, onDelete }
}

test("the agent sees the form, and not what is hidden", async () => {
  const { agent } = await mount()

  expect(agent.snapshot().map((each) => each.label)).toEqual([
    "Display name",
    "API token",
    "Email alerts",
    "Theme",
    "Transfer ownership",
    "Delete account",
  ])
  expect(await agent.query({ text: "Billing" })).toEqual([])

  const hidden = await agent.act({
    steps: [{ ref: "Billing owner", action: "toggle" }],
  })
  expect(hidden.error).toBe(
    'Step 1 (Billing owner): Nothing is called "Billing owner"'
  )
})

test("its steps change the values, through the components' own handlers", async () => {
  const { agent, host, alerts } = await mount()

  const result = await agent.act({
    steps: [
      { ref: "Display name", action: "setValue", args: ["Grace"] },
      { ref: "Email alerts", action: "toggle" },
      { ref: "Theme", action: "setValue", args: ["Dark"] },
    ],
  })

  expect(result.ok).toBe(true)
  expect(
    result.steps.map((step) => step.now?.value ?? step.now?.checked)
  ).toEqual(["Grace", true, "Dark"])
  expect(host.querySelector("input")?.value).toBe("Grace")
  expect(alerts.calls).toEqual([
    { value: true, reason: "press", source: "agent" },
  ])
})

test("a secret is never read back", async () => {
  const { agent } = await mount()

  const result = await agent.act({
    steps: [{ ref: "API token", action: "setValue", args: ["tok_new"] }],
  })

  expect(result.steps[0]?.now?.value).toBe("[redacted]")
  expect(
    agent.snapshot().find((each) => each.label === "API token")?.value
  ).toBe("[redacted]")
})

test("a marked action needs a person's yes", async () => {
  const step = { ref: "Delete account", action: "press" }

  const alone = await mount()
  expect(await alone.agent.act({ steps: [step] })).toEqual({
    ok: false,
    steps: [],
    error:
      "Step 1 (Delete account): Needs a person: Deletes your account and every project in it",
  })
  expect(alone.onDelete).not.toHaveBeenCalled()
  root?.unmount()

  const declined = await mount({ confirm: () => false })
  expect((await declined.agent.act({ steps: [step] })).error).toBe(
    "Step 1 (Delete account): Declined: Deletes your account and every project in it"
  )
  expect(declined.onDelete).not.toHaveBeenCalled()
  root?.unmount()

  const confirm = vi.fn(async () => true)
  const agreed = await mount({ confirm })
  expect((await agreed.agent.act({ steps: [step] })).ok).toBe(true)
  expect(confirm).toHaveBeenCalledWith(
    expect.objectContaining({
      confirm: "Deletes your account and every project in it",
    })
  )
  expect(agreed.onDelete).toHaveBeenCalledOnce()
})

test("the policy refuses what it does not list, and earlier steps stay done", async () => {
  const { agent } = await mount()

  const result = await agent.act({
    steps: [
      { ref: "Display name", action: "setValue", args: ["Grace"] },
      { ref: "Transfer ownership", action: "press" },
    ],
  })

  expect(result.ok).toBe(false)
  expect(result.error).toBe("Step 2 (Transfer ownership): Refused")
  expect(result.steps).toHaveLength(1)
})

test("the page has no faults after the agent's steps", async () => {
  const { agent, host } = await mount()
  await agent.act({
    steps: [{ ref: "Theme", action: "setValue", args: ["Light"] }],
  })
  await settled()

  expect(
    faults(host, known(), {
      allow: ["data-agent-confirm", "data-agent-hidden", "data-agent-secret"],
    })
  ).toEqual([])
})
```

What each part is for:

- **`allow` is the screen's policy, written as a list.** A step whose label and action are not in
  `ALLOWED` is refused, so a new button is refused until someone adds it on purpose.
- **`confirm` stands in for the person.** In the app it opens a dialog and resolves with the
  person's answer; here the test plays both answers. Never give the app itself `() => true`.
- **`flushSync` and `settled()`** make sure the form is drawn and still before the agent reads it.
- **`faults()` is told about the bridge's marks** (`allow: ["data-agent-…"]`): they are the page's
  own attributes, not ones a part wrote, and without that line it lists each one as a fault.

## 5. Run it

<!-- ::install exec="vitest run --reporter=verbose" -->

You should see:

```text
 ✓ |chromium| src/settings-form.agent.test.tsx > the agent sees the form, and not what is hidden 41ms
 ✓ |chromium| src/settings-form.agent.test.tsx > its steps change the values, through the components' own handlers 109ms
 ✓ |chromium| src/settings-form.agent.test.tsx > a secret is never read back 44ms
 ✓ |chromium| src/settings-form.agent.test.tsx > a marked action needs a person's yes 90ms
 ✓ |chromium| src/settings-form.agent.test.tsx > the policy refuses what it does not list, and earlier steps stay done 44ms
 ✓ |chromium| src/settings-form.agent.test.tsx > the page has no faults after the agent's steps 86ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
```

Now break it on purpose: take `data-agent-confirm` off the delete button and run it again. The
test "a marked action needs a person's yes" fails, because the agent could press it alone.

## Without a browser: jsdom

jsdom has no Web Animations. The components run without it: a popup opens and closes at once. But
`settled()` asks the document whether anything is animating, and in jsdom that throws
`getAnimations is not a function`, so the test never gets past `mount`. Nothing animates in jsdom,
so "no animations" is the true answer and a stub is enough. Install jsdom:

<!-- ::install dev="vitest jsdom" -->

Add the stub as a setup file:

```ts title="test/web-animations.ts"
// jsdom has no Web Animations, and `settled()` asks the document whether anything
// is animating (`getAnimations()`). Nothing animates in jsdom, so "no animations"
// is the true answer.
Element.prototype.getAnimations ??= () => []
document.getAnimations ??= () => []
```

And run the same test file with this configuration:

```ts title="vitest.jsdom.config.ts"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["src/**/*.test.tsx"],
    environment: "jsdom",
    setupFiles: ["./test/web-animations.ts"],
  },
})
```

<!-- ::install exec="vitest run --config vitest.jsdom.config.ts" -->

All six pass. jsdom has no layout, so a test that depends on where a popup is placed belongs in the
browser.

## What can go wrong

| What you see                                                                                            | Why                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `TypeError: page.getAnimations is not a function`, and every test times out                             | `settled()` in jsdom or happy-dom without the Web Animations stub                                 |
| `Nothing is called "Email alerts"` for a control that is on the screen                                  | It has no accessible name, a different one, or it is outside `root` or inside `data-agent-hidden` |
| `"Email alerts" names 2 components: c3 (switch "Email alerts"), c7 (switch "Email alerts"). Use a ref.` | Two controls share a name. Give each its own, or name the step by the `ref` from a snapshot       |
| `expected [ 'Grace', false, 'Dark' ]` under happy-dom                                                   | happy-dom toggles a switch inside a `<label>` twice. Run the test in a browser                    |
| `Error: browserType.launch: Executable doesn't exist`                                                   | Playwright's browser is not installed: run `playwright install chromium`                          |
| `faults()` lists `button has data-agent-confirm, which no vocabulary names`                             | Pass the bridge's marks in `allow`, as the test does                                              |

## Next

- [Make a screen ready for an agent](/docs/ai/make-a-screen-ready-for-an-agent): the checklist this
  test keeps true.
- [The agent bridge](/docs/ai/agent-bridge): every method, action and mark.
- [Testing](/docs/primitives/testing): the rest of the testing entry.
