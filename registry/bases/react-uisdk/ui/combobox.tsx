"use client"

import * as React from "react"
import * as ComboboxPrimitive from "@ui-sdk/react/combobox"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import {
  popupContainer,
  sideOf,
  slotRender,
  slotOf,
  refInto,
} from "../../../lib/uisdk-slot"
import type { BaseSide } from "../../../lib/uisdk-slot"
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

type RootProps = ComboboxPrimitive.ComboboxProps<unknown, boolean | undefined>

/** ui-sdk's root for one value or several, as Base UI's root takes `multiple`. */
const ComboboxRoot = ComboboxPrimitive.Combobox as (
  props: RootProps
) => React.JSX.Element

/** The root's items, which the list's function child renders (Base UI's `items`). */
const Items = React.createContext<readonly unknown[]>([])
/**
 * What the popup is placed against unless it is given an anchor, as Base UI places it: the input's
 * group, or the trigger when the input is inside the popup.
 */
const Anchors = React.createContext<{
  input: React.RefObject<HTMLDivElement | null>
  trigger: React.RefObject<HTMLElement | null>
}>({ input: { current: null }, trigger: { current: null } })
/** Inside the popup, where an input is no anchor. */
const InContent = React.createContext(false)
/** A group's items, which its collection renders. */
const GroupItems = React.createContext<readonly unknown[]>([])

/** An item's label, as Base UI reads it: an object's `label`, else the item as text. */
function labelOf(item: unknown): string {
  return typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item)
}

/**
 * Base UI's Combobox root, as every React base's part takes it, on ui-sdk's: its `items` go to the
 * list's function child (ui-sdk filters the items rendered), and `itemToStringValue` and
 * `itemToStringLabel` are ui-sdk's `itemToValue` and `itemToLabel`.
 */
function Combobox<Value, Multiple extends boolean | undefined = false>({
  items,
  itemToStringValue,
  itemToStringLabel,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: Omit<
  RootProps,
  | "items"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "multiple"
  | "itemToValue"
  | "itemToLabel"
> & {
  items?: readonly Value[]
  multiple?: Multiple
  value?: Multiple extends true ? Value[] : Value | null
  defaultValue?: Multiple extends true ? Value[] : Value | null
  onValueChange?: (
    value: Multiple extends true ? Value[] : Value | null,
    details: Parameters<NonNullable<RootProps["onValueChange"]>>[1]
  ) => void
  itemToStringValue?: (item: Value) => string
  itemToStringLabel?: (item: Value) => string
}) {
  // Base UI places the popup against the input's group: ui-sdk, against an element of its own.
  const input = React.useRef<HTMLDivElement | null>(null)
  const trigger = React.useRef<HTMLElement | null>(null)
  const anchors = React.useMemo(() => ({ input, trigger }), [])
  return (
    <Anchors value={anchors}>
      <Items value={items ?? []}>
        <ComboboxRoot
          data-slot="combobox"
          container={popupContainer()}
          itemToValue={itemToStringValue as RootProps["itemToValue"]}
          itemToLabel={
            (itemToStringLabel ?? labelOf) as RootProps["itemToLabel"]
          }
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange as RootProps["onValueChange"]}
          {...props}
        >
          {children}
        </ComboboxRoot>
      </Items>
    </Anchors>
  )
}

/** A chip's value, which Base UI's chip finds itself: ui-sdk's is handed it, in order. */
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
 * Base UI's Value, whose function child takes the value (chips, one per value, with `multiple`),
 * on ui-sdk's, whose takes its state.
 */
function ComboboxValue({
  children,
}: {
  children?: React.ReactNode | ((value: any) => React.ReactNode)
}) {
  return (
    <ComboboxPrimitive.ComboboxValue>
      {typeof children === "function"
        ? (state) =>
            withChipValues(
              children(state.value),
              Array.isArray(state.value) ? state.value : [state.value]
            )
        : children}
    </ComboboxPrimitive.ComboboxValue>
  )
}

