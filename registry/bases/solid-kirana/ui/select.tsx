import {
  createContext,
  createMemo,
  createSignal,
  mergeProps,
  Show,
  splitProps,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Select as SelectPrimitive } from "@kirana-ui/solid/select"
import { asRender } from "../../../lib/solid/element"
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
import type { Accessor, JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/** An entry of the select: its value and text (`null`, the placeholder). */
type Entry = { label: string; value: string | null; disabled?: boolean }

/**
 * A list of a caller's own items, with how each is named, as Ark UI's `createListCollection` makes
 * one: `<Select collection={…}>` reads its entries from it.
 */
type ListCollection<T> = {
  readonly items: readonly T[]
  itemToString: (item: T) => string
  itemToValue: (item: T) => string
  isItemDisabled: (item: T) => boolean
}

/** Ark UI's `createListCollection`: the items, and how each is named, valued and disabled. */
function createListCollection<T>(options: {
  items: readonly T[]
  itemToString?: (item: T) => string
  itemToValue?: (item: T) => string
  isItemDisabled?: (item: T) => boolean
}): ListCollection<T> {
  const field = (item: T, key: string) =>
    item !== null && typeof item === "object" && key in item
      ? (item as Record<string, unknown>)[key]
      : undefined
  return {
    items: options.items,
    itemToString:
      options.itemToString ??
      ((item) => String(field(item, "label") ?? field(item, "value") ?? item)),
    itemToValue:
      options.itemToValue ?? ((item) => String(field(item, "value") ?? item)),
    isItemDisabled:
      options.isItemDisabled ?? ((item) => !!field(item, "disabled")),
  }
}

/** What the parts read from the select: its entries and its placeholder. */
const SelectContext = createContext<{
  /** `items`, or the collection's entries. */
  entries: () => readonly Entry[]
  /** The label of the `null` entry, which the value shows while none is chosen. */
  placeholder: () => string | undefined
  /** An `item`'s value: the collection's, or its own `value`. */
  toValue: (item: unknown) => string | null
}>()

/**
 * Kirana UI's select, taking the Ark UI parts' props: `items` as Base UI's select takes them (an
 * entry whose `value` is `null` is the placeholder) or a `collection` of the caller's own
 * (`createListCollection`), `value` and `defaultValue`, a list with `multiple` (Kirana UI's
 * `values`), and `onValueChange`, given `{ value }` in the shape the caller gave it. The items are
 * read from the markup; `items` only names the values before the list has opened. It renders no
 * element; the rest (`disabled`, `name`, `required`, `open` …) goes to Kirana UI's root.
 */
function Select<
  V extends string | string[] | null = string | string[] | null,
>(props: {
  items?: readonly Entry[]
  // `any`: a caller's collection is of its own items, which `unknown` would refuse.
  // oxlint-disable-next-line no-explicit-any
  collection?: ListCollection<any>
  /** Base UI's: one value, or several in a `multiple` select. */
  defaultValue?: string | string[]
  value?: V
  /** Several values, chosen and taken away, the list staying open. */
  multiple?: boolean
  /** Ark's details, the value in the shape the caller gave it: one (`null` for none), or the list. */
  onValueChange?: (details: { value: V }) => void
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "items",
    "collection",
    "defaultValue",
    "value",
    "multiple",
    "onValueChange",
    "children",
  ])
  const entries = createMemo<readonly Entry[]>(() => {
    if (local.items) return local.items
    const collection = local.collection
    if (!collection) return []
    return collection.items.map((item) => ({
      value: collection.itemToValue(item),
      label: collection.itemToString(item),
      disabled: collection.isItemDisabled(item),
    }))
  })
  // Kirana UI's labels by value, for the trigger before the list has opened.
  const labels = createMemo(() =>
    entries()
      .filter((entry) => entry.value !== null)
      .map((entry) => ({ value: entry.value as string, label: entry.label }))
  )
  const toValue = (item: unknown) => {
    if (local.collection) return local.collection.itemToValue(item)
    const value = (item as { value?: string | null } | undefined)?.value
    return value ?? null
  }

  const list = (next: string | readonly string[] | null | undefined) =>
    next === null || next === undefined
      ? []
      : typeof next === "string"
        ? [next]
        : [...next]
  // The select's own value while the caller keeps none. Read once, as Base UI reads a default.
  const [own, setOwn] = createSignal(list(local.defaultValue))
  const chosen = () => (local.value === undefined ? own() : list(local.value))
  /** A value reported in the shape the caller gave it: one, or the list. */
  const report = (next: string[]) => {
    setOwn(next)
    const told =
      local.multiple ||
      Array.isArray(local.value) ||
      Array.isArray(local.defaultValue)
        ? next
        : (next[0] ?? null)
    local.onValueChange?.({ value: told as V })
  }
  return (
    <SelectContext.Provider
      value={{
        entries,
        placeholder: () =>
          entries().find((entry) => entry.value === null)?.label,
        toValue,
      }}
    >
      <Show
        when={local.multiple}
        fallback={
          <SelectPrimitive.Root<string | null>
            {...rest}
            items={labels()}
            value={chosen()[0] ?? null}
            onValueChange={(next) => report(next === null ? [] : [next])}
          >
            {local.children}
          </SelectPrimitive.Root>
        }
      >
        <SelectPrimitive.Root<string>
          {...rest}
          multiple
          items={labels()}
          values={chosen()}
          onValuesChange={(next) => report(next)}
        >
          {local.children}
        </SelectPrimitive.Root>
      </Show>
    </SelectContext.Provider>
  )
}

