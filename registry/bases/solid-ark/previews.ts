/**
 * What `/preview/solid/ark/<item>` can show: each item by its registry name, as Vue's
 * `previews.ts`.
 */
import type { Component } from "solid-js"

import ButtonDemo from "./examples/button-demo"
import SkeletonDemo from "./examples/skeleton-demo"

export const previews: Record<string, Component> = {
  "button-demo": ButtonDemo,
  "skeleton-demo": SkeletonDemo,
}
