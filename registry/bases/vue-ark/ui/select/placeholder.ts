import type { InjectionKey, Ref } from "vue"

/** The label of the select's `null` entry, which its value shows while none is chosen. */
export const PLACEHOLDER: InjectionKey<Ref<string | undefined>> =
  Symbol("select-placeholder")

/** How a `SelectItem` adds itself to a select given no items: its value and text. */
export const REGISTER: InjectionKey<
  (entry: { label: string; value: string | null; disabled?: boolean }) => void
> = Symbol("select-register")
