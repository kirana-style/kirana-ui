"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
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
}: Omit<MenubarPrimitive.Props, "className"> & { sx?: Sx }) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      {...props}
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
  ...props
}: Omit<MenuPrimitive.CheckboxItem.Props, "className"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      checked={checked}
      {...props}
      {...styleProps(
        menuRowBase,
        menubar.checkableRow,
        menubar.checkboxRow,
        sx
      )}
    >
      <span sx={menubar.indicator}>
        <MenuPrimitive.CheckboxItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
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
  ...props
}: Omit<MenuPrimitive.RadioItem.Props, "className"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      {...props}
      {...styleProps(menuRowBase, menubar.checkableRow, sx)}
    >
      <span sx={menubar.indicator}>
        <MenuPrimitive.RadioItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
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
