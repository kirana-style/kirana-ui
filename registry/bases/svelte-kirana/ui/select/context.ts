import { getContext, setContext } from "svelte"

/** An entry of the select, as Base UI's `items` hold them: `null` is the placeholder's value. */
export type Entry = { label: string; value: string | null; disabled?: boolean }

/** What the parts read from the select: its entries, its placeholder and what is chosen. */
export type SelectContext = {
  /** `items`, or what the `SelectItem`s registered when none were given. */
  readonly entries: readonly Entry[]
  /** The label of the `null` entry, which the value shows while none is chosen. */
  readonly placeholder: string | undefined
  /** The chosen values. */
  readonly value: readonly string[]
  /** How a `SelectItem` adds itself to a select given no items: its value and text. */
  register: (entry: Entry) => void
}

const KEY = Symbol("select")

export const setSelect = (context: SelectContext) => setContext(KEY, context)
export const useSelect = () => getContext<SelectContext | undefined>(KEY)
