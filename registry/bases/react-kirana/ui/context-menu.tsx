"use client"

import * as React from "react"

import type { PartProps } from "../../../lib/kirana-render"
import { useSide } from "../../../lib/kirana-side"
import type { Side } from "../../../lib/placement"
import { ContextMenu as MenuPrimitive } from "@kirana-ui/react/context-menu"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
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

function ContextMenu({ ...props }: PartProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuPortal({
  ...props
}: PartProps<typeof MenuPrimitive.Portal>) {
  return <MenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
}

function ContextMenuTrigger({
  sx,
  ...props
}: Omit<PartProps<typeof MenuPrimitive.Trigger>, "className"> & { sx?: Sx }) {
  return (
    <MenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      {...props}
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
}: Omit<PartProps<typeof MenuPrimitive.Popup>, "className"> &
  Pick<
    PartProps<typeof MenuPrimitive.Positioner>,
    "align" | "alignOffset" | "sideOffset"
  > & {
    /** Base UI\'s sides, the logical two among them (PF-016). */
    side?: Side
  } & { sx?: Sx }) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={useSide(side)}
        sideOffset={sideOffset}
        {...styleProps(menuPositioner)}
      >
        <MenuPrimitive.Popup
          data-slot="context-menu-content"
          {...props}
          {...styleProps(popupMotion, menuSurface, contextMenu.content, sx)}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function ContextMenuGroup({ ...props }: PartProps<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

function ContextMenuLabel({
  sx,
  inset,
  ...props
}: Omit<PartProps<typeof MenuPrimitive.GroupLabel>, "className"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      {...props}
      {...styleProps(menuLabel, menuLabelWeight, sx)}
    />
  )
}

function ContextMenuItem({
  sx,
  inset,
  variant = "default",
  ...props
}: Omit<PartProps<typeof MenuPrimitive.Item>, "className"> & {
  inset?: boolean
  variant?: "default" | "destructive"
  sx?: Sx
}) {
  return (
    <MenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      {...props}
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
}: PartProps<typeof MenuPrimitive.SubmenuRoot>) {
  return <MenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
}

function ContextMenuSubTrigger({
  sx,
  inset,
  children,
  ...props
}: Omit<PartProps<typeof MenuPrimitive.SubmenuTrigger>, "className"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      {...props}
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
    </MenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({
  sx,
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      side="right"
      {...props}
      sx={[contextMenu.subContent, sx]}
    />
  )
}

function ContextMenuCheckboxItem({
  sx,
  children,
  inset,
  ...props
}: Omit<PartProps<typeof MenuPrimitive.CheckboxItem>, "className"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      {...props}
      {...styleProps(
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        sx
      )}
    >
      <span sx={contextMenu.indicator}>
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

function ContextMenuRadioGroup({
  ...props
}: PartProps<typeof MenuPrimitive.RadioGroup>) {
  return (
    <MenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
  )
}

function ContextMenuRadioItem({
  sx,
  children,
  inset,
  ...props
}: Omit<PartProps<typeof MenuPrimitive.RadioItem>, "className"> & {
  inset?: boolean
  sx?: Sx
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      {...props}
      {...styleProps(
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        sx
      )}
    >
      <span sx={contextMenu.indicator}>
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

function ContextMenuSeparator({
  sx,
  ...props
}: Omit<PartProps<typeof MenuPrimitive.Separator>, "className"> & { sx?: Sx }) {
  return (
    <MenuPrimitive.Separator
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
