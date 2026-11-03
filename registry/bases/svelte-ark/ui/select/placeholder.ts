/** The label of the select's `null` entry, which its value shows while none is chosen: a getter. */
export const PLACEHOLDER = Symbol("select-placeholder")
export type PlaceholderContext = () => string | undefined

/** How a `SelectItem` adds itself to a select given no items: its value and text. */
export const REGISTER = Symbol("select-register")
export type Entry = { label: string; value: string | null; disabled?: boolean }
export type RegisterContext = (entry: Entry) => void
