import { Combobox as ComboboxPrimitive } from "@kirana-ui/solid/combobox"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  For,
  Show,
  createContext,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
  untrack,
  useContext,
} from "solid-js"
import type { JSX } from "solid-js"

import { asRender } from "../../../lib/solid/element"
import type { AsChild } from "../../../lib/solid/element"
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
import { IconPlaceholder } from "./icon-placeholder"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group"

/** What a Combobox hands its parts: getters, so they follow it. */
type ComboboxContextValue = {
  /** The root's items, or groups of them: the primitives show the ones that match what is typed. */
  readonly items: readonly unknown[]
  label: (item: unknown) => string
  /** The selected items, in the shape the caller gave them. */
  readonly selected: unknown[]
  /** Whether the popup is placed against the chips (`data-chips`). */
  readonly chips: boolean
  setChips: (chips: boolean) => void
}

const ComboboxContext = createContext<ComboboxContextValue>()
/** A group's items, which its `ComboboxCollection` draws. */
const ComboboxGroupContext = createContext<() => readonly unknown[]>()

function useCombobox() {
  const context = useContext(ComboboxContext)
  if (!context)
    throw new Error("A combobox part must be used within a Combobox.")
  return context
}

/**
 * Kirana UI's combobox, taking Base UI's items-driven API as every Solid base does: `items`
 * (strings, objects with a `label` and `value`, or groups with their own `items`) go to
 * `ComboboxList` and `ComboboxCollection`, which draw each through their `children` function (the
 * primitives show the ones whose text matches what is typed), and their labels to the primitives'
 * `items`, so the input shows a chosen item before the list opens; a value or a list of them
 * (`multiple`, the primitives' `values`), the items themselves; `autoHighlight`.
 */
function Combobox(props: {
  items?: readonly unknown[]
  defaultValue?: unknown
  /** One item (`null` for none), or a list in a `multiple` combobox, with `onValueChange`. */
  value?: unknown
  onValueChange?: (details: { value: unknown }) => void
  multiple?: boolean
  autoHighlight?: boolean
  disabled?: boolean
  // `any`: a caller's callback takes its own items' type, which `unknown` would refuse.
  // oxlint-disable-next-line no-explicit-any
  itemToStringLabel?: (item: any) => string
  /** Base UI's object values' keys: the primitives compare the values themselves, so taken only. */
  // oxlint-disable-next-line no-explicit-any
  itemToStringValue?: (item: any) => string
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        items: [] as readonly unknown[],
        multiple: false,
        autoHighlight: false,
        disabled: false,
      },
      props
    ),
    [
      "items",
      "defaultValue",
      "value",
      "onValueChange",
      "multiple",
      "autoHighlight",
      "disabled",
      "itemToStringLabel",
      "itemToStringValue",
      "children",
    ]
  )
  const isGroup = (item: unknown): item is { items: unknown[] } =>
    typeof item === "object" &&
    item !== null &&
    Array.isArray((item as { items?: unknown }).items)
  const label = (item: unknown) =>
    local.itemToStringLabel?.(item) ??
    (typeof item === "object" && item !== null && "label" in item
      ? String((item as { label: unknown }).label)
      : String(item))
  const labels = createMemo(() =>
    local.items
      .flatMap((item) => (isGroup(item) ? item.items : [item]))
      .map((item) => ({ value: item, label: label(item) }))
  )

  const list = (v: unknown) =>
    v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]
  // What `ComboboxValue` hands its function: the caller's while controlled, else the last chosen.
  // The items themselves, which the root compares its values with.
  const [own, setOwn] = createSignal<unknown[]>(
    untrack(() => list(local.defaultValue))
  )
  const selected = createMemo(() =>
    local.value === undefined ? own() : list(local.value)
  )
  const report = (next: unknown) => {
    setOwn(list(next))
    local.onValueChange?.({ value: next })
  }

  const [chips, setChips] = createSignal(false)
  const context: ComboboxContextValue = {
    get items() {
      return local.items
    },
    label,
    get selected() {
      return selected()
    },
    get chips() {
      return chips()
    },
    setChips,
  }
  return (
    <ComboboxContext.Provider value={context}>
      <Show
        when={local.multiple}
        fallback={
          <ComboboxPrimitive.Root
            items={labels()}
            value={selected()[0] ?? null}
            onValueChange={(next) => report(next)}
            autoHighlight={local.autoHighlight}
            disabled={local.disabled}
            {...rest}
          >
            {local.children}
          </ComboboxPrimitive.Root>
        }
      >
        <ComboboxPrimitive.Root
          multiple
          items={labels()}
          values={selected()}
          onValuesChange={(next) => report(next)}
          autoHighlight={local.autoHighlight}
          disabled={local.disabled}
          {...rest}
        >
          {local.children}
        </ComboboxPrimitive.Root>
      </Show>
    </ComboboxContext.Provider>
  )
}

