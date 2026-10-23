"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/react"
import type { Sx } from "../../../lib/sx"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuLabel,
  menuPositioner,
  menuRowBase,
  menuSeparator,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import { select } from "../../../styles/select.styles"

const Select = SelectPrimitive.Root

function SelectGroup({
  sx,
  ...props
}: Omit<SelectPrimitive.Group.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...props}
      {...styleProps(select.group, sx)}
    />
  )
}

function SelectValue({
  sx,
  ...props
}: Omit<SelectPrimitive.Value.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...props}
      {...styleProps(select.value, sx)}
    />
  )
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: Omit<SelectPrimitive.Trigger.Props, "className"> & {
  size?: "sm" | "default"
  sx?: Sx
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      {...props}
      {...styleProps(select.trigger, sx)}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconSelector"
            hugeicons="UnfoldMoreIcon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            sx={select.triggerIcon}
          />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  sx,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: Omit<SelectPrimitive.Popup.Props, "className"> &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & { sx?: Sx }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        {...styleProps(menuPositioner)}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          {...props}
          {...styleProps(popupMotion, menuSurface, select.content, sx)}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  sx,
  ...props
}: Omit<SelectPrimitive.GroupLabel.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      {...props}
      {...styleProps(menuLabel, sx)}
    />
  )
}

function SelectItem({
  sx,
  children,
  ...props
}: Omit<SelectPrimitive.Item.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      {...props}
      {...styleProps(menuRowBase, menuCheckableRowPadding, select.item, sx)}
    >
      <SelectPrimitive.ItemText {...styleProps(select.itemText)}>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={<span sx={[menuIndicator, select.indicator]} />}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  sx,
  ...props
}: Omit<SelectPrimitive.Separator.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...props}
      {...styleProps(menuSeparator, sx)}
    />
  )
}

function SelectScrollUpButton({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>,
  "className"
> & { sx?: Sx }) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      {...props}
      {...styleProps(select.scrollButton, select.scrollUp, sx)}
    >
      <IconPlaceholder
        lucide="ChevronUpIcon"
        tabler="IconChevronUp"
        hugeicons="ArrowUp01Icon"
        phosphor="CaretUpIcon"
        remixicon="RiArrowUpSLine"
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>,
  "className"
> & { sx?: Sx }) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      {...props}
      {...styleProps(select.scrollButton, select.scrollDown, sx)}
    >
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
