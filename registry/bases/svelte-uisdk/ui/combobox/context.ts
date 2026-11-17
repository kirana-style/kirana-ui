import { getContext, setContext } from "svelte"

/**
 * What the popup is placed against unless it is given an anchor, as Base UI places it: the chips,
 * else the input's group, else the trigger. ui-sdk's default is an element of its own.
 */
export type ComboboxAnchors = {
  chips: HTMLElement | null
  input: HTMLElement | null
  trigger: HTMLElement | null
}

const ITEMS = Symbol("combobox-items")
const ANCHORS = Symbol("combobox-anchors")
const GROUP_ITEMS = Symbol("combobox-group")
const IN_CONTENT = Symbol("combobox-in-content")

/** The root's items, which `ComboboxList` draws through its snippet (ui-sdk filters what it draws). */
export const setItems = (items: () => readonly unknown[]) =>
  setContext(ITEMS, items)
export const useItems = () =>
  getContext<(() => readonly unknown[]) | undefined>(ITEMS)
export const setAnchors = (anchors: ComboboxAnchors) =>
  setContext(ANCHORS, anchors)
export const useAnchors = () => getContext<ComboboxAnchors | undefined>(ANCHORS)
/** A group's items, which its `ComboboxCollection` draws. */
export const setGroupItems = (items: () => readonly unknown[]) =>
  setContext(GROUP_ITEMS, items)
export const useGroupItems = () =>
  getContext<(() => readonly unknown[]) | undefined>(GROUP_ITEMS)
/** Inside the popup: an input there is not the anchor (the popup's own trigger is). */
export const setInContent = () => setContext(IN_CONTENT, true)
export const useInContent = () =>
  getContext<boolean | undefined>(IN_CONTENT) ?? false
