"use client"

import * as React from "react"
import { renderOver } from "../../../lib/kirana-render"
import type { PartProps } from "../../../lib/kirana-render"
import { useSide } from "../../../lib/kirana-side"
import type { Side } from "../../../lib/placement"
import { Combobox as ComboboxPrimitive } from "@kirana-ui/react/combobox"
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

type RootProps = React.ComponentProps<typeof ComboboxPrimitive.Root<unknown>>
type ChangeDetails = Parameters<NonNullable<RootProps["onValueChange"]>>[1]

/** The root's items, which the list's function child renders (Base UI's `items`). */
const Items = React.createContext<readonly unknown[]>([])
/** A group's items, which its collection renders. */
const GroupItems = React.createContext<readonly unknown[]>([])
/**
 * The chosen value, or values with `multiple`, which Base UI's `Combobox.Value` hands its function
 * child: the primitives have no Value part and hand no state (PF-010), so the root mirrors it.
 */
const Chosen = React.createContext<{
  value: unknown
  labelOf: (item: unknown) => string
}>({ value: null, labelOf: String })

/** An item's label, as Base UI reads it: an object's `label`, else the item as text. */
function labelOf(item: unknown): string {
  return typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item)
}

/** Base UI's grouped items (`{ value, items }`) as the items they hold. */
function flat(items: readonly unknown[]): unknown[] {
  return items.flatMap((item) =>
    typeof item === "object" &&
    item !== null &&
    Array.isArray((item as { items?: unknown }).items)
      ? flat((item as { items: unknown[] }).items)
      : [item]
  )
}

/**
 * Base UI's Combobox root on the primitives': its `items` go to the list's function child (the
 * primitives read the items from the markup and filter them by their text), and their labels to
 * the primitives' `items`, so the input shows a chosen value before the list opens. `multiple`
 * takes Base UI's `value` and `onValueChange` as the primitives' `values` and `onValuesChange`.
 */
function Combobox<Value, Multiple extends boolean | undefined = false>({
  items,
  itemToStringValue,
  itemToStringLabel,
  multiple,
  value,
  defaultValue,
  onValueChange,
  autoHighlight,
  children,
  ...props
}: Omit<
  RootProps,
  | "items"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "multiple"
  | "values"
  | "defaultValues"
  | "onValuesChange"
> & {
  items?: readonly Value[]
  multiple?: Multiple
  value?: Multiple extends true ? Value[] : Value | null
  defaultValue?: Multiple extends true ? Value[] : Value | null
  onValueChange?: (
    value: Multiple extends true ? Value[] : Value | null,
    details: ChangeDetails
  ) => void
  /** Base UI's object values' keys: the primitives compare values themselves, so taken only. */
  itemToStringValue?: (item: Value) => string
  itemToStringLabel?: (item: Value) => string
  /** Base UI's first match highlighted as one types, which the primitives do not offer (PF-024). */
  autoHighlight?: boolean
}) {
  void itemToStringValue
  void autoHighlight
  const label = (itemToStringLabel ?? labelOf) as (item: unknown) => string
  // The value a function child reads: the caller's when controlled, else the last chosen.
  const [own, setOwn] = React.useState<unknown>(
    defaultValue ?? (multiple ? [] : null)
  )
  const current = value === undefined ? own : value
  const change = (next: unknown, details: ChangeDetails) => {
    setOwn(next)
    ;(
      onValueChange as ((value: unknown, d: ChangeDetails) => void) | undefined
    )?.(next, details)
  }
  const chosen = React.useMemo(
    () => ({ value: current, labelOf: label }),
    [current, label]
  )
  const values = multiple
    ? {
        multiple: true,
        values: value as readonly unknown[] | undefined,
        defaultValues: defaultValue as readonly unknown[] | undefined,
        onValuesChange: change,
      }
    : {
        value: value as unknown,
        defaultValue: defaultValue as unknown,
        onValueChange: change,
      }
  return (
    <Items value={items ?? []}>
      <Chosen value={chosen}>
        <ComboboxPrimitive.Root<unknown>
          items={flat(items ?? []).map((item) => ({
            value: item,
            label: label(item),
          }))}
          {...values}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Root>
      </Chosen>
    </Items>
  )
}

/** A chip's value, which Base UI's chip finds itself: the primitives' is handed it, in order. */
function withChipValues(node: React.ReactNode, values: readonly unknown[]) {
  let next = 0
  const walk = (child: React.ReactNode): React.ReactNode => {
    if (Array.isArray(child)) return child.map(walk)
    if (
      !React.isValidElement<{ children?: React.ReactNode; value?: unknown }>(
        child
      )
    )
      return child
    if (child.type === ComboboxChip && child.props.value === undefined)
      return React.cloneElement(child, { value: values[next++] })
    if (child.type === React.Fragment)
      return React.cloneElement(child, undefined, walk(child.props.children))
    return child
  }
  return walk(node)
}

