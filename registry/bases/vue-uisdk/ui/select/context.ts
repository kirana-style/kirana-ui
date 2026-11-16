import type { InjectionKey } from "vue"

/** An entry of the select's `items`, as Vue's Ark UI part takes them; more fields pass through. */
export type Entry = {
  label: string
  value: string | null
  disabled?: boolean
  // `any`, as Ark UI types a caller's items: an entry's own fields (an icon) pass to its slot.
  [field: string]: any
}

/** The root's items, which the value's slot reads the chosen entries from. */
export const ITEMS: InjectionKey<() => readonly Entry[] | undefined> =
  Symbol("select-items")
