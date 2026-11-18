"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@kirana-ui/react/select"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

type RootProps<Value> = React.ComponentProps<typeof SelectPrimitive.Root<Value>>
type ChangeDetails = Parameters<
  NonNullable<RootProps<unknown>["onValueChange"]>
>[1]

/** A label's text, for the primitives' `items`, which are text: an icon and a word are the word. */
function textOf(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node))
    return textOf(node.props.children)
  return ""
}

/** An item as Base UI names it when it is the value itself: its `label`, else its text. */
function labelOf(value: unknown): string {
  return typeof value === "object" && value !== null && "label" in value
    ? textOf((value as { label: React.ReactNode }).label)
    : String(value)
}

/**
 * What Base UI's value shows that the primitives' text labels cannot: each item's label by its
 * value while any is more than text (an icon beside the word), and the placeholder an item of
 * value `null` names.
 */
const Labels = React.createContext<{
  byValue: Map<unknown, React.ReactNode> | null
  placeholder: React.ReactNode
}>({ byValue: null, placeholder: undefined })

/** Base UI's items: a list of `{ label, value }`, or a record of labels by value. */
type BaseItems =
  | readonly { label: React.ReactNode; value: unknown }[]
  | Record<string, React.ReactNode>

/**
 * Base UI's Select root on the primitives': `multiple` takes Base UI's `value`, `defaultValue` and
 * `onValueChange` as the primitives' `values`, `defaultValues` and `onValuesChange`; Base UI's
 * `items`, a list or a record, are the primitives' text labels, an item of value `null` the
 * placeholder Base UI shows for no value.
 */
function Select<Value, Multiple extends boolean | undefined = false>({
  items,
  multiple,
  value,
  defaultValue,
  onValueChange,
  itemToStringValue,
  itemToStringLabel,
  ...props
}: Omit<
  RootProps<Value>,
  | "items"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "multiple"
  | "values"
  | "defaultValues"
  | "onValuesChange"
> & {
  items?: BaseItems
  multiple?: Multiple
  value?: Multiple extends true ? Value[] : Value | null
  defaultValue?: Multiple extends true ? Value[] : Value | null
  onValueChange?: (
    value: Multiple extends true ? Value[] : Value,
    details: ChangeDetails
  ) => void
  /** Base UI's object values' keys: the primitives compare values themselves, so taken only. */
  itemToStringValue?: (item: Value) => string
  itemToStringLabel?: (item: Value) => string
}) {
  void itemToStringValue
  const list = items
    ? Array.isArray(items)
      ? (items as { label: React.ReactNode; value: unknown }[])
      : Object.entries(items as Record<string, React.ReactNode>).map(
          ([key, label]) => ({ value: key, label })
        )
    : undefined
  const empty = list?.find((item) => item.value === null)
  const rich = list?.some((item) => typeof item.label === "object")
  const labels = React.useMemo(
    () => ({
      byValue: rich
        ? new Map(list!.map((item) => [item.value, item.label]))
        : null,
      placeholder: empty?.label,
    }),
    [list, rich, empty]
  )
  const change = onValueChange as
    | ((value: unknown, details: ChangeDetails) => void)
    | undefined
  const values = multiple
    ? {
        multiple: true,
        values: value as readonly Value[] | undefined,
        defaultValues: defaultValue as readonly Value[] | undefined,
        onValuesChange: change,
      }
    : {
        value: value as Value | null | undefined,
        defaultValue: defaultValue as Value | null | undefined,
        onValueChange: change,
      }
  return (
    <Labels value={labels}>
      <SelectPrimitive.Root<Value>
        items={list
          ?.filter((item) => item.value !== null)
          .map((item) => ({
            value: item.value as Value,
            label: itemToStringLabel
              ? itemToStringLabel(item.value as Value)
              : textOf(item.label),
          }))}
        {...values}
        {...props}
      />
    </Labels>
  )
}

function SelectGroup({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Group>, "className"> & {
  sx?: Sx
}) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...props}
      {...styleProps(select.group, sx)}
    />
  )
}

/**
 * The trigger's text: the chosen label, or the placeholder. A function child is the caller's, as
 * Base UI's; without one, a label that is more than text, an item that is the value itself, and
 * `multiple`'s labels show as Base UI shows them.
 */
function SelectValue({
  sx,
  children,
  placeholder,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.Value>,
  "className" | "children" | "placeholder"
> & {
  /** Base UI's may be a number (a page size). */
  placeholder?: React.ReactNode
  sx?: Sx
  children?: React.ReactNode | ((value: never) => React.ReactNode)
}) {
  const labels = React.use(Labels)
  const empty = placeholder ?? labels.placeholder
  const shown =
    children !== undefined
      ? children
      : (value: unknown, label: string | readonly string[] | undefined) =>
          value === null || value === undefined
            ? empty
            : Array.isArray(value)
              ? (label as readonly string[]).join(", ")
              : (labels.byValue?.get(value) ??
                // An item that is the value itself: Base UI names it by its `label`.
                (typeof value === "object" ? labelOf(value) : label))
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={empty}
      {...props}
      {...styleProps(select.value, sx)}
    >
      {shown as React.ComponentProps<typeof SelectPrimitive.Value>["children"]}
    </SelectPrimitive.Value>
  )
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, "className"> & {
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
      {/* Base UI's `Select.Icon`, which the primitives do not have (PF-011): the icon itself. */}
      <IconPlaceholder
        aria-hidden
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        {...styleProps(select.triggerIcon)}
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
}: Omit<React.ComponentProps<typeof SelectPrimitive.Popup>, "className"> &
  Pick<
    React.ComponentProps<typeof SelectPrimitive.Positioner>,
    "align" | "alignOffset" | "sideOffset" | "alignItemWithTrigger"
  > &
  Pick<React.ComponentProps<typeof SelectPrimitive.Positioner>, "side"> & {
    sx?: Sx
  }) {
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
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.GroupLabel>,
  "className"
> & {
  sx?: Sx
}) {
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
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "className"> & {
  sx?: Sx
}) {
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
}: Omit<React.ComponentProps<typeof SelectPrimitive.Separator>, "className"> & {
  sx?: Sx
}) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...props}
      {...styleProps([menuSeparator, select.separator], sx)}
    />
  )
}

function SelectScrollUpButton({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>,
  "className"
> & {
  sx?: Sx
}) {
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
> & {
  sx?: Sx
}) {
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
