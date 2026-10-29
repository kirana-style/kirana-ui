import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { navigationMenu } from "../../../styles/navigation-menu.styles"

function NavigationMenu({
  align = "start",
  sx,
  children,
  ...props
}: Omit<NavigationMenuPrimitive.Root.Props, "className"> &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      {...props}
      {...styleProps(navigationMenu.root, sx)}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>,
  "className"
> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      {...props}
      {...styleProps(navigationMenu.list, sx)}
    />
  )
}

function NavigationMenuItem({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>,
  "className"
> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      {...props}
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
}: Omit<NavigationMenuPrimitive.Trigger.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      {...props}
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
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  sx,
  ...props
}: Omit<NavigationMenuPrimitive.Content.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      {...props}
      {...styleProps(navigationMenu.content, sx)}
    />
  )
}

function NavigationMenuPositioner({
  sx,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: Omit<NavigationMenuPrimitive.Positioner.Props, "className"> & {
  sx?: Sx
}) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...props}
        {...styleProps(navigationMenu.positioner, sx)}
      >
        <NavigationMenuPrimitive.Popup {...styleProps(navigationMenu.popup)}>
          <NavigationMenuPrimitive.Viewport
            {...styleProps(navigationMenu.viewport)}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuLink({
  sx,
  ...props
}: Omit<NavigationMenuPrimitive.Link.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      {...props}
      {...styleProps(navigationMenu.link, sx)}
    />
  )
}

function NavigationMenuIndicator({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>,
  "className"
> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      {...props}
      {...styleProps(navigationMenu.indicator, sx)}
    >
      <div sx={navigationMenu.arrow} />
    </NavigationMenuPrimitive.Icon>
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
