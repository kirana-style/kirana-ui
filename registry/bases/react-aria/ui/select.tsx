"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Button as ButtonPrimitive,
  composeRenderProps,
  Header as HeaderPrimitive,
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
  ListBoxSection as ListBoxSectionPrimitive,
  Popover as PopoverPrimitive,
  SearchField,
  Select as SelectPrimitive,
  SelectValue as SelectValuePrimitive,
  Separator as SeparatorPrimitive,
} from "react-aria-components"
import type {
  ListBoxProps,
  ListBoxSectionProps as SelectGroupProps,
  SearchFieldProps,
  SelectProps,
  SelectValueProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuLabel,
  menuRowBase,
  menuSeparator,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import { select } from "../../../styles/select.styles"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"

type WithSx<P> = Omit<P, "className" | "style"> & { sx?: Sx }

function Select<T extends object, M extends "single" | "multiple" = "single">({
  sx,
  ...props
}: WithSx<SelectProps<T, M>>) {
  return (
    <SelectPrimitive
      data-slot="select"
      {...props}
      {...styleProps(select.root, sx)}
    />
  )
}

function SelectGroup<T extends object>({
  sx,
  ...props
}: WithSx<SelectGroupProps<T>>) {
  return (
    <ListBoxSectionPrimitive
      data-slot="select-group"
      {...props}
      {...styleProps(select.group, sx)}
    />
  )
}

function SelectValue<T extends object>({
  sx,
  children,
  ...props
}: WithSx<SelectValueProps<T>>) {
  return (
    <SelectValuePrimitive
      data-slot="select-value"
      {...props}
      {...styleProps(select.value, sx)}
    >
      {typeof children === "function"
        ? children
        : ({ selectedItems, selectedText, defaultChildren }) =>
            selectedItems.length > 1 ? selectedText : defaultChildren}
    </SelectValuePrimitive>
  )
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ButtonPrimitive>,
  "children" | "className" | "style"
> & {
  children?: React.ReactNode
  size?: "sm" | "default"
  sx?: Sx
}) {
  return (
    <ButtonPrimitive
      data-slot="select-trigger"
      data-size={size}
      {...props}
      {...styleProps(select.trigger, select.triggerFill, sx)}
    >
      {children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        {...styleProps(select.triggerIcon)}
      />
    </ButtonPrimitive>
  )
}

function SelectContent({
  sx,
  children,
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive>,
  "className" | "style" | "children"
> & { sx?: Sx; children?: React.ReactNode }) {
  return (
    <SelectPopover
      sx={sx}
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
    >
      <SelectList>{children}</SelectList>
    </SelectPopover>
  )
}

function SelectPopover({
  sx,
  children,
  placement = "bottom start",
  offset = 4,
  crossOffset = 0,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive>,
  "className" | "style" | "children"
> & { sx?: Sx; children?: React.ReactNode }) {
  return (
    <PopoverPrimitive
      data-slot="select-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      {...styleProps(
        popupMotion,
        menuSurface,
        select.content,
        select.popover,
        sx
      )}
    >
      {children}
    </PopoverPrimitive>
  )
}

function SelectList<T extends object>({
  sx,
  ...props
}: WithSx<ListBoxProps<T>>) {
  return (
    <ListBoxPrimitive
      data-slot="select-list"
      {...props}
      {...styleProps(select.list, sx)}
    />
  )
}

function SelectLabel({
  sx,
  ...props
}: WithSx<React.ComponentProps<typeof HeaderPrimitive>>) {
  return (
    <HeaderPrimitive
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
}: WithSx<React.ComponentProps<typeof ListBoxItemPrimitive>>) {
  return (
    <ListBoxItemPrimitive
      data-slot="select-item"
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      {...styleProps(menuRowBase, menuCheckableRowPadding, select.item, sx)}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          <span sx={select.itemText}>{content}</span>
          <span sx={[menuIndicator, select.indicator]}>
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
        </>
      ))}
    </ListBoxItemPrimitive>
  )
}

function SelectSeparator({
  sx,
  ...props
}: WithSx<React.ComponentProps<typeof SeparatorPrimitive>>) {
  return (
    <SeparatorPrimitive
      data-slot="select-separator"
      {...props}
      {...styleProps([menuSeparator, select.separator], sx)}
    />
  )
}

/** A search field at the top of the popup, for a select inside React Aria's Autocomplete. */
function SelectInput({ sx, ...props }: WithSx<SearchFieldProps>) {
  return (
    <SearchField
      {...props}
      autoFocus
      data-slot="select-input-wrapper"
      {...styleProps(select.inputWrapper, sx)}
    >
      <InputGroup>
        <InputGroupInput data-slot="select-input" sx={select.input} />
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            {...styleProps(select.inputIcon)}
          />
        </InputGroupAddon>
      </InputGroup>
    </SearchField>
  )
}

function SelectEmpty({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="select-empty" {...props} sx={[select.empty, sx]} />
}

export {
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectInput,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPopover,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
