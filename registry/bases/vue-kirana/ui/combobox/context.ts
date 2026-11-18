import { inject } from "vue"
import type { ComputedRef, InjectionKey } from "vue"

/** What a Combobox hands its parts: its items, how an item is named, and what is chosen. */
export type ComboboxContext = {
  items: ComputedRef<readonly unknown[]>
  label: (item: unknown) => string
  selected: ComputedRef<unknown[]>
}

export const COMBOBOX: InjectionKey<ComboboxContext> = Symbol("combobox")
export const COMBOBOX_GROUP: InjectionKey<ComputedRef<readonly unknown[]>> =
  Symbol("combobox-group")

export function useCombobox() {
  const context = inject(COMBOBOX)
  if (!context)
    throw new Error("A combobox part must be used within a Combobox.")
  return context
}
