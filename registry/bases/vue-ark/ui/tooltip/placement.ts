import type { InjectionKey, Ref } from "vue"

import type { PlacementProps } from "../../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
export const PLACEMENT: InjectionKey<Ref<PlacementProps>> =
  Symbol("tooltip-placement")
