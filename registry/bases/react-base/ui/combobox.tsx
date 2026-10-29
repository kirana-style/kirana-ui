"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { combobox } from "../../../styles/combobox.styles"
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
import { Button } from "./button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  sx,
  children,
  ...props
}: Omit<ComboboxPrimitive.Trigger.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      {...props}
      {...styleProps(combobox.triggerOwn, sx)}
    >
      {children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        {...styleProps(combobox.triggerIcon)}
      />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({
  sx,
  ...props
}: Omit<ComboboxPrimitive.Clear.Props, "className" | "render"> & {
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      {...props}
      render={<InputGroupButton variant="ghost" size="icon-xs" sx={sx} />}
    >
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  sx,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "className"> & {
  showTrigger?: boolean
  showClear?: boolean
  sx?: Sx
}) {
  return (
    <InputGroup sx={[combobox.input, sx]}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          // The trigger renders the InputGroup's button, so the button keeps its own styles.
          <ComboboxPrimitive.Trigger
            data-slot="input-group-button"
            disabled={disabled}
            render={
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                sx={combobox.trigger}
              />
            }
          >
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              {...styleProps(combobox.triggerIcon)}
            />
          </ComboboxPrimitive.Trigger>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  sx,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: Omit<ComboboxPrimitive.Popup.Props, "className"> &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  > & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        {...styleProps(menuPositioner)}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          {...props}
          {...styleProps(popupMotion, menuSurface, combobox.content, sx)}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({
  sx,
  ...props
}: Omit<ComboboxPrimitive.List.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      {...props}
      {...styleProps(combobox.list, sx)}
    />
  )
}

function ComboboxItem({
  sx,
  children,
  ...props
}: Omit<ComboboxPrimitive.Item.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      {...props}
      {...styleProps(menuRowBase, menuCheckableRowPadding, combobox.item, sx)}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={<span sx={[menuIndicator, combobox.indicator]} />}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({
  sx,
  ...props
}: Omit<ComboboxPrimitive.Group.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      {...props}
      {...styleProps(sx)}
    />
  )
}

function ComboboxLabel({
  sx,
  ...props
}: Omit<ComboboxPrimitive.GroupLabel.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      {...props}
      {...styleProps(menuLabel, combobox.label, sx)}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({
  sx,
  ...props
}: Omit<ComboboxPrimitive.Empty.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      {...props}
      {...styleProps(combobox.empty, sx)}
    />
  )
}

function ComboboxSeparator({
  sx,
  ...props
}: Omit<ComboboxPrimitive.Separator.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      {...props}
      {...styleProps(menuSeparator, sx)}
    />
  )
}

function ComboboxChips({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips>,
  "className"
> &
  Omit<ComboboxPrimitive.Chips.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      {...props}
      {...styleProps(combobox.chips, sx)}
    />
  )
}

function ComboboxChip({
  sx,
  children,
  showRemove = true,
  ...props
}: Omit<ComboboxPrimitive.Chip.Props, "className"> & {
  showRemove?: boolean
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      {...props}
      {...styleProps(combobox.chip, sx)}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={
            <Button variant="ghost" size="icon-xs" sx={combobox.chipRemove} />
          }
          data-slot="combobox-chip-remove"
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  sx,
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "className"> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      {...props}
      {...styleProps(combobox.chipInput, sx)}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
