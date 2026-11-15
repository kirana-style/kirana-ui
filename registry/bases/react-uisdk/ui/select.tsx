"use client"

import * as React from "react"
import * as SelectPrimitive from "@ui-sdk/react/select"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { popupContainer, slotRender } from "../../../lib/uisdk-slot"
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

type Props<P> = Omit<P, "className"> & { sx?: Sx }

type RootProps = SelectPrimitive.SelectProps<unknown, boolean | undefined>

/** ui-sdk's root for one value or several, as Base UI's root takes `multiple`. */
const SelectRoot = SelectPrimitive.Select as (
  props: RootProps
) => React.JSX.Element

/** Base UI's items: a list of `{ label, value }`, or a record of labels by value. */
type BaseItems =
  | readonly { label: React.ReactNode; value: unknown }[]
  | Record<string, React.ReactNode>

/**
 * Base UI's Select root, as every React base's part takes it, on ui-sdk's: the value is the
 * caller's type (a state's setter is its `onValueChange`); Base UI's `items` (a list or a record)
 * are ui-sdk's list, an item of value `null` the placeholder, which Base UI shows for no value and
 * ui-sdk reads from `placeholder`; and with `itemToStringValue` each item is its own value, as
 * Base UI's object values are (ui-sdk's `itemToValue` and `itemToLabel`).
 */
function Select<Value, Multiple extends boolean | undefined = false>({
  items,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  itemToStringValue,
  itemToStringLabel,
  ...props
}: Omit<
  RootProps,
  "items" | "value" | "defaultValue" | "onValueChange" | "multiple"
> & {
  items?: BaseItems
  multiple?: Multiple
  value?: Multiple extends true ? Value[] : Value
  defaultValue?: Multiple extends true ? Value[] : Value
  onValueChange?: (
    value: Multiple extends true ? Value[] : Value,
    details: Parameters<NonNullable<RootProps["onValueChange"]>>[1]
  ) => void
  itemToStringValue?: (item: Value) => string
  itemToStringLabel?: (item: Value) => string
}) {
  const list = items
    ? Array.isArray(items)
      ? (items as { label: React.ReactNode; value: unknown }[])
      : Object.entries(items as Record<string, React.ReactNode>).map(
          ([key, label]) => ({ value: key, label })
        )
    : undefined
  const empty = list?.find((item) => item.value === null)
  const objects = itemToStringValue !== undefined
  return (
    <SelectRoot
      data-slot="select"
      container={popupContainer()}
      items={list
        ?.filter((item) => item.value !== null)
        .map((item) =>
          objects
            ? {
                value: item,
                label: itemToStringLabel
                  ? itemToStringLabel(item as Value)
                  : String(item.label),
              }
            : { value: item.value, label: String(item.label) }
        )}
      itemToValue={itemToStringValue as RootProps["itemToValue"]}
      itemToLabel={itemToStringLabel as RootProps["itemToLabel"]}
      placeholder={placeholder ?? (empty ? String(empty.label) : undefined)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange as RootProps["onValueChange"]}
      {...props}
    />
  )
}

function SelectGroup({
  sx,
  ...props
}: Props<React.ComponentProps<typeof SelectPrimitive.SelectGroup>>) {
  return (
    <SelectPrimitive.SelectGroup
      {...props}
      render={slotRender("select-group", "div", props.render)}
      {...styleProps(select.group, sx)}
    />
  )
}

/**
 * The trigger's text: ui-sdk's selected label or placeholder, or the caller's children; a function
 * child receives the value, as Base UI's does.
 */
function SelectValue({
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.SelectValue>,
  "className" | "children"
> & {
  sx?: Sx
  children?: React.ReactNode | ((value: never) => React.ReactNode)
}) {
  return (
    <SelectPrimitive.SelectValue
      {...props}
      render={slotRender("select-value", "span", props.render)}
      {...styleProps(select.value, sx)}
    >
      {typeof children === "function"
        ? (state: { value: unknown }) =>
            (children as (value: unknown) => React.ReactNode)(state.value)
        : children}
    </SelectPrimitive.SelectValue>
  )
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: Props<
  Omit<React.ComponentProps<typeof SelectPrimitive.SelectTrigger>, "children">
> & {
  size?: "sm" | "default"
  // Plain content, as Base UI's trigger takes it: the part adds its icon after it.
  children?: React.ReactNode
}) {
  return (
    <SelectPrimitive.SelectTrigger
      data-size={size}
      {...props}
      render={slotRender("select-trigger", "button", props.render)}
      {...styleProps(select.trigger, sx)}
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
    </SelectPrimitive.SelectTrigger>
  )
}

/**
 * The list. ui-sdk's content places itself (no positioner: its styles join the content's), and has
 * no Base UI `alignItemWithTrigger`, which opens the list with its chosen item over the trigger:
 * it opens beside the trigger, with the popup's motion (`data-align-trigger="false"`).
 */
function SelectContent({
  sx,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger: _alignItemWithTrigger,
  ...props
}: Props<React.ComponentProps<typeof SelectPrimitive.SelectContent>> & {
  alignItemWithTrigger?: boolean
}) {
  return (
    <SelectPrimitive.SelectContent
      data-align-trigger={false}
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      {...props}
      render={slotRender("select-content", "div", props.render)}
      {...styleProps(
        menuPositioner,
        popupMotion,
        menuSurface,
        select.content,
        sx
      )}
    >
      {children}
    </SelectPrimitive.SelectContent>
  )
}

function SelectLabel({
  sx,
  ...props
}: Props<React.ComponentProps<typeof SelectPrimitive.SelectGroupLabel>>) {
  return (
    <SelectPrimitive.SelectGroupLabel
      {...props}
      render={slotRender("select-label", "div", props.render)}
      {...styleProps(menuLabel, sx)}
    />
  )
}

function SelectItem({
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.SelectItem>,
  "className" | "children"
> & { sx?: Sx; children?: React.ReactNode }) {
  return (
    <SelectPrimitive.SelectItem
      {...props}
      render={slotRender("select-item", "div", props.render)}
      {...styleProps(menuRowBase, menuCheckableRowPadding, select.item, sx)}
    >
      <SelectPrimitive.SelectItemText {...styleProps(select.itemText)}>
        {children}
      </SelectPrimitive.SelectItemText>
      <SelectPrimitive.SelectItemIndicator
        render={<span sx={[menuIndicator, select.indicator]} />}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </SelectPrimitive.SelectItemIndicator>
    </SelectPrimitive.SelectItem>
  )
}

function SelectSeparator({
  sx,
  ...props
}: Props<React.ComponentProps<typeof SelectPrimitive.SelectSeparator>>) {
  return (
    <SelectPrimitive.SelectSeparator
      {...props}
      render={slotRender("select-separator", "div", props.render)}
      {...styleProps([menuSeparator, select.separator], sx)}
    />
  )
}

/**
 * Base UI's scroll arrows, which ui-sdk has no part for: its list scrolls as a scroll area does.
 * Kept so an example that names them builds; they draw nothing.
 */
function SelectScrollUpButton(_props: { sx?: Sx }) {
  return null
}

function SelectScrollDownButton(_props: { sx?: Sx }) {
  return null
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
