"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  composeRenderProps,
  Header as HeaderPrimitive,
  MenuItem as MenuItemPrimitive,
  Menu as MenuPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  Separator as SeparatorPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components"
import type {
  MenuItemProps as MenuItemPrimitiveProps,
  MenuSectionProps as MenuSectionPrimitiveProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { contextMenu } from "../../../styles/context-menu.styles"
import {
  menuCheckableRowPadding,
  menuLabel,
  menuLabelWeight,
  menuList,
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
  menuSeparator,
  menuShortcut,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"

function ContextMenuTrigger({
  ...props
}: Omit<React.ComponentProps<typeof MenuTriggerPrimitive>, "trigger">) {
  return (
    <MenuTriggerPrimitive
      data-slot="context-menu"
      trigger="contextMenu"
      {...props}
    />
  )
}

/** The menu itself, in its popover. */
function ContextMenu({
  "data-slot": dataSlot = "context-menu-content",
  placement = "bottom start",
  offset = 4,
  crossOffset = 0,
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive<object>>,
  "children" | "className" | "style"
> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive>,
    "placement" | "offset" | "crossOffset"
  > & {
    "data-slot"?: string
    sx?: Sx
    children?: React.ReactNode
  }) {
  return (
    <PopoverPrimitive
      data-slot={dataSlot}
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...styleProps(
        popupMotion,
        menuSurface,
        contextMenu.content,
        contextMenu.contentAria,
        sx
      )}
    >
      <MenuPrimitive {...props} {...styleProps(menuList)}>
        {children}
      </MenuPrimitive>
    </PopoverPrimitive>
  )
}

function ContextMenuGroup({
  ...props
}: Omit<MenuSectionPrimitiveProps<object>, "children"> & {
  children?: React.ReactNode
}) {
  return <MenuSectionPrimitive data-slot="context-menu-group" {...props} />
}

function ContextMenuLabel({
  sx,
  inset,
  ...props
}: Omit<React.ComponentProps<typeof HeaderPrimitive>, "className" | "style"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <HeaderPrimitive
      data-slot="context-menu-label"
      data-inset={inset}
      {...props}
      {...styleProps(menuLabel, menuLabelWeight, sx)}
    />
  )
}

/**
 * An item, or a checkbox or radio item when its menu has a `selectionMode`: React Aria marks the
 * choice on the item, so one part draws all three.
 */
function ContextMenuItem({
  sx,
  inset,
  variant = "default",
  children,
  ...props
}: Omit<MenuItemPrimitiveProps<object>, "className" | "style"> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: Sx
}) {
  return (
    <MenuItemPrimitive
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      textValue={typeof children === "string" ? children : props.textValue}
      {...props}
      className={({ selectionMode }) =>
        styleProps(
          menuRowBase,
          selectionMode === "none" ? menuRowPadding : menuCheckableRowPadding,
          selectionMode !== "none" && contextMenu.checkableRow,
          variant === "destructive" && menuRowDestructive,
          sx
        ).className ?? ""
      }
    >
      {composeRenderProps(
        children,
        (content, { isSelected, selectionMode }) => (
          <>
            {selectionMode !== "none" ? (
              <span sx={contextMenu.indicator}>
                {isSelected ? (
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  />
                ) : null}
              </span>
            ) : null}
            {content}
          </>
        )
      )}
    </MenuItemPrimitive>
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof SubmenuTriggerPrimitive>) {
  return <SubmenuTriggerPrimitive data-slot="context-menu-sub" {...props} />
}

function ContextMenuSubTrigger({
  sx,
  inset,
  children,
  ...props
}: Omit<MenuItemPrimitiveProps<object>, "className" | "style"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuItemPrimitive
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      textValue={typeof children === "string" ? children : props.textValue}
      {...props}
      {...styleProps(menuRowBase, menuRowPadding, contextMenu.subTrigger, sx)}
    >
      {composeRenderProps(children, (content) => (
        <>
          {content}
          <IconPlaceholder
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
            hugeicons="ArrowRight01Icon"
            phosphor="CaretRightIcon"
            remixicon="RiArrowRightSLine"
            {...styleProps(contextMenu.subTriggerIcon)}
          />
        </>
      ))}
    </MenuItemPrimitive>
  )
}

function ContextMenuSubContent({
  placement = "end top",
  crossOffset = -3,
  offset = 0,
  sx,
  ...props
}: React.ComponentProps<typeof ContextMenu>) {
  return (
    <ContextMenu
      data-slot="context-menu-sub-content"
      placement={placement}
      crossOffset={crossOffset}
      offset={offset}
      {...props}
      sx={[contextMenu.subContentAria, sx]}
    />
  )
}

function ContextMenuSeparator({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "className" | "style"
> & { sx?: Sx }) {
  return (
    <SeparatorPrimitive
      data-slot="context-menu-separator"
      {...props}
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
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}
