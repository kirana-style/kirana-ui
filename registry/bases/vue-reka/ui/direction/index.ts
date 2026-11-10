/**
 * The reading direction for every part inside. Reka UI reads it from its `ConfigProvider`;
 * `<DirectionProvider locale="ar">` takes a locale as Ark UI's does, and `useDirection()` gives the
 * direction Reka UI's parts read.
 */
export { default as DirectionProvider } from "./DirectionProvider.vue"
export { useDirection } from "reka-ui"
