import { getContext, setContext } from "svelte"

/** What the parts inside a picker read of its root: whether it chooses an alpha. */
const KEY = Symbol("color-picker")

export type ColorPickerContext = () => { alpha: boolean }

export const setColorPicker = (context: ColorPickerContext) =>
  setContext(KEY, context)
export const useColorPicker = () =>
  getContext<ColorPickerContext | undefined>(KEY) ?? (() => ({ alpha: false }))
