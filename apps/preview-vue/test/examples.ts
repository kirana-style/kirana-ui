/**
 * Every example page, every chat demo on TanStack AI and the helpers' demos, on every base, mounted
 * as its preview page mounts it and every trigger it has pressed: nothing may throw, and no press
 * may submit a form.
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
    // Upstream's example pages, the chat demos' TanStack AI twins and the helpers' demos.
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
