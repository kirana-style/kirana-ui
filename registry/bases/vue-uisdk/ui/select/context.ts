import type { InjectionKey } from "vue"

/** An entry of the select's `items`, as Vue's Ark UI part takes them; more fields pass through. */
export type Entry = {
  label: string
  value: string | null
  disabled?: boolean
  [field: string]: unknown
}

/** The root's items, which the value's slot reads the chosen entries from. */
export const ITEMS: InjectionKey<() => readonly Entry[] | undefined> =
  Symbol("select-items")
