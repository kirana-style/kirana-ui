/**
 * Every example page, on Ark UI and on Reka UI, mounted as its preview page mounts it and every
 * trigger it has pressed: nothing may throw, and no press may submit a form.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers } from "@workspace/vite-config/browser-page"

import { BASES, mountItem, settle } from "./page"

for (const base of Object.keys(BASES) as (keyof typeof BASES)[]) {
  describe(base, () => {
    const examples = Object.keys(BASES[base]).filter((item) =>
      item.endsWith("-example")
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
