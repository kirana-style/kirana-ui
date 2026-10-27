/**
 * What `/preview/react/aria/<item>` can show: each item by its registry name, each loaded only on
 * its own page (a page that loaded the whole map would download every item). The builder will
 * generate this from the registry's item list.
 */
import type { ComponentType } from "react"

export const previews: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "avatar-demo": () => import("./examples/avatar-demo"),
  "breadcrumb-demo": () => import("./examples/breadcrumb-demo"),
  "button-demo": () => import("./examples/button-demo"),
  "button-example": () => import("./examples/button-example"),
  "card-demo": () => import("./examples/card-demo"),
  "chart-demo": () => import("./examples/chart-demo"),
  "chart-example": () => import("./examples/chart-example"),
  "collapsible-demo": () => import("./examples/collapsible-demo"),
  "dialog-demo": () => import("./examples/dialog-demo"),
  "dialog-example": () => import("./examples/dialog-example"),
  "dropdown-menu-demo": () => import("./examples/dropdown-menu-demo"),
  "dropdown-menu-example": () => import("./examples/dropdown-menu-example"),
  "input-demo": () => import("./examples/input-demo"),
  "select-demo": () => import("./examples/select-demo"),
  "select-example": () => import("./examples/select-example"),
  "separator-demo": () => import("./examples/separator-demo"),
  "sheet-demo": () => import("./examples/sheet-demo"),
  "skeleton-demo": () => import("./examples/skeleton-demo"),
  "tabs-demo": () => import("./examples/tabs-demo"),
  "tabs-example": () => import("./examples/tabs-example"),
  "tooltip-demo": () => import("./examples/tooltip-demo"),
  "chart-area-default": () => import("./charts/chart-area-default"),
  "chart-bar-default": () => import("./charts/chart-bar-default"),
  "chart-line-default": () => import("./charts/chart-line-default"),
  "chart-pie-simple": () => import("./charts/chart-pie-simple"),
  "chart-radar-default": () => import("./charts/chart-radar-default"),
  "chart-radial-simple": () => import("./charts/chart-radial-simple"),
  "chart-tooltip-default": () => import("./charts/chart-tooltip-default"),
  "login-01": () => import("./blocks/login-01/page"),
  "sidebar-07": () => import("./blocks/sidebar-07/page"),
}
