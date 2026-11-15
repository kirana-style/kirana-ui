"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@ui-sdk/react/navigation-menu"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { popupContainer, slotRender } from "../../../lib/uisdk-slot"
import { navigationMenu } from "../../../styles/navigation-menu.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function NavigationMenu({
  align = "start",
  sx,
  children,
  ...props
}: Props<
  Omit<
    React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenu>,
    "children"
  >
> & {
  align?: React.ComponentProps<
    typeof NavigationMenuPrimitive.NavigationMenuViewport
  >["align"]
  children?: React.ReactNode
}) {
  return (
    <NavigationMenuPrimitive.NavigationMenu
      container={popupContainer()}
      {...props}
      render={slotRender("navigation-menu", "nav", props.render)}
      {...styleProps(navigationMenu.root, sx)}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.NavigationMenu>
  )
}

function NavigationMenuList({
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuList>
>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuList
      {...props}
      render={slotRender("navigation-menu-list", "ul", props.render)}
      {...styleProps(navigationMenu.list, sx)}
    />
  )
}

function NavigationMenuItem({
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuItem>
>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuItem
      {...props}
      render={slotRender("navigation-menu-item", "li", props.render)}
      {...styleProps(navigationMenu.item, sx)}
    />
  )
}

/**
 * The trigger's look, for a link in the bar beside the triggers:
 * `<NavigationMenuLink sx={navigationMenuTriggerStyle} />`, upstream's `navigationMenuTriggerStyle()`.
 */
const navigationMenuTriggerStyle = navigationMenu.triggerLook

function NavigationMenuTrigger({
  sx,
  children,
  ...props
}: Props<
  Omit<
    React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuTrigger>,
    "children"
  >
> & { children?: React.ReactNode }) {
  return (
    <NavigationMenuPrimitive.NavigationMenuTrigger
      {...props}
      render={slotRender("navigation-menu-trigger", "button", props.render)}
      {...styleProps(navigationMenu.trigger, sx)}
    >
      {children}{" "}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        aria-hidden="true"
        {...styleProps(navigationMenu.triggerIcon)}
      />
    </NavigationMenuPrimitive.NavigationMenuTrigger>
  )
}

function NavigationMenuContent({
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuContent>
>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuContent
      {...props}
      render={slotRender("navigation-menu-content", "div", props.render)}
      {...styleProps(navigationMenu.content, sx)}
    />
  )
}

/**
 * Where the open panel shows. ui-sdk's viewport is Base UI's positioner, popup and viewport in one
 * element, which places itself: their styles on it, then its own sizes (`viewportUisdk`).
 */
function NavigationMenuPositioner({
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuViewport>
>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuViewport
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      {...props}
      {...styleProps(
        navigationMenu.positioner,
        navigationMenu.popup,
        navigationMenu.viewport,
        navigationMenu.viewportUisdk,
        sx
      )}
    />
  )
}

/** A link: Base UI's `active` is ui-sdk's `current` (`aria-current="page"`). */
function NavigationMenuLink({
  sx,
  active,
  current,
  ...props
}: Props<
  React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuLink>
> & {
  active?: boolean
}) {
  return (
    <NavigationMenuPrimitive.NavigationMenuLink
      current={current ?? active}
      {...props}
      render={slotRender("navigation-menu-link", "a", props.render)}
      {...styleProps(navigationMenu.link, sx)}
    />
  )
}

/** The arrow under the open trigger: ui-sdk's indicator, which follows it. */
function NavigationMenuIndicator({
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof NavigationMenuPrimitive.NavigationMenuIndicator>
>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuIndicator
      {...props}
      render={slotRender("navigation-menu-indicator", "span", props.render)}
      {...styleProps(navigationMenu.indicator, sx)}
    >
      <div sx={navigationMenu.arrow} />
    </NavigationMenuPrimitive.NavigationMenuIndicator>
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
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
}
