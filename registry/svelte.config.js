/**
 * Svelte's options for `svelte-check`, which looks for them beside the files it checks. The demos
 * keep upstream's markup, as React's do: placeholder links (`href="#"`) and images whose `alt`
 * names a photo, which Svelte's accessibility hints would otherwise flag.
 */
const KEPT = new Set([
  "a11y_invalid_attribute",
  "a11y_img_redundant_alt",
  "a11y_no_noninteractive_tabindex",
  "a11y_no_redundant_roles",
])

export default {
  compilerOptions: {
    warningFilter: (warning) => !KEPT.has(warning.code),
  },
}
