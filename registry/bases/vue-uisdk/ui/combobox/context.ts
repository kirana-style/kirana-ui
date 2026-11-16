import type { ComputedRef, InjectionKey } from "vue"

/** An item as Base UI's combobox takes one: a string, or an object with a `label` and `value`. */
export type ComboboxItem = unknown

/**
 * What the popup is placed against unless it is given an anchor, as Base UI places it: the chips,
 * else the input's group, else the trigger. ui-sdk's default is an element of its own.
 */
export type ComboboxAnchors = {
  chips: Element | null
  input: Element | null
  trigger: Element | null
}

/** The root's items, which `ComboboxList` draws through its slot (ui-sdk filters what it draws). */
export const ITEMS: InjectionKey<ComputedRef<readonly unknown[]>> =
  Symbol("combobox-items")
export const ANCHORS: InjectionKey<ComboboxAnchors> = Symbol("combobox-anchors")
/** A group's items, which its `ComboboxCollection` draws. */
export const GROUP_ITEMS: InjectionKey<ComputedRef<readonly unknown[]>> =
  Symbol("combobox-group")
/** Inside the popup: an input there is not the anchor (the popup's own trigger is). */
export const IN_CONTENT: InjectionKey<boolean> = Symbol("combobox-in-content")
