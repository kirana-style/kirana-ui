import type { InjectionKey, Ref } from "vue"

import type { PlacementProps } from "../../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
export const PLACEMENT: InjectionKey<Ref<PlacementProps>> =
  Symbol("select-placement")

/**
 * The trigger's id, a caller's (`<SelectTrigger id>`, for a label's `for`), handed to the root's
 * `ids`: Zag finds its trigger by the id it gave it, so one written over it leaves the popup with
 * no anchor.
 */
export const TRIGGER_ID: InjectionKey<Ref<string | undefined>> =
  Symbol("select-trigger-id")