/**
 * Base UI's Value: its function child takes the value (chips, one per value, with `multiple`);
 * with none, the chosen item's label. The primitives have no such part (PF-011).
 */
function ComboboxValue({
  children,
  placeholder,
}: {
  children?: React.ReactNode | ((value: any) => React.ReactNode)
  placeholder?: React.ReactNode
}) {
  const chosen = React.use(Chosen)
  if (typeof children === "function")
    return withChipValues(
      children(chosen.value),
      Array.isArray(chosen.value) ? chosen.value : [chosen.value]
    )
  if (children !== undefined) return children
  return chosen.value === null || chosen.value === undefined
    ? placeholder
    : chosen.labelOf(chosen.value)
}

function ComboboxTrigger({
  sx,
  children,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.Trigger>, "className"> & {
  sx?: Sx
}) {
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
}: Omit<PartProps<typeof ComboboxPrimitive.Clear>, "className" | "render"> & {
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
}: Omit<PartProps<typeof ComboboxPrimitive.Input>, "className"> & {
  showTrigger?: boolean
  showClear?: boolean
  sx?: Sx
}) {
  return (
    <InputGroup sx={[combobox.input, sx]}>
      {/* The input's `disabled` on the part too: the render element's own props lose to the
          part's (PF-026). */}
      <ComboboxPrimitive.Input
        {...renderOver({
          render: <InputGroupInput disabled={disabled} />,
          ...props,
        })}
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

/**
 * The popup. Base UI places it against `anchor` (the chips' box, `useComboboxAnchor`); the
 * primitives' Positioner takes no anchor and places it against the input (PF-023), so `anchor`
 * only marks the chips' popup (`data-chips`).
 */
function ComboboxContent({
  sx,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.Popup>, "className"> &
  Pick<
    React.ComponentProps<typeof ComboboxPrimitive.Positioner>,
    "align" | "alignOffset" | "sideOffset"
  > & {
    side?: Side
    anchor?: React.RefObject<HTMLElement | null>
    sx?: Sx
  }) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={useSide(side)}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
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

/**
 * Base UI's List, whose function child renders each of the root's items; the primitives' popup
 * holds the items itself (no List part, PF-011), so this is the list's box.
 */
function ComboboxList({
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "className" | "children"> & {
  children?: React.ReactNode | ((item: any, index: number) => React.ReactNode)
  sx?: Sx
}) {
  const items = React.use(Items)
  return (
    <div
      data-slot="combobox-list"
      role="presentation"
      {...props}
      {...styleProps(combobox.list, sx)}
    >
      {typeof children === "function"
        ? items.map((item, index) => children(item, index))
        : children}
    </div>
  )
}

function ComboboxItem({
  sx,
  children,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.Item>, "className"> & {
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      {...props}
      {...styleProps(menuRowBase, menuCheckableRowPadding, combobox.item, sx)}
    >
      {children}
      {/* Base UI's indicator renders as the caller's span; the primitives' takes no `render`
          (PF-010), so the span's styles are its own. */}
      <ComboboxPrimitive.ItemIndicator
        {...styleProps(menuIndicator, combobox.indicator)}
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

/** Base UI's Group, whose `items` its collection renders. */
function ComboboxGroup({
  sx,
  items,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.Group>, "className"> & {
  items?: readonly unknown[]
  sx?: Sx
}) {
  return (
    <GroupItems value={items ?? []}>
      <ComboboxPrimitive.Group
        data-slot="combobox-group"
        {...props}
        {...styleProps(sx)}
      />
    </GroupItems>
  )
}

function ComboboxLabel({
  sx,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.GroupLabel>, "className"> & {
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      {...props}
      {...styleProps(menuLabel, combobox.label, sx)}
    />
  )
}

/** Base UI's Collection: its function child renders each of its group's items (PF-011). */
function ComboboxCollection({
  children,
}: {
  children: (item: any, index: number) => React.ReactNode
}) {
  const items = React.use(GroupItems)
  return <>{items.map((item, index) => children(item, index))}</>
}

function ComboboxEmpty({
  sx,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.Empty>, "className"> & {
  sx?: Sx
}) {
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
}: Omit<PartProps<typeof ComboboxPrimitive.Separator>, "className"> & {
  sx?: Sx
}) {
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
}: Omit<PartProps<typeof ComboboxPrimitive.Chips>, "className"> & {
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      {...props}
      {...styleProps(combobox.chips, sx)}
    />
  )
}

/** Base UI's Chip, whose value the primitives' needs: `ComboboxValue` hands it each chip's. */
function ComboboxChip({
  sx,
  children,
  showRemove = true,
  value,
  ...props
}: Omit<PartProps<typeof ComboboxPrimitive.Chip>, "className" | "value"> & {
  value?: unknown
  showRemove?: boolean
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      // Base UI's chip is a `div`, the primitives' a `span` (PF-022).
      render={<div />}
      value={value}
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
}: Omit<PartProps<typeof ComboboxPrimitive.Input>, "className"> & {
  sx?: Sx
}) {
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
