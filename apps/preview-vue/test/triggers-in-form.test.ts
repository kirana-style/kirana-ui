/**
 * A tooltip or popover trigger in a form never submits it, on either base, as its own button or
 * with `as-child` on the registry's Button. Ark UI's tooltip trigger is a `<button>` with no type,
 * which submits the form (LF-021): `TooltipTrigger.vue` passes `type="button"`.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers, triggers } from "@workspace/vite-config/browser-page"

import TriggersInForm from "./TriggersInForm.vue"
import { mountComponent, settle } from "./page"

const PARTS = ["button", "tooltip", "popover"]

const modules = {
  ark: import.meta.glob<Record<string, unknown>>(
    "../../../registry/bases/vue-ark/ui/*/index.ts"
  ),
  reka: import.meta.glob<Record<string, unknown>>(
    "../../../registry/bases/vue-reka/ui/*/index.ts"
  ),
}

/** One base's parts for the fixture, by their export names. */
async function partsOf(base: keyof typeof modules) {
  const loaded = await Promise.all(
    PARTS.map((part) =>
      modules[base][
        `../../../registry/bases/vue-${base}/ui/${part}/index.ts`
      ]!()
    )
  )
  return Object.assign({}, ...loaded) as Record<string, unknown>
}

describe.each(Object.keys(modules) as (keyof typeof modules)[])(
  "%s",
  (base) => {
    it("no trigger submits the form it sits in", async () => {
      const { container, errors } = await mountComponent(TriggersInForm, {
        ui: await partsOf(base),
      })
      expect(triggers(container).length).toBeGreaterThanOrEqual(4)
      await pressTriggers(container, {
        page,
        userEvent,
        settle,
        check: (label) => expect(errors, label).toEqual([]),
      })
    })
  }
)