function ComboboxTrigger({
  sx,
  children,
  ref,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxTrigger>,
  "className" | "children"
> & { sx?: Sx } & { children?: React.ReactNode }) {
  const { trigger } = React.use(Anchors)
  return (
    <ComboboxPrimitive.ComboboxTrigger
      {...props}
      ref={refInto(trigger as React.RefObject<HTMLButtonElement | null>, ref)}
      render={slotRender(
        slotOf(props, "combobox-trigger"),
        "button",
        props.render
      )}
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
    </ComboboxPrimitive.ComboboxTrigger>
  )
}

function ComboboxClear({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxClear>,
  "className" | "render"
> & {
  sx?: Sx
}) {
  return (
    <ComboboxPrimitive.ComboboxClear
      {...props}
      render={slotRender(
        "combobox-clear",
        "button",
        <InputGroupButton variant="ghost" size="icon-xs" sx={sx} />
      )}
    >
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </ComboboxPrimitive.ComboboxClear>
  )
}

function ComboboxInput({
  sx,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxInput>,
  "className"
> & {
  children?: React.ReactNode
  showTrigger?: boolean
  showClear?: boolean
  sx?: Sx
}) {
  return (
    <InputGroup
      ref={React.use(InContent) ? undefined : React.use(Anchors).input}
      sx={[combobox.input, sx]}
    >
      <ComboboxPrimitive.ComboboxInput
        render={slotRender(
          "input-group-control",
          "input",
          <InputGroupInput disabled={disabled} />
        )}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          // The trigger renders the InputGroup's button, so the button keeps its own styles.
          <ComboboxPrimitive.ComboboxTrigger
            disabled={disabled}
            render={slotRender(
              "input-group-button",
              "button",
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                sx={combobox.trigger}
              />
            )}
          >
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              {...styleProps(combobox.triggerIcon)}
            />
          </ComboboxPrimitive.ComboboxTrigger>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

/**
 * The popup, which ui-sdk places itself (no positioner: the positioner's styles join the
 * content's). Base UI's anchor is a ref, ui-sdk's the element.
 */
function ComboboxContent({
  sx,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxContent>,
  "className" | "side" | "anchor"
> & {
  side?: BaseSide
  anchor?: React.RefObject<HTMLElement | null>
  sx?: Sx
}) {
  const anchors = React.use(Anchors)
  const own = styleProps(
    menuPositioner,
    popupMotion,
    menuSurface,
    combobox.content,
    sx
  )
  return (
    <InContent value={true}>
      <ComboboxPrimitive.ComboboxContent
        data-chips={!!anchor}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={
          anchor?.current ??
          anchors.input.current ??
          anchors.trigger.current ??
          undefined
        }
        {...props}
        side={sideOf(side)}
        render={slotRender(
          slotOf(props, "combobox-content"),
          "div",
          props.render
        )}
        {...own}
        // ui-sdk's room is not inherited (LF-025): the list reads it under a name that is.
        style={{ ...ROOM, ...own.style }}
      />
    </InContent>
  )
}

/** ui-sdk's room on the popup, under names its descendants inherit (LF-025). */
const ROOM = {
  "--uisdk-available-height": "var(--available-height)",
  "--uisdk-available-width": "var(--available-width)",
} as React.CSSProperties

/** Base UI's List, whose function child renders each of the root's items. */
function ComboboxList({
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxList>,
  "className" | "children"
> & {
  children?: React.ReactNode | ((item: any, index: number) => React.ReactNode)
  sx?: Sx
}) {
  const items = React.use(Items)
  return (
    <ComboboxPrimitive.ComboboxList
      {...props}
      render={slotRender(slotOf(props, "combobox-list"), "div", props.render)}
      {...styleProps(combobox.list, sx)}
    >
      {typeof children === "function"
        ? items.map((item, index) => children(item, index))
        : children}
    </ComboboxPrimitive.ComboboxList>
  )
}

function ComboboxItem({
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxItem>,
  "className" | "children"
> & { children?: React.ReactNode; sx?: Sx }) {
  return (
    <ComboboxPrimitive.ComboboxItem
      {...props}
      render={slotRender(slotOf(props, "combobox-item"), "div", props.render)}
      {...styleProps(menuRowBase, menuCheckableRowPadding, combobox.item, sx)}
    >
      {children}
      <ComboboxPrimitive.ComboboxItemIndicator
        render={<span sx={[menuIndicator, combobox.indicator]} />}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </ComboboxPrimitive.ComboboxItemIndicator>
    </ComboboxPrimitive.ComboboxItem>
  )
}

/** Base UI's Group, whose `items` its collection renders. */
function ComboboxGroup({
  sx,
  items,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxGroup>,
  "className"
> & { items?: readonly unknown[]; sx?: Sx }) {
  return (
    <GroupItems value={items ?? []}>
      <ComboboxPrimitive.ComboboxGroup
        {...props}
        render={slotRender(
          slotOf(props, "combobox-group"),
          "div",
          props.render
        )}
        {...styleProps(sx)}
      />
    </GroupItems>
  )
}

function ComboboxLabel({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxGroupLabel>,
  "className"
> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.ComboboxGroupLabel
      {...props}
      render={slotRender(slotOf(props, "combobox-label"), "div", props.render)}
      {...styleProps(menuLabel, combobox.label, sx)}
    />
  )
}

/** Base UI's Collection: its function child renders each of its group's items. */
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
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxEmpty>,
  "className"
> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.ComboboxEmpty
      {...props}
      render={slotRender(slotOf(props, "combobox-empty"), "div", props.render)}
      {...styleProps(combobox.empty, sx)}
    />
  )
}

function ComboboxSeparator({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxSeparator>,
  "className"
> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.ComboboxSeparator
      {...props}
      render={slotRender(
        slotOf(props, "combobox-separator"),
        "div",
        props.render
      )}
      {...styleProps(menuSeparator, sx)}
    />
  )
}

function ComboboxChips({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxChips>,
  "className"
> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.ComboboxChips
      {...props}
      render={slotRender(slotOf(props, "combobox-chips"), "div", props.render)}
      {...styleProps(combobox.chips, sx)}
    />
  )
}

/** Base UI's Chip, whose value ui-sdk's needs: `ComboboxValue` hands it each chip's. */
function ComboboxChip({
  sx,
  children,
  showRemove = true,
  value,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxChip>,
  "className" | "value" | "children"
> & {
  value?: unknown
  showRemove?: boolean
  sx?: Sx
} & { children?: React.ReactNode }) {
  return (
    <ComboboxPrimitive.ComboboxChip
      value={value}
      {...props}
      render={slotRender(slotOf(props, "combobox-chip"), "div", props.render)}
      {...styleProps(combobox.chip, sx)}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ComboboxChipRemove
          render={slotRender(
            "combobox-chip-remove",
            "button",
            <Button variant="ghost" size="icon-xs" sx={combobox.chipRemove} />
          )}
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </ComboboxPrimitive.ComboboxChipRemove>
      )}
    </ComboboxPrimitive.ComboboxChip>
  )
}

function ComboboxChipsInput({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ComboboxInput>,
  "className"
> & { sx?: Sx }) {
  return (
    <ComboboxPrimitive.ComboboxInput
      {...props}
      render={slotRender(
        slotOf(props, "combobox-chip-input"),
        "input",
        props.render
      )}
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
