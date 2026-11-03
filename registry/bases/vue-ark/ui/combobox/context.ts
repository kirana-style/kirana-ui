import { inject } from "vue"
import type { ComputedRef, InjectionKey, Ref } from "vue"

import type { PlacementProps } from "../../../../lib/placement"

/** An item as Base UI's combobox takes one: a string, or an object with a `label` and `value`. */
export type ComboboxItem = unknown

/** What a Combobox hands its parts. */
export type ComboboxContext = {
  /** The items, or the groups with their matching items, that match what is typed. */
  filtered: ComputedRef<unknown[]>
  /** A group's items that match what is typed. */
  filter: (items: readonly unknown[]) => unknown[]
  label: (item: unknown) => string
  value: (item: unknown) => string
  /** The selected items, in the shape the caller gave them. */
  selected: ComputedRef<unknown[]>
  remove: (item: unknown) => void
  /** Whether the popup is anchored to the chips (`data-chips`). */
  chips: Ref<boolean>
  placement: Ref<PlacementProps>
  /**
   * The input's id, a caller's (`<ComboboxInput id>`), which the root hands Zag as its own: Zag
   * finds its input by the id it gave it.
   */
  inputId: Ref<string | undefined>
}

export const COMBOBOX: InjectionKey<ComboboxContext> = Symbol("combobox")

/** A group's items, which its `ComboboxCollection` draws. */
export const COMBOBOX_GROUP: InjectionKey<ComputedRef<unknown[]>> =
  Symbol("combobox-group")

/** Inside the popup: an input there is not the anchor (the popup's own trigger is). */
export const IN_CONTENT: InjectionKey<boolean> = Symbol("combobox-in-content")

export function useCombobox() {
  const context = inject(COMBOBOX)
  if (!context)
    throw new Error("A combobox part must be used within a Combobox.")
  return context
}
