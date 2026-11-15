"use client"

import * as React from "react"
import * as MenuPrimitive from "@ui-sdk/react/menu"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { popupContainer, sideOf, slotRender } from "../../../lib/uisdk-slot"
import type { BaseSide } from "../../../lib/uisdk-slot"
import { contextMenu } from "../../../styles/context-menu.styles"
import {
  menuCheckableRowPadding,
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

function ContextMenu({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Menu>) {
  return (
    <MenuPrimitive.Menu
      data-slot="context-menu"
      container={popupContainer()}
      {...props}
    />
  )
}

/** Base UI's portal, which ui-sdk's content does itself: its children as they are. */
function ContextMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function ContextMenuTrigger({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuContextTrigger>,
  "className"
> & { sx?: Sx }) {
  return (
    <MenuPrimitive.MenuContextTrigger
      {...props}
      render={slotRender("context-menu-trigger", "div", props.render)}
      {...styleProps(contextMenu.trigger, sx)}
    />
  )
}

function ContextMenuContent({
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
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
      render={slotRender("context-menu-content", "div", props.render)}
      align={align}
      alignOffset={alignOffset}
      side={sideOf(side)}
      sideOffset={sideOffset}
      {...styleProps(
        menuPositioner,
        popupMotion,
        menuSurface,
        contextMenu.content,
        sx
      )}
    />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuGroup>) {
  return (
    <MenuPrimitive.MenuGroup
      {...props}
      render={slotRender("context-menu-group", "div", props.render)}
    />
  )
}

function ContextMenuLabel({
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
      render={slotRender("context-menu-label", "div", props.render)}
      {...styleProps(menuLabel, menuLabelWeight, sx)}
    />
  )
}

function ContextMenuItem({
  sx,
  inset,
  variant = "default",
  ...props
}: Omit<React.ComponentProps<typeof MenuPrimitive.MenuItem>, "className"> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: Sx
}) {
  return (
    <MenuPrimitive.MenuItem
      data-inset={inset}
      data-variant={variant}
      {...props}
      render={slotRender("context-menu-item", "div", props.render)}
      {...styleProps(
        menuRowBase,
        menuRowPadding,
        variant === "destructive" && menuRowDestructive,
        sx
      )}
    />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuSub>) {
  return <MenuPrimitive.MenuSub data-slot="context-menu-sub" {...props} />
}

function ContextMenuSubTrigger({
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
      render={slotRender("context-menu-sub-trigger", "div", props.render)}
      {...styleProps(menuRowBase, menuRowPadding, contextMenu.subTrigger, sx)}
    >
      {children}
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        {...styleProps(contextMenu.subTriggerIcon)}
      />
    </MenuPrimitive.MenuSubTrigger>
  )
}

/** A submenu's list: ui-sdk's own part for it, with the menu's styles and the submenu's. */
function ContextMenuSubContent({
  side = "right",
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuSubContent>,
  "className" | "side"
> & { sx?: Sx; side?: BaseSide }) {
  return (
    <MenuPrimitive.MenuSubContent
      {...props}
      render={slotRender("context-menu-sub-content", "div", props.render)}
      side={sideOf(side)}
      {...styleProps(
        menuPositioner,
        popupMotion,
        menuSurface,
        contextMenu.content,
        contextMenu.subContent,
        sx
      )}
    />
  )
}

function ContextMenuCheckboxItem({
  sx,
  children,
  inset,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuCheckboxItem>,
  "className" | "children" | "value"
> & { children?: React.ReactNode; value?: string } & {
  inset?: boolean
  sx?: Sx
}) {
  // Base UI\'s item needs no value; ui-sdk\'s names it within the menu.
  const id = React.useId()
  return (
    <MenuPrimitive.MenuCheckboxItem
      data-inset={inset}
      value={id}
      {...props}
      render={slotRender("context-menu-checkbox-item", "div", props.render)}
      {...styleProps(
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        sx
      )}
    >
      <span sx={contextMenu.indicator}>
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

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.MenuRadioGroup>) {
  return (
    <MenuPrimitive.MenuRadioGroup
      {...props}
      render={slotRender("context-menu-radio-group", "div", props.render)}
    />
  )
}

function ContextMenuRadioItem({
  sx,
  children,
  inset,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuRadioItem>,
  "className" | "children"
> & { children?: React.ReactNode } & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.MenuRadioItem
      data-inset={inset}
      {...props}
      render={slotRender("context-menu-radio-item", "div", props.render)}
      {...styleProps(
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        sx
      )}
    >
      <span sx={contextMenu.indicator}>
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

function ContextMenuSeparator({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive.MenuSeparator>,
  "className"
> & { sx?: Sx }) {
  return (
    <MenuPrimitive.MenuSeparator
      {...props}
      render={slotRender("context-menu-separator", "div", props.render)}
      {...styleProps(menuSeparator, sx)}
    />
  )
}

function ContextMenuShortcut({
  sx,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }) {
  return (
    <span
      data-slot="context-menu-shortcut"
      {...props}
      sx={[menuShortcut, sx]}
    />
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}
