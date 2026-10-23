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
import { dropdownMenu } from "../../../styles/dropdown-menu.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
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

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof MenuTriggerPrimitive>) {
  return <MenuTriggerPrimitive data-slot="dropdown-menu-trigger" {...props} />
}

/** The menu itself, in its popover. */
function DropdownMenu({
  "data-slot": dataSlot = "dropdown-menu-content",
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
      {...styleProps(popupMotion, menuSurface, dropdownMenu.content, sx)}
    >
      <MenuPrimitive {...props} {...styleProps(menuList)}>
        {children}
      </MenuPrimitive>
    </PopoverPrimitive>
  )
}

function DropdownMenuGroup({
  ...props
}: Omit<MenuSectionPrimitiveProps<object>, "children"> & {
  children?: React.ReactNode
}) {
  return <MenuSectionPrimitive data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  sx,
  inset,
  ...props
}: Omit<React.ComponentProps<typeof HeaderPrimitive>, "className" | "style"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <HeaderPrimitive
      data-slot="dropdown-menu-label"
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
function DropdownMenuItem({
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
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      textValue={typeof children === "string" ? children : props.textValue}
      {...props}
      className={({ selectionMode }) =>
        styleProps(
          menuRowBase,
          selectionMode === "none" ? menuRowPadding : menuCheckableRowPadding,
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
              <span
                data-slot={
                  selectionMode === "single"
                    ? "dropdown-menu-radio-item-indicator"
                    : "dropdown-menu-checkbox-item-indicator"
                }
                sx={menuIndicator}
              >
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

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof SubmenuTriggerPrimitive>) {
  return <SubmenuTriggerPrimitive data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
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
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      textValue={typeof children === "string" ? children : props.textValue}
      {...props}
      {...styleProps(menuRowBase, menuRowPadding, dropdownMenu.subTrigger, sx)}
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
            {...styleProps(dropdownMenu.subTriggerIcon)}
          />
        </>
      ))}
    </MenuItemPrimitive>
  )
}

function DropdownMenuSubContent({
  placement = "end top",
  crossOffset = -3,
  offset = 0,
  sx,
  ...props
}: React.ComponentProps<typeof DropdownMenu>) {
  return (
    <DropdownMenu
      data-slot="dropdown-menu-sub-content"
      placement={placement}
      crossOffset={crossOffset}
      offset={offset}
      {...props}
      sx={[dropdownMenu.subContent, sx]}
    />
  )
}

function DropdownMenuSeparator({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "className" | "style"
> & { sx?: Sx }) {
  return (
    <SeparatorPrimitive
      data-slot="dropdown-menu-separator"
      {...props}
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
