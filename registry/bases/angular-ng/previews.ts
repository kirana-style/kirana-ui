/**
 * What `/preview/angular/ng/<item>` can show: each item by its registry name, as Vue's
 * `previews.ts`.
 */
import type { Type } from "@angular/core"

import ButtonDemo from "./examples/button-demo"
import SkeletonDemo from "./examples/skeleton-demo"

export const previews: Record<string, Type<unknown>> = {
  "button-demo": ButtonDemo,
  "skeleton-demo": SkeletonDemo,
}
