import type { InjectionKey } from "vue"

import type { toggle } from "../../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** What a ToggleGroup hands its items, as React's context does. */
export type ToggleGroupContext = {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  spacing: number
}

export const TOGGLE_GROUP: InjectionKey<ToggleGroupContext> =
  Symbol("toggle-group")