function SelectContent(props: {
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  /** Base UI's: the list opens over its trigger, the chosen item level with it. */
  alignItemWithTrigger?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        side: "bottom",
        sideOffset: 4,
        align: "center",
        alignOffset: 0,
        alignItemWithTrigger: true,
      } as const,
      props
    ),
    [
      "side",
      "sideOffset",
      "align",
      "alignOffset",
      "alignItemWithTrigger",
      "class",
      "sx",
      "children",
    ]
  )
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        alignItemWithTrigger={local.alignItemWithTrigger}
        {...styleProps(menuPositioner)}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={String(local.alignItemWithTrigger)}
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            select.content,
            local.sx
          )}
        >
          <SelectScrollButton direction="up" />
          <SelectPrimitive.List>{local.children}</SelectPrimitive.List>
          <SelectScrollButton direction="down" />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectGroup(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...rest}
      {...styleProps(local.class, select.group, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </SelectPrimitive.Group>
  )
}

function SelectItem(props: {
  item?: unknown
  value?: string | null
  disabled?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "item",
    "value",
    "disabled",
    "class",
    "sx",
    "children",
  ])
  // Its entry: Base UI's `value` (`null` for the placeholder's), or an `item` of the select's
  // collection or items. `unknown`: a caller's items are of its own type.
  const context = useContext(SelectContext)
  const value = () =>
    local.value !== undefined
      ? local.value
      : local.item !== undefined
        ? (context?.toValue(local.item) ?? null)
        : null
  // Disabled by its own prop, or by its entry, as Ark's collection disables it.
  const disabled = () =>
    local.disabled ??
    context?.entries().find((entry) => entry.value === value())?.disabled
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value()}
      disabled={disabled()}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        select.item,
        local.sx
      )}
    >
      <SelectPrimitive.ItemText {...styleProps(select.itemText)}>
        {local.children}
      </SelectPrimitive.ItemText>
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

function SelectLabel(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // The group's label: inside its group, as Base UI's label must be.
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      {...rest}
      {...styleProps(local.class, menuLabel, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </SelectPrimitive.GroupLabel>
  )
}

/** Base UI's `ScrollUpArrow` and `ScrollDownArrow`: `SelectContent` mounts one per direction. */
function SelectScrollButton(props: {
  direction: "up" | "down"
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["direction", "class", "sx"])
  return (
    <Show
      when={local.direction === "up"}
      fallback={
        <SelectPrimitive.ScrollDownArrow
          data-slot="select-scroll-down-button"
          {...rest}
          {...styleProps(
            local.class,
            select.scrollButton,
            select.scrollDown,
            local.sx
          )}
        >
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
          />
        </SelectPrimitive.ScrollDownArrow>
      }
    >
      <SelectPrimitive.ScrollUpArrow
        data-slot="select-scroll-up-button"
        {...rest}
        {...styleProps(
          local.class,
          select.scrollButton,
          select.scrollUp,
          local.sx
        )}
      >
        <IconPlaceholder
          lucide="ChevronUpIcon"
          tabler="IconChevronUp"
          hugeicons="ArrowUp01Icon"
          phosphor="CaretUpIcon"
          remixicon="RiArrowUpSLine"
        />
      </SelectPrimitive.ScrollUpArrow>
    </Show>
  )
}

function SelectSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...rest}
      {...styleProps(local.class, menuSeparator, select.separator, local.sx)}
    />
  )
}

function SelectTrigger(props: {
  size?: "sm" | "default"
  /** A label's `for`: the trigger's own. */
  id?: string
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["size", "asChild", "class", "sx", "children"]
  )
  // `type="button"`: a trigger in a form opens the list and submits nothing.
  return (
    <SelectPrimitive.Trigger
      type="button"
      data-slot="select-trigger"
      data-size={local.size}
      {...rest}
      {...styleProps(local.class, select.trigger, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
      {/* Base UI's `Select.Icon`, which Kirana UI's select has not: the icon itself. */}
      <IconPlaceholder
        aria-hidden="true"
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

function SelectValue(props: {
  placeholder?: string
  class?: string
  sx?: Sx
  /** What the trigger shows, as Base UI's render function: the value and its entries. */
  children?: (state: { value: string[]; items: unknown[] }) => JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "placeholder",
    "class",
    "sx",
    "children",
  ])
  const context = useContext(SelectContext)
  const toList = (next: unknown): unknown[] =>
    next === null || next === undefined
      ? []
      : Array.isArray(next)
        ? next
        : [next]
  // The part writes the chosen label, or the placeholder; a caller's function draws something
  // else, given the value and its entries (the select's own, or the label Kirana UI read).
  const draw = (value: Accessor<unknown>, label: Accessor<unknown>) => {
    const state = () => {
      const values = toList(value()).map(String)
      const labels = toList(label())
      return {
        value: values,
        items: values.map(
          (each, index) =>
            context?.entries().find((entry) => entry.value === each) ?? {
              value: each,
              label: labels[index] ?? each,
            }
        ),
      }
    }
    return <>{local.children?.(state())}</>
  }
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={local.placeholder ?? context?.placeholder()}
      {...rest}
      {...styleProps(local.class, select.value, local.sx)}
    >
      {local.children ? draw : undefined}
    </SelectPrimitive.Value>
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
export { createListCollection }
