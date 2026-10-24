/**
 * What `/preview/react/aria/<item>` can show: each item by its registry name. The builder will
 * generate this from the registry's item list.
 */
import type { ComponentType } from "react"

import Login01 from "./blocks/login-01/page"
import ButtonDemo from "./examples/button-demo"
import ButtonExample from "./examples/button-example"
import DialogDemo from "./examples/dialog-demo"
import DialogExample from "./examples/dialog-example"
import DropdownMenuDemo from "./examples/dropdown-menu-demo"
import DropdownMenuExample from "./examples/dropdown-menu-example"
import SelectDemo from "./examples/select-demo"
import SelectExample from "./examples/select-example"

export const previews: Record<string, ComponentType> = {
  "button-demo": ButtonDemo,
  "button-example": ButtonExample,
  "dialog-demo": DialogDemo,
  "dialog-example": DialogExample,
  "dropdown-menu-demo": DropdownMenuDemo,
  "dropdown-menu-example": DropdownMenuExample,
  "select-demo": SelectDemo,
  "select-example": SelectExample,
  "login-01": Login01,
}
