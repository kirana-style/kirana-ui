import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  NavigationMenu as UisdkNavigationMenu,
  NavigationMenuContent as UisdkNavigationMenuContent,
  NavigationMenuIndicator as UisdkNavigationMenuIndicator,
  NavigationMenuItem as UisdkNavigationMenuItem,
  NavigationMenuLink as UisdkNavigationMenuLink,
  NavigationMenuList as UisdkNavigationMenuList,
  NavigationMenuTrigger as UisdkNavigationMenuTrigger,
  NavigationMenuViewport,
} from "@ui-sdk/solid/navigation-menu"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { navigationMenu } from "../../../styles/navigation-menu.styles"
import { IconPlaceholder } from "./icon-placeholder"

/**
 * Where the open panel's popup renders: the document's body, as Base UI's portal puts it. Nothing
 * on the server, where no panel is open.
 */
const popupContainer = () =>
  typeof document === "undefined" ? undefined : document.body

/**
 * ui-sdk's navigation menu, drawn as Base UI's: the bar, and the viewport the open item's content
 * shows in. ui-sdk's viewport is Base UI's positioner, popup and viewport in one element, which
 * places itself and takes the panel's size: their styles on it, then its own (`viewportUisdk`).
 * `onValueChange` is called with `{ value }`, as the Ark UI part's.
 */
function NavigationMenu(props: {
  align?: "start" | "center" | "end"
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (details: { value: string | null }) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "align", "onValueChange", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkNavigationMenu}
      slotName="navigation-menu"
      tag="nav"
      container={popupContainer()}
      {...rest}
      onValueChange={(value: string | null) => props.onValueChange?.({ value })}
      {...styleProps(props.class, navigationMenu.root, props.sx)}
    >
      {props.children}
      <NavigationMenuViewport
        side="bottom"
        sideOffset={8}
        align={props.align ?? "start"}
        alignOffset={0}
        {...styleProps(
          navigationMenu.positioner,
          navigationMenu.popup,
          navigationMenu.viewport,
          navigationMenu.viewportUisdk
        )}
      />
    </UisdkPart>
  )
}

/** An item's panel, which ui-sdk shows in the menu's viewport while its item is open. */
function NavigationMenuContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkNavigationMenuContent}
      slotName="navigation-menu-content"
      tag="div"
      {...rest}
      {...styleProps(props.class, navigationMenu.content, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

/** The arrow under the open trigger: ui-sdk's indicator, which follows it. */
function NavigationMenuIndicator(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={UisdkNavigationMenuIndicator}
      slotName="navigation-menu-indicator"
      tag="span"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, navigationMenu.indicator, props.sx)}
    >
      <div sx={navigationMenu.arrow} />
    </UisdkPart>
  )
}

function NavigationMenuItem(props: {
  /** Base UI's `value` is optional: ui-sdk makes one when it is not given. */
  value?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkNavigationMenuItem}
      slotName="navigation-menu-item"
      tag="li"
      {...rest}
      {...styleProps(props.class, navigationMenu.item, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

/** A link: Base UI's `active` is ui-sdk's `current` (`aria-current="page"`). */
function NavigationMenuLink(props: {
  /** Base UI's: the current page's link. */
  active?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "active", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkNavigationMenuLink}
      slotName="navigation-menu-link"
      tag="a"
      current={props.active ?? false}
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, navigationMenu.link, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function NavigationMenuList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkNavigationMenuList}
      slotName="navigation-menu-list"
      tag="ul"
      {...rest}
      {...styleProps(props.class, navigationMenu.list, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function NavigationMenuTrigger(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkNavigationMenuTrigger}
      slotName="navigation-menu-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, navigationMenu.trigger, props.sx)}
    >
      {props.children}{" "}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        aria-hidden="true"
        {...styleProps(navigationMenu.triggerIcon)}
      />
    </UisdkPart>
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
/**
 * The trigger's look, for a link in the bar beside the triggers:
 * `<NavigationMenuLink sx={navigationMenuTriggerStyle} />`, upstream's `navigationMenuTriggerStyle()`.
 */
export const navigationMenuTriggerStyle = navigationMenu.triggerLook
