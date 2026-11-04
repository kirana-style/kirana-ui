/**
 * The reading direction for every part inside. Ark UI reads it from the locale:
 * `<DirectionProvider locale="ar">` is Base UI's `<DirectionProvider direction="rtl">`, and
 * `useDirection()` gives the locale and its `dir`.
 */
export {
  LocaleProvider as DirectionProvider,
  useLocaleContext as useDirection,
} from "@ark-ui/solid"
