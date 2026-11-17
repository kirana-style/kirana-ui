"use client"

import * as React from "react"
import type { PartProps } from "../../../lib/kirana-render"
import { useSide } from "../../../lib/kirana-side"
import type { Side } from "../../../lib/placement"
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

type ChangeDetails = Parameters<
  NonNullable<
    React.ComponentProps<typeof SelectPrimitive.Root>["onValueChange"]
  >
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

/**
 * What Base UI's value shows that the primitives' cannot: the chosen value, for a function child
 * (the primitives' `Select.Value` takes none, and hands no state, PF-010, PF-018); each item's
 * label by its value, while any is more than text; and the placeholder an item of value `null`
 * names.
 */
const Chosen = React.createContext<{
  value: unknown
  byValue: Map<unknown, React.ReactNode> | null
  placeholder: React.ReactNode
}>({ value: null, byValue: null, placeholder: undefined })

/** Base UI's items: a list of `{ label, value }`, or a record of labels by value. */
type BaseItems =
  | readonly { label: React.ReactNode; value: unknown }[]
  | Record<string, React.ReactNode>

/**
 * Base UI's Select root on the primitives': the value is the caller's type (a state's setter is
 * its `onValueChange`); Base UI's `items`, a list or a record of labels, are the primitives' list
 * of text labels, an item of value `null` the placeholder Base UI shows for no value. One value
 * only: the primitives' select has no `multiple` (PF-018).
 */
function Select<Value>({
  items,
  value,
  defaultValue,
  onValueChange,
  itemToStringValue,
  itemToStringLabel,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.Root<Value>>,
  "items" | "value" | "defaultValue" | "onValueChange"
> & {
  items?: BaseItems
  value?: Value | null
  defaultValue?: Value | null
  onValueChange?: (value: Value, details: ChangeDetails) => void
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
  // The value a function child reads: the caller's when controlled, else the last chosen.
  const [own, setOwn] = React.useState<unknown>(defaultValue ?? null)
  const current = value === undefined ? own : value
  return (
    <Chosen
      value={{
        value: current,
        byValue: rich
          ? new Map(list!.map((item) => [item.value, item.label]))
          : null,
        placeholder: empty?.label,
      }}
    >
      <SelectPrimitive.Root<Value>
        items={list
          ?.filter((item) => item.value !== null)
          .map((item) => ({
            value: item.value as Value,
            label: itemToStringLabel
              ? itemToStringLabel(item.value as Value)
              : textOf(item.label),
          }))}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next, details) => {
          setOwn(next)
          onValueChange?.(next as Value, details)
        }}
        {...props}
      />
    </Chosen>
  )
}

function SelectGroup({
  sx,
  ...props
}: Omit<PartProps<typeof SelectPrimitive.Group>, "className"> & {
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
 * The trigger's text: the chosen label or the placeholder; a function child receives the value,
 * as Base UI's does, and a label that is more than text shows as Base UI's does (`Chosen`).
 */
function SelectValue({
  sx,
  children,
  placeholder,
  ...props
}: Omit<
  PartProps<typeof SelectPrimitive.Value>,
  "className" | "children" | "placeholder"
> & {
  /** Base UI's may be a number (a page size). */
  placeholder?: React.ReactNode
  sx?: Sx
  children?: React.ReactNode | ((value: never) => React.ReactNode)
}) {
  const chosen = React.use(Chosen)
  const none = chosen.value === null || chosen.value === undefined
  const content =
    typeof children === "function"
      ? (children as (value: unknown) => React.ReactNode)(chosen.value)
      : children !== undefined
        ? children
        : chosen.byValue && !none
          ? chosen.byValue.get(chosen.value)
          : // An item itself as the value (`value={item}`): its `label`, as Base UI shows it.
            !none &&
              typeof chosen.value === "object" &&
              "label" in (chosen.value as object)
            ? (chosen.value as { label: React.ReactNode }).label
            : undefined
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={placeholder ?? chosen.placeholder}
      {...props}
      {...styleProps(select.value, sx)}
    >
      {content}
    </SelectPrimitive.Value>
  )
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: Omit<PartProps<typeof SelectPrimitive.Trigger>, "className"> & {
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
}: Omit<PartProps<typeof SelectPrimitive.Popup>, "className"> &
  Pick<
    React.ComponentProps<typeof SelectPrimitive.Positioner>,
    "align" | "alignOffset" | "sideOffset" | "alignItemWithTrigger"
  > & { side?: Side; sx?: Sx }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={useSide(side)}
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
}: Omit<PartProps<typeof SelectPrimitive.GroupLabel>, "className"> & {
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
}: Omit<PartProps<typeof SelectPrimitive.Item>, "className"> & {
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
      {/* Base UI's indicator renders as the caller's span; the primitives' takes no `render`
          (PF-010), so the span's styles are its own. */}
      <SelectPrimitive.ItemIndicator
        {...styleProps(menuIndicator, select.indicator)}
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
}: Omit<PartProps<typeof SelectPrimitive.Separator>, "className"> & {
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
}: Omit<PartProps<typeof SelectPrimitive.ScrollUpArrow>, "className"> & {
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
}: Omit<PartProps<typeof SelectPrimitive.ScrollDownArrow>, "className"> & {
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
