import type { toggle } from "../../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** What a ToggleGroup hands its items, as React's context does: getters, so they follow it. */
export type ToggleGroupContext = {
  readonly variant?: ToggleVariants["variant"]
  readonly size?: ToggleVariants["size"]
  readonly spacing: number
}

export const TOGGLE_GROUP = Symbol("toggle-group")
