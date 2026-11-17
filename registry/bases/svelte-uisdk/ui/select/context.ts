import { getContext, setContext } from "svelte"

/**
 * An entry of the select's `items`, as Svelte's Ark UI part takes them: `null` is the
 * placeholder's value. More fields pass through (`any`, as Ark UI types a caller's items: an
 * entry's own fields, an icon, pass to the value's snippet).
 */
export type Entry = {
  label: string
  value: string | null
  disabled?: boolean
  [field: string]: any
}

const KEY = Symbol("select-items")
/** The root's items, which the value's snippet reads the chosen entries from. */
export const setItems = (items: () => readonly Entry[] | undefined) =>
  setContext(KEY, items)
export const useItems = () =>
  getContext<(() => readonly Entry[] | undefined) | undefined>(KEY)
