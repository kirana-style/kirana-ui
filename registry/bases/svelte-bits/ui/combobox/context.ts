import { getContext } from "svelte"

/** An item as Base UI's combobox takes one: a string, or an object with a `label` and `value`. */
export type ComboboxItem = unknown

/** What a Combobox hands its parts: getters, so they follow it. */
export type ComboboxContext = {
  /** The items, or the groups with their matching items, that match what is typed. */
  readonly filtered: unknown[]
  /** A group's items that match what is typed. */
  filter: (items: readonly unknown[]) => unknown[]
  label: (item: unknown) => string
  /** An item's value string for Bits UI (`""` goes as a stand-in, which Bits reads as no value). */
  value: (item: unknown) => string
  /** The selected items, in the shape the caller gave them. */
  readonly selected: unknown[]
  remove: (item: unknown) => void
  /** Clears the choice and what is typed, as Ark UI's clear trigger. */
  clear: () => void
  /** What is typed, while it is typed, which the items are filtered by. */
  query: string
  /** Whether the popup is anchored to the chips (`data-chips`). */
  chips: boolean
  /**
   * The element the popup is placed against when it is not the input: the chips, or a trigger of
   * its own outside the popup ("Combobox in Popup", whose input is inside it).
   */
  anchor: HTMLElement | null
}

export const COMBOBOX = Symbol("combobox")

/** A group's items, which its `ComboboxCollection` draws: a getter. */
export const COMBOBOX_GROUP = Symbol("combobox-group")
export type ComboboxGroupContext = { readonly items: unknown[] }

export function useCombobox() {
  const context = getContext<ComboboxContext | undefined>(COMBOBOX)
  if (!context)
    throw new Error("A combobox part must be used within a Combobox.")
  return context
}