/** A `div`, as Base UI's chip, where Kirana UI's is a `span`. */
function ComboboxChip(props: {
  showRemove?: boolean
  /** The chip's item, which its remove button takes out of the selection. */
  value?: unknown
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ showRemove: true } as const, props),
    ["showRemove", "value", "class", "sx", "children"]
  )
  return (
    <ComboboxPrimitive.Chip
      as="div"
      data-slot="combobox-chip"
      value={local.value}
      {...rest}
      {...styleProps(local.class, combobox.chip, local.sx)}
    >
      {local.children}
      <Show when={local.showRemove}>
        <ComboboxPrimitive.ChipRemove
          data-slot="combobox-chip-remove"
          render={(removeProps) => (
            <Button
              {...removeProps()}
              variant="ghost"
              size="icon-xs"
              sx={combobox.chipRemove}
            >
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </Button>
          )}
        />
      </Show>
    </ComboboxPrimitive.Chip>
  )
}

/** What holds the chips and the input: the primitives place the popup against it. */
function ComboboxChips(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const ctx = useCombobox()
  onMount(() => ctx.setChips(true))
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      {...rest}
      {...styleProps(local.class, combobox.chips, local.sx)}
    >
      {local.children}
    </ComboboxPrimitive.Chips>
  )
}

function ComboboxChipsInput(props: {
  asChild?: AsChild<"input">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(local.class, combobox.chipInput, local.sx)}
    />
  )
}

/** Empties the input and the value, as Base UI's. */
function ComboboxClear(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      {...rest}
      render={(childProps) => (
        <InputGroupButton
          {...childProps()}
          variant="ghost"
          size="icon-xs"
          class={local.class}
          sx={[local.sx]}
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </InputGroupButton>
      )}
    />
  )
}

function ComboboxCollection(props: {
  /** Each of its group's items, as Base UI's collection calls its children with each. */
  // oxlint-disable-next-line no-explicit-any
  children?: (entry: { item: any; index: number }) => JSX.Element
}) {
  const [local] = splitProps(props, ["children"])
  const items = useContext(ComboboxGroupContext)
  return (
    <For each={items?.() ?? []}>
      {(item, index) => local.children?.({ item, index: index() })}
    </For>
  )
}

/** The popup, placed against Base UI's `anchor` when it is given one, else the chips or input. */
function ComboboxContent(props: {
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  /** Base UI's anchor: a ref (`useComboboxAnchor`) whose element the popup is placed against. */
  anchor?: unknown
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        side: "bottom",
        sideOffset: 6,
        align: "start",
        alignOffset: 0,
      } as const,
      props
    ),
    [
      "side",
      "sideOffset",
      "align",
      "alignOffset",
      "anchor",
      "class",
      "sx",
      "children",
    ]
  )
  const ctx = useCombobox()
  const anchor = () =>
    (local.anchor as { current?: HTMLElement | null } | undefined)?.current ??
    null
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        anchor={local.anchor ? anchor : undefined}
        {...styleProps(menuPositioner)}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={String(ctx.chips || !!local.anchor)}
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            combobox.content,
            local.sx
          )}
        >
          {local.children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxEmpty(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      {...rest}
      {...styleProps(local.class, combobox.empty, local.sx)}
    >
      {local.children}
    </ComboboxPrimitive.Empty>
  )
}

/** Base UI's Group, whose `items` its collection draws; hidden while none of them is shown. */
function ComboboxGroup(props: {
  items?: readonly unknown[]
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "items",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ComboboxGroupContext.Provider value={() => local.items ?? []}>
      <ComboboxPrimitive.Group
        data-slot="combobox-group"
        render={asRender(local.asChild)}
        {...rest}
        {...styleProps(local.class, local.sx)}
      >
        {local.children}
      </ComboboxPrimitive.Group>
    </ComboboxGroupContext.Provider>
  )
}

