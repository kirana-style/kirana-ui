/**
 * What `/preview/vue/ark/<item>` can show: each item by its registry name. The builder will
 * generate this from the registry's item list.
 */
import type { Component } from "vue"

import type { PREVIEW_NAMES } from "./preview-names"

import ButtonDemo from "./examples/button-demo.vue"
import DialogDemo from "./examples/dialog-demo.vue"
import DropdownMenuDemo from "./examples/dropdown-menu-demo.vue"
import SelectDemo from "./examples/select-demo.vue"
import TabsDemo from "./examples/tabs-demo.vue"

export const previews: Record<(typeof PREVIEW_NAMES)[number], Component> = {
  "button-demo": ButtonDemo,
  "dialog-demo": DialogDemo,
  "dropdown-menu-demo": DropdownMenuDemo,
  "select-demo": SelectDemo,
  "tabs-demo": TabsDemo,
}
