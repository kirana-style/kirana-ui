/**
 * Every example page, on Ark UI and on Bits UI, mounted as its preview page mounts it and every
 * trigger it has pressed: nothing may throw, and no press may submit a form. A Bits UI trigger
 * renders a `<button>` that is a submit button unless it says otherwise, so a select, menu or
 * popover in a form submitted it until each trigger said `type="button"`.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers } from "@workspace/vite-config/browser-page"

import { BASES, mountItem, settle } from "./page"

/**
 * `base`'s example pages, chat demos and helper demos, each mounted and every trigger pressed. Each
 * base has a test file of its own (`examples.<base>.test.ts`): a file is a page of its own, so a
 * base's memory is released before the next one's, where every base in one page ran a browser out
 * of it.
 */
export function testExamples(base: keyof typeof BASES) {
  describe(base, () => {
    // And the chat demos on TanStack AI and the helpers' demos, which have no `-example` page.
    const examples = Object.keys(BASES[base]).filter(
      (item) =>
        item.endsWith("-example") ||
        item.endsWith("-tanstack-ai") ||
        item.endsWith("-helper-demo")
    )
    it.each(examples)("%s renders and every trigger works", async (item) => {
      const { container, errors } = await mountItem(base, item)
      expect(errors, "on mount").toEqual([])
      await pressTriggers(container, {
        page,
        userEvent,
        settle,
        check: (label) => expect(errors, label).toEqual([]),
      })
    })
  })
}
