/**
 * What `/preview/react/base/<item>` can show: each item by its registry name. The builder will
 * generate this from the registry's item list.
 */
import type { ComponentType } from "react"

import Login01 from "./blocks/login-01/page"
import ButtonDemo from "./examples/button-demo"
import DialogDemo from "./examples/dialog-demo"
import DropdownMenuDemo from "./examples/dropdown-menu-demo"
import SelectDemo from "./examples/select-demo"

export const previews: Record<string, ComponentType> = {
  "button-demo": ButtonDemo,
  "dialog-demo": DialogDemo,
  "dropdown-menu-demo": DropdownMenuDemo,
  "select-demo": SelectDemo,
  "login-01": Login01,
}
