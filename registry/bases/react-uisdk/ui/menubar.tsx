"use client"

import * as React from "react"
import * as MenuPrimitive from "@ui-sdk/react/menu"
import { Menubar as MenubarPrimitive } from "@ui-sdk/react/menubar"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { slotRender, slotOf } from "../../../lib/uisdk-slot"
import { menuRowBase } from "../../../styles/menu.styles"
import { menubar } from "../../../styles/menubar.styles"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

function Menubar({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof MenubarPrimitive>, "className"> & {
  sx?: Sx
}) {
  return (
    <MenubarPrimitive
      {...props}
      render={slotRender(slotOf(props, "menubar"), "div", props.render)}
      {...styleProps(menubar.root, sx)}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof DropdownMenuTrigger>, "className"> & {
  sx?: Sx
}) {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      {...props}
      {...styleProps(menubar.trigger, sx)}
    />
  )
}

function MenubarContent({
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  sx,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
      sx={[menubar.content, sx]}
    />
  )
}

function MenubarItem({
  sx,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      inset={inset}
      variant={variant}
      {...props}
      sx={[menubar.item, menubar.inset, sx]}
    />
  )
}

function MenubarCheckboxItem({
  sx,
  children,
  checked,
  inset,
  closeOnClick,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuCheckboxItem>,
  "className" | "children" | "value"
> & {
  value?: string
  inset?: boolean
  sx?: Sx
} & { children?: React.ReactNode } & {
  /** Base UI's name for ui-sdk's `closeOnSelect`. */
  closeOnClick?: boolean
}) {
  // Base UI's item needs no value; ui-sdk's names it within the menu.
  const id = React.useId()
  return (
    <MenuPrimitive.MenuCheckboxItem
      closeOnSelect={closeOnClick}
      data-inset={inset}
      checked={checked}
      value={id}
      {...props}
      render={slotRender(
        slotOf(props, "menubar-checkbox-item"),
        "div",
        props.render
      )}
      {...styleProps(
        menuRowBase,
        menubar.checkableRow,
        menubar.checkboxRow,
        sx
      )}
    >
      <span sx={menubar.indicator}>
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

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
  sx,
  children,
  inset,
  closeOnClick,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuRadioItem>,
  "className" | "children"
> & {
  inset?: boolean
  sx?: Sx
} & { children?: React.ReactNode } & {
  /** Base UI's name for ui-sdk's `closeOnSelect`. */
  closeOnClick?: boolean
}) {
  return (
    <MenuPrimitive.MenuRadioItem
      closeOnSelect={closeOnClick}
      data-inset={inset}
      {...props}
      render={slotRender(
        slotOf(props, "menubar-radio-item"),
        "div",
        props.render
      )}
      {...styleProps(menuRowBase, menubar.checkableRow, sx)}
    >
      <span sx={menubar.indicator}>
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

function MenubarLabel({
  sx,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel>) {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      inset={inset}
      {...props}
      sx={[menubar.label, sx]}
    />
  )
}

function MenubarSeparator({
  sx,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      {...props}
      sx={[menubar.separator, sx]}
    />
  )
}

function MenubarShortcut({
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return <DropdownMenuShortcut data-slot="menubar-shortcut" {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  sx,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      inset={inset}
      {...props}
      sx={[menubar.inset, sx]}
    />
  )
}

function MenubarSubContent({
  sx,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      {...props}
      sx={[menubar.subContent, sx]}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
