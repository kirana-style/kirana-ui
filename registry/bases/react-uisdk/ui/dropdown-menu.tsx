"use client"

import * as React from "react"
import * as MenuPrimitive from "@ui-sdk/react/menu"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import {
  popupContainer,
  sideOf,
  slotOf,
  slotRender,
} from "../../../lib/uisdk-slot"
import type { BaseSide } from "../../../lib/uisdk-slot"
import { dropdownMenu } from "../../../styles/dropdown-menu.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuLabel,
  menuLabelWeight,
  menuPositioner,
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
  menuSeparator,
  menuShortcut,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Menu>) {
  return (
    <MenuPrimitive.Menu
      data-slot="dropdown-menu"
      container={popupContainer()}
      {...props}
    />
  )
}

/** Base UI's portal, which ui-sdk's content does itself: its children as they are. */
function DropdownMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuTrigger>) {
  return (
    <MenuPrimitive.MenuTrigger
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-trigger"),
        "button",
        props.render
      )}
    />
  )
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuContent>,
  "className" | "side"
> &
  Pick<
    React.ComponentProps<typeof MenuPrimitive.MenuContent>,
    "align" | "alignOffset" | "sideOffset"
  > & { sx?: Sx; side?: BaseSide }) {
  return (
    <MenuPrimitive.MenuContent
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-content"),
        "div",
        props.render
      )}
      align={align}
      alignOffset={alignOffset}
      side={sideOf(side)}
      sideOffset={sideOffset}
      {...styleProps(
        menuPositioner,
        popupMotion,
        menuSurface,
        dropdownMenu.content,
        sx
      )}
    />
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuGroup>) {
  return (
    <MenuPrimitive.MenuGroup
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-group"),
        "div",
        props.render
      )}
    />
  )
}

function DropdownMenuLabel({
  sx,
  inset,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuGroupLabel>,
  "className"
> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.MenuGroupLabel
      data-inset={inset}
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-label"),
        "div",
        props.render
      )}
      {...styleProps(menuLabel, menuLabelWeight, sx)}
    />
  )
}

function DropdownMenuItem({
  sx,
  inset,
  variant = "default",
  closeOnClick,
  ...props
}: Omit<React.ComponentProps<typeof MenuPrimitive.MenuItem>, "className"> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: Sx
} & {
  /** Base UI's name for ui-sdk's `closeOnSelect`. */
  closeOnClick?: boolean
}) {
  return (
    <MenuPrimitive.MenuItem
      closeOnSelect={closeOnClick}
      data-inset={inset}
      data-variant={variant}
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-item"),
        "div",
        props.render
      )}
      {...styleProps(
        menuRowBase,
        menuRowPadding,
        variant === "destructive" && menuRowDestructive,
        sx
      )}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuSub>) {
  return <MenuPrimitive.MenuSub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  sx,
  inset,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuSubTrigger>,
  "className" | "children"
> & { children?: React.ReactNode } & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.MenuSubTrigger
      data-inset={inset}
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-sub-trigger"),
        "div",
        props.render
      )}
      {...styleProps(menuRowBase, menuRowPadding, dropdownMenu.subTrigger, sx)}
    >
      {children}
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        {...styleProps(dropdownMenu.subTriggerIcon)}
      />
    </MenuPrimitive.MenuSubTrigger>
  )
}

/** A submenu's list: ui-sdk's own part for it, with the menu's styles and the submenu's. */
function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuSubContent>,
  "className" | "side"
> & { sx?: Sx; side?: BaseSide }) {
  return (
    <MenuPrimitive.MenuSubContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-sub-content"),
        "div",
        props.render
      )}
      side={sideOf(side)}
      {...styleProps(
        menuPositioner,
        popupMotion,
        menuSurface,
        dropdownMenu.content,
        dropdownMenu.subContent,
        sx
      )}
    />
  )
}

function DropdownMenuCheckboxItem({
  sx,
  children,
  inset,
  closeOnClick,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuCheckboxItem>,
  "className" | "children" | "value"
> & { children?: React.ReactNode; value?: string } & {
  inset?: boolean
  sx?: Sx
} & {
  /** Base UI's name for ui-sdk's `closeOnSelect`. */
  closeOnClick?: boolean
}) {
  // Base UI\'s item needs no value; ui-sdk\'s names it within the menu.
  const id = React.useId()
  return (
    <MenuPrimitive.MenuCheckboxItem
      closeOnSelect={closeOnClick}
      data-inset={inset}
      value={id}
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-checkbox-item"),
        "div",
        props.render
      )}
      {...styleProps(menuRowBase, menuCheckableRowPadding, sx)}
    >
      <span
        data-slot="dropdown-menu-checkbox-item-indicator"
        sx={menuIndicator}
      >
        <MenuPrimitive.MenuItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MenuPrimitive.MenuItemIndicator>
      </span>
      {children}
    </MenuPrimitive.MenuCheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuRadioGroup>) {
  return (
    <MenuPrimitive.MenuRadioGroup
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-radio-group"),
        "div",
        props.render
      )}
    />
  )
}

function DropdownMenuRadioItem({
  sx,
  children,
  inset,
  closeOnClick,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuRadioItem>,
  "className" | "children"
> & { children?: React.ReactNode } & {
  inset?: boolean
  sx?: Sx
} & {
  /** Base UI's name for ui-sdk's `closeOnSelect`. */
  closeOnClick?: boolean
}) {
  return (
    <MenuPrimitive.MenuRadioItem
      closeOnSelect={closeOnClick}
      data-inset={inset}
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-radio-item"),
        "div",
        props.render
      )}
      {...styleProps(menuRowBase, menuCheckableRowPadding, sx)}
    >
      <span data-slot="dropdown-menu-radio-item-indicator" sx={menuIndicator}>
        <MenuPrimitive.MenuItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MenuPrimitive.MenuItemIndicator>
      </span>
      {children}
    </MenuPrimitive.MenuRadioItem>
  )
}

function DropdownMenuSeparator({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuSeparator>,
  "className"
> & { sx?: Sx }) {
  return (
    <MenuPrimitive.MenuSeparator
      {...props}
      render={slotRender(
        slotOf(props, "dropdown-menu-separator"),
        "div",
        props.render
      )}
      {...styleProps(menuSeparator, sx)}
    />
  )
}

function DropdownMenuShortcut({
  sx,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      {...props}
      sx={[menuShortcut, sx]}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
