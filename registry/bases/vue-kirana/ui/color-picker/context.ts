import type { InjectionKey } from "vue"

/** What the parts inside a picker read of its root: whether it chooses an alpha. */
export const COLOR_PICKER_ALPHA: InjectionKey<() => boolean> =
  Symbol("ColorPickerAlpha")
