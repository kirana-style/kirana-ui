/**
 * The reading direction for every part inside, from a locale: `<DirectionProvider locale="ar">` is
 * Base UI's `<DirectionProvider direction="rtl">`, and `useDirection()` gives an accessor of the
 * locale and its `dir`, as on Ark UI.
 */
export { default as DirectionProvider } from "./DirectionProvider.svelte"
export { useDirection } from "./context"
export type { Direction } from "./context"
