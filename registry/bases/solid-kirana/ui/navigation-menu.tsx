import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { NavigationMenu as NavigationMenuPrimitive } from "@kirana-ui/solid/navigation-menu"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import { asRender } from "../../../lib/solid/element"
import type { AsChild } from "../../../lib/solid/element"
import { navigationMenu } from "../../../styles/navigation-menu.styles"
import { IconPlaceholder } from "./icon-placeholder"

/**
 * Kirana UI's navigation menu, drawn as Base UI's: the bar, and below it a portal holding the
 * positioner, the popup and its viewport, which the open item's content is drawn in. The rest
 * (`value`, `defaultValue`, `delay`, `closeDelay`, `orientation`) goes to Kirana UI's root;
 * `onValueChange` is given Ark UI's details, `{ value }`, the open item's (`""` for none).
 */
function NavigationMenu(props: {
  align?: "start" | "center" | "end"
  onValueChange?: (details: { value: string }) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ align: "start" } as const, props),
    ["align", "onValueChange", "class", "sx", "children"]
  )
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      {...rest}
      onValueChange={(value) =>
        local.onValueChange?.({ value: value == null ? "" : String(value) })
      }
      {...styleProps(local.class, navigationMenu.root, local.sx)}
    >
      {local.children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          side="bottom"
          sideOffset={8}
          align={local.align}
          alignOffset={0}
          {...styleProps(navigationMenu.positioner)}
        >
          <NavigationMenuPrimitive.Popup {...styleProps(navigationMenu.popup)}>
            <NavigationMenuPrimitive.Viewport
              {...styleProps(navigationMenu.viewport)}
            />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  // Drawn in the viewport every item shares.
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      {...rest}
      {...styleProps(local.class, navigationMenu.content, local.sx)}
    >
      {local.children}
    </NavigationMenuPrimitive.Content>
  )
}

function NavigationMenuIndicator(props: {
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  // Base UI's `Icon`, which upstream's indicator draws: a mark on the open item's trigger.
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      {...rest}
      {...styleProps(local.class, navigationMenu.indicator, local.sx)}
      render={asRender(local.asChild)}
    >
      <div sx={navigationMenu.arrow} />
    </NavigationMenuPrimitive.Icon>
  )
}

function NavigationMenuItem(props: {
  /** Base UI's `value` is optional: one is made when it is not given. */
  value?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      {...rest}
      {...styleProps(local.class, navigationMenu.item, local.sx)}
    >
      {local.children}
    </NavigationMenuPrimitive.Item>
  )
}

function NavigationMenuLink(props: {
  /** Base UI's: the current page's link. */
  active?: boolean
  asChild?: AsChild<"a">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ active: false } as const, props),
    ["asChild", "active", "class", "sx", "children"]
  )
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      active={local.active}
      {...rest}
      {...styleProps(local.class, navigationMenu.link, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </NavigationMenuPrimitive.Link>
  )
}

function NavigationMenuList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      {...rest}
      {...styleProps(local.class, navigationMenu.list, local.sx)}
    >
      {local.children}
    </NavigationMenuPrimitive.List>
  )
}

function NavigationMenuTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      {...rest}
      {...styleProps(local.class, navigationMenu.trigger, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        aria-hidden="true"
        {...styleProps(navigationMenu.triggerIcon)}
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
}
export const navigationMenuTriggerStyle = navigationMenu.triggerLook
