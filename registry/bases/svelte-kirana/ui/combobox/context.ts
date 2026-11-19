import { getContext, setContext } from "svelte"

/** What a Combobox hands its parts: its items, how an item is named, and what is chosen. */
export type ComboboxContext = {
  readonly items: readonly unknown[]
  readonly selected: readonly unknown[]
  label: (item: unknown) => string
}

const KEY = Symbol("combobox")
const GROUP = Symbol("combobox-group")

export const setCombobox = (context: ComboboxContext) =>
  setContext(KEY, context)
export const useCombobox = () => {
  const context = getContext<ComboboxContext | undefined>(KEY)
  if (!context)
    throw new Error("A combobox part must be used within a Combobox.")
  return context
}
export const setComboboxGroup = (items: () => readonly unknown[]) =>
  setContext(GROUP, items)
export const useComboboxGroup = () =>
  getContext<(() => readonly unknown[]) | undefined>(GROUP)
