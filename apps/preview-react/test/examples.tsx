/**
 * Every example page of upstream's, every chat demo on TanStack AI and the helpers' demos, on every
 * base, mounted as its preview page mounts it and every trigger it has pressed: nothing may throw, and no press may submit a form. Base UI's label parts
 * (`DropdownMenuLabel`, `SelectLabel` …) throw when their menu opens unless they sit in their
 * group, which no type check sees; a port from Radix, which allowed a lone label, fails here.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers } from "@workspace/vite-config/browser-page"
import { previews as basePreviews } from "@workspace/registry/bases/react-base/previews"
import { previews as ariaPreviews } from "@workspace/registry/bases/react-aria/previews"
import { previews as uisdkPreviews } from "@workspace/registry/bases/react-uisdk/previews"
import { previews as kiranaPreviews } from "@workspace/registry/bases/react-kirana/previews"

import { mountItem, settle } from "./page"

export const BASES = {
  base: basePreviews,
  aria: ariaPreviews,
  uisdk: uisdkPreviews,
  kirana: kiranaPreviews,
}

/**
 * `base`'s example pages, chat demos and helper demos, each mounted and every trigger pressed. Each
 * base has a test file of its own (`examples.<base>.test.tsx`): a file is a page of its own, so a
 * base's memory is released before the next one's, where four bases in one page ran a browser out
 * of it.
 */
export function testExamples(base: keyof typeof BASES) {
  const previews = BASES[base]
  describe(base, () => {
    // Upstream's example pages, the chat demos' TanStack AI twins and the helpers' demos.
    const examples = Object.keys(previews).filter(
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