function ComboboxInput(props: {
  disabled?: boolean
  showTrigger?: boolean
  showClear?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { disabled: false, showTrigger: true, showClear: false } as const,
      props
    ),
    ["disabled", "showTrigger", "showClear", "class", "sx", "children"]
  )
  return (
    <InputGroup class={local.class} sx={[combobox.input, local.sx]}>
      <ComboboxPrimitive.Input
        {...rest}
        render={(childProps) => (
          <InputGroupInput {...childProps()} disabled={local.disabled} />
        )}
      />
      <InputGroupAddon align="inline-end">
        {/* The trigger renders the InputGroup's button, so the button keeps its own styles. */}
        <Show when={local.showTrigger}>
          <ComboboxPrimitive.Trigger
            data-slot="input-group-button"
            disabled={local.disabled}
            render={(childProps) => (
              <InputGroupButton
                {...childProps()}
                size="icon-xs"
                variant="ghost"
                sx={combobox.trigger}
              >
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  {...styleProps(combobox.triggerIcon)}
                />
              </InputGroupButton>
            )}
          />
        </Show>
        <Show when={local.showClear}>
          <ComboboxClear disabled={local.disabled} />
        </Show>
      </InputGroupAddon>
      {local.children}
    </InputGroup>
  )
}

function ComboboxItem(props: {
  value: unknown
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  const ctx = useCombobox()
  // Base UI's `value`: the item itself, as the combobox's `items` hold it.
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      value={local.value}
      label={ctx.label(local.value)}
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        combobox.item,
        local.sx
      )}
    >
      {local.children}
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

function ComboboxLabel(props: {
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
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(local.class, menuLabel, combobox.label, local.sx)}
    >
      {local.children}
    </ComboboxPrimitive.GroupLabel>
  )
}

function ComboboxList(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  /** Each of the root's items, as Base UI's list calls its children with each. */
  // oxlint-disable-next-line no-explicit-any
  children?: (entry: { item: any; index: number }) => JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  const ctx = useCombobox()
  // The primitives show the items that match what is typed.
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(local.class, combobox.list, local.sx)}
    >
      <For each={ctx.items}>
        {(item, index) => local.children?.({ item, index: index() })}
      </For>
    </ComboboxPrimitive.List>
  )
}

function ComboboxSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      {...rest}
      {...styleProps(local.class, menuSeparator, local.sx)}
    />
  )
}

function ComboboxTrigger(props: {
  /**
   * As Base UI's `render`: the element given takes the trigger's props, and the chevron as the
   * function's second argument, to render after its own children (Base UI puts the trigger's
   * children inside the element it renders).
   */
  asChild?: (
    props: Parameters<AsChild<"button">>[0],
    chevron: () => JSX.Element
  ) => JSX.Element
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
  const chevron = () => (
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      {...styleProps(combobox.triggerIcon)}
    />
  )
  return (
    <Show
      when={local.asChild}
      fallback={
        <ComboboxPrimitive.Trigger
          data-slot="combobox-trigger"
          {...rest}
          {...styleProps(local.class, combobox.triggerOwn, local.sx)}
        >
          {local.children}
          {chevron()}
        </ComboboxPrimitive.Trigger>
      }
    >
      {(child) => (
        <ComboboxPrimitive.Trigger
          data-slot="combobox-trigger"
          {...rest}
          {...styleProps(local.class, combobox.triggerOwn, local.sx)}
          render={asRender((childProps) => child()(childProps, chevron))}
        />
      )}
    </Show>
  )
}

/** Kirana UI's combobox has no Value part: the root mirrors what is chosen. */
function ComboboxValue(props: {
  /** Given the selected items, as Base UI's value calls its children. */
  // oxlint-disable-next-line no-explicit-any
  children?: (values: any[]) => JSX.Element
}) {
  const ctx = useCombobox()
  return (
    <>
      {props.children
        ? props.children(ctx.selected)
        : ctx.selected.map(ctx.label).join(", ")}
    </>
  )
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
}

/** Base UI's anchor ref; Kirana UI places the popup against the chips (`ComboboxChips`) on its own. */
export const useComboboxAnchor = () => ({ current: null as HTMLElement | null })
