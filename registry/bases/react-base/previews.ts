/**
 * What `/preview/react/base/<item>` can show: each item by its registry name, each loaded only on
 * its own page (a page that loaded the whole map would download every item). The builder will
 * generate this from the registry's item list.
 */
import type { ComponentType } from "react"

export const previews: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "button-demo": () => import("./examples/button-demo"),
  "button-example": () => import("./examples/button-example"),
  "chart-demo": () => import("./examples/chart-demo"),
  "chart-example": () => import("./examples/chart-example"),
  "dialog-demo": () => import("./examples/dialog-demo"),
  "dialog-example": () => import("./examples/dialog-example"),
  "dropdown-menu-demo": () => import("./examples/dropdown-menu-demo"),
  "dropdown-menu-example": () => import("./examples/dropdown-menu-example"),
  "select-demo": () => import("./examples/select-demo"),
  "select-example": () => import("./examples/select-example"),
  "tabs-demo": () => import("./examples/tabs-demo"),
  "tabs-example": () => import("./examples/tabs-example"),
  "login-01": () => import("./blocks/login-01/page"),
  "sidebar-07": () => import("./blocks/sidebar-07/page"),
}
