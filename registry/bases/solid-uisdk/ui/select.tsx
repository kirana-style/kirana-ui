import { createContext, omit, useContext } from "solid-js"
import type { Component } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Select as UisdkSelect,
  SelectContent as UisdkSelectContent,
  SelectGroup as UisdkSelectGroup,
  SelectGroupLabel,
  SelectItem as UisdkSelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectSeparator as UisdkSelectSeparator,
  SelectTrigger as UisdkSelectTrigger,
  SelectValue as UisdkSelectValue,
} from "@ui-sdk/solid/select"
import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { select } from "../../../styles/select.styles"
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
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"

/** An entry of the select's `items`, as Base UI's: its value and text (`null`, the placeholder). */
type Entry = { label: string; value: string | null; disabled?: boolean }

/** The root's items, which the value's render function reads the chosen entries from. */
const ItemsContext = createContext<(() => readonly Entry[] | undefined) | null>(
  null
)

/**
 * Where the popup renders: the document's body, as Base UI's portal puts it, so it inherits the
 * page's text styles rather than its trigger's surroundings'. Nothing on the server, where no popup
 * is open.
 */
const popupContainer = () =>
  typeof document === "undefined" ? undefined : document.body

/** A Base UI side as ui-sdk's: `inline-start` and `inline-end` are its `start` and `end`. */
const sideOf = (side: Side) =>
  side === "inline-start" ? "start" : side === "inline-end" ? "end" : side

/** A value as a list: none, one, or several in a `multiple` select. */
const listOf = (value: unknown): string[] =>
  value === null || value === undefined
    ? []
    : Array.isArray(value)
      ? (value as string[])
      : [value as string]

/** ui-sdk's root, for one value or several: its props are the caller's (`multiple` …). */
const SelectRoot = UisdkSelect as Component<Record<string, unknown>>

/**
 * ui-sdk's select, with the Ark UI part's props: `items` as Base UI's select takes them (an entry
 * whose `value` is `null` is the placeholder, which ui-sdk reads from `placeholder`), or the items
 * read from the markup without them; `defaultValue`, and `value` with `onValueChange` called with
 * `{ value }`, one value (`null` for none) or several in a `multiple` select. Its popup renders in
 * the body, as Base UI's portal puts it.
 */
function Select<
  V extends string | string[] | null = string | string[] | null,
>(props: {
  items?: readonly Entry[]
  /** Base UI's: one value, or several in a `multiple` select. */
  defaultValue?: string | string[]
  value?: V
  /** Called with `{ value }`: one (`null` for none), or the list in a `multiple` select. */
  onValueChange?: (details: { value: V }) => void
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "items", "onValueChange", "children")
  const list = () =>
    props.items
      ?.filter((item) => item.value !== null)
      .map((item) => ({
        value: item.value as string,
        label: item.label,
        disabled: item.disabled,
      }))
  const placeholder = () =>
    props.items?.find((item) => item.value === null)?.label
  return (
    <ItemsContext value={() => props.items}>
      <SelectRoot
        container={popupContainer()}
        items={list()}
        placeholder={placeholder()}
        {...rest}
        onValueChange={(value: unknown) =>
          props.onValueChange?.({ value: value as V })
        }
      >
        {props.children}
      </SelectRoot>
    </ItemsContext>
  )
}

/**
 * The list. ui-sdk's content places itself (no positioner: its styles join the content's), and its
 * list scrolls in place, with no Base UI scroll arrows. Base UI's `alignItemWithTrigger`, the list
 * opened with its chosen item over the trigger, is not passed on, as on the other ui-sdk bases: it
 * opens beside the trigger, with the popup's motion (`data-align-trigger="false"`).
 */
function SelectContent(props: {
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  alignItemWithTrigger?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "alignItemWithTrigger",
    "class",
    "sx",
    "children"
  )
  return (
    <UisdkPart
      part={UisdkSelectContent}
      slotName="select-content"
      tag="div"
      data-align-trigger={false}
      side={sideOf(props.side ?? "bottom")}
      sideOffset={props.sideOffset ?? 4}
      align={props.align ?? "center"}
      alignOffset={props.alignOffset ?? 0}
      {...rest}
      {...styleProps(
        props.class,
        menuPositioner,
        popupMotion,
        menuSurface,
        select.content,
        props.sx
      )}
    >
      {props.children}
    </UisdkPart>
  )
}

function SelectGroup(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkSelectGroup}
      slotName="select-group"
      tag="div"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, select.group, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function SelectItem(props: {
  value?: string | null
  disabled?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "value", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkSelectItem}
      slotName="select-item"
      tag="div"
      value={props.value ?? undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        select.item,
        props.sx
      )}
    >
      <SelectItemText {...styleProps(select.itemText)}>
        {props.children}
      </SelectItemText>
      <SelectItemIndicator {...styleProps(menuIndicator, select.indicator)}>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </SelectItemIndicator>
    </UisdkPart>
  )
}

function SelectLabel(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={SelectGroupLabel}
      slotName="select-label"
      tag="div"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, menuLabel, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function SelectSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={UisdkSelectSeparator}
      slotName="select-separator"
      tag="div"
      {...rest}
      {...styleProps(props.class, menuSeparator, select.separator, props.sx)}
    />
  )
}

function SelectTrigger(props: {
  size?: "sm" | "default"
  /** A label's `for`. */
  id?: string
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "size", "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkSelectTrigger}
      slotName="select-trigger"
      tag="button"
      data-size={props.size ?? "default"}
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, select.trigger, props.sx)}
    >
      {props.children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        {...styleProps(select.triggerIcon)}
      />
    </UisdkPart>
  )
}

/**
 * ui-sdk's chosen label or placeholder. A render function draws the value itself, given it as a
 * list and the chosen entries of the root's `items`, as the Ark UI part gives them.
 */
function SelectValue(props: {
  placeholder?: string
  class?: string
  sx?: Sx
  /** What the trigger shows, as Base UI's render function: the value and its entries. */
  children?: (state: { value: string[]; items: unknown[] }) => JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  const items = useContext(ItemsContext)
  const chosen = (value: unknown) =>
    (items?.() ?? []).filter((item) =>
      listOf(value).includes(item.value as string)
    )
  const render = () => {
    const children = props.children
    return children
      ? (state: { value: unknown }) =>
          children({ value: listOf(state.value), items: chosen(state.value) })
      : undefined
  }
  return (
    <UisdkPart
      part={UisdkSelectValue}
      slotName="select-value"
      tag="span"
      {...rest}
      {...styleProps(props.class, select.value, props.sx)}
    >
      {render()}
    </UisdkPart>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
