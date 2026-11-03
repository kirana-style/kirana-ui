import type { InjectionKey, Ref } from "vue"

import type { PlacementProps } from "../../../../lib/placement"

/** A content's placement, which it hands to its menu's root (`lib/placement.ts`). */
export const PLACEMENT: InjectionKey<Ref<PlacementProps>> = Symbol(
  "context-menu-placement"
)
