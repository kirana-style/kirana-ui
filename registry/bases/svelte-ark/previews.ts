/**
 * What `/preview/svelte/ark/<item>` can show: each item by its registry name, as Vue's
 * `previews.ts`.
 */
import type { Component } from "svelte"

import type { PREVIEW_NAMES } from "./preview-names"

import ButtonDemo from "./examples/button-demo.svelte"
import SkeletonDemo from "./examples/skeleton-demo.svelte"

export const previews: Record<(typeof PREVIEW_NAMES)[number], Component> = {
  "button-demo": ButtonDemo,
  "skeleton-demo": SkeletonDemo,
}
