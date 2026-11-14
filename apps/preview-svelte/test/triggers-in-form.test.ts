/**
 * A trigger in a form never submits it, on either base, as its own button or through `asChild`
 * with the registry's Button (whose `<button>` is a submit button unless it says otherwise): the
 * parts pass `type="button"` with the props they hand the child.
 */
import { flushSync, mount, unmount } from "svelte"
import { describe, expect, it, onTestFinished } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import {
  pressTriggers,
  triggers,
  watchPage,
} from "@workspace/vite-config/browser-page"

import TriggersInForm from "./TriggersInForm.svelte"
import { settle, styles } from "./page"

const PARTS = [
  "button",
  "popover",
  "dropdown-menu",
  "dialog",
  "alert-dialog",
  "sheet",
  "collapsible",
  "tooltip",
]

const modules = {
  ark: import.meta.glob<Record<string, unknown>>(
    "../../../registry/bases/svelte-ark/ui/*/index.ts"
  ),
  bits: import.meta.glob<Record<string, unknown>>(
    "../../../registry/bases/svelte-bits/ui/*/index.ts"
  ),
}

/** One base's parts for the fixture, by their export names. */
async function partsOf(base: keyof typeof modules) {
  const loaded = await Promise.all(
    PARTS.map((part) =>
      modules[base][
        `../../../registry/bases/svelte-${base}/ui/${part}/index.ts`
      ]!()
    )
  )
  return Object.assign({}, ...loaded) as Record<string, unknown>
}

describe.each(Object.keys(modules) as (keyof typeof modules)[])(
  "%s",
  (base) => {
    it("no trigger submits the form it sits in", async () => {
      const ui = await partsOf(base)
      await styles()
      const watch = watchPage()
      const container = document.createElement("div")
      document.body.append(container)
      const app = mount(TriggersInForm, { target: container, props: { ui } })
      flushSync()
      onTestFinished(async () => {
        await unmount(app)
        container.remove()
        watch.stop()
      })
      await settle()
      await styles()
      // Every trigger the fixture has: its own button and the child of each `asChild`.
      expect(triggers(container).length).toBeGreaterThanOrEqual(8)
      await pressTriggers(container, {
        page,
        userEvent,
        settle,
        check: (label) => expect(watch.errors, label).toEqual([]),
      })
    })
  }
)
