/**
 * What `/preview/svelte/ark/<item>` can show: each item by its registry name, as Vue's
 * `previews.ts`.
 */
import type { Component } from "svelte"

import ButtonDemo from "./examples/button-demo.svelte"
import SkeletonDemo from "./examples/skeleton-demo.svelte"

export const previews: Record<string, Component> = {
  "button-demo": ButtonDemo,
  "skeleton-demo": SkeletonDemo,
}
