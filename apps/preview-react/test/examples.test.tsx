/**
 * Every example page of upstream's, on both bases, mounted as its preview page mounts it and every
 * trigger it has pressed: nothing may throw, and no press may submit a form. Base UI's label parts
 * (`DropdownMenuLabel`, `SelectLabel` …) throw when their menu opens unless they sit in their
 * group, which no type check sees; a port from Radix, which allowed a lone label, fails here.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers } from "@workspace/vite-config/browser-page"
import { previews as basePreviews } from "@workspace/registry/bases/react-base/previews"
import { previews as ariaPreviews } from "@workspace/registry/bases/react-aria/previews"

import { mountItem, settle } from "./page"

const BASES = { base: basePreviews, aria: ariaPreviews }

for (const [base, previews] of Object.entries(BASES)) {
  describe(base, () => {
    const examples = Object.keys(previews).filter((item) =>
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
