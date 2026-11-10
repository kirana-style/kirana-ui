import type { ComputedRef, InjectionKey } from "vue"

/** An entry of the select, as Base UI's `items` take it: `value` `null` is the placeholder's. */
export type Entry = { label: string; value: string | null; disabled?: boolean }

/** What a Select hands its parts. */
export const SELECT: InjectionKey<{
  /** Its entries: its `items`, or those its `SelectItem`s registered. */
  entries: ComputedRef<readonly Entry[]>
  /** The label of the `null` entry, which its value shows while none is chosen. */
  placeholder: ComputedRef<string | undefined>
  /** How a `SelectItem` adds itself to a select given no items: its value and text. */
  register: (entry: Entry) => void
}> = Symbol("select")
