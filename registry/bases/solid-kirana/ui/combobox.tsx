import { Combobox as ComboboxPrimitive } from "@kirana-ui/solid/combobox"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  For,
  Show,
  createContext,
  createMemo,
  createSignal,
  merge,
  omit,
  onSettled,
  untrack,
  useContext,
} from "solid-js"
import type { JSX } from "@solidjs/web"

import { asRender } from "../../../lib/solid2/element"
import type { AsChild } from "../../../lib/solid2/element"
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

const ComboboxContext = createContext<ComboboxContextValue | null>(null)
/** A group's items, which its `ComboboxCollection` draws. */
const ComboboxGroupContext = createContext<(() => readonly unknown[]) | null>(
  null
)

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
 * (`multiple`), the items themselves; `autoHighlight`.
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
  /** Base UI's object values' keys: the text a form is sent for each. */
  // oxlint-disable-next-line no-explicit-any
  itemToStringValue?: (item: any) => string
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(props, {
    get items() {
      return props.items ?? ([] as readonly unknown[])
    },
    get multiple() {
      return props.multiple ?? false
    },
    get autoHighlight() {
      return props.autoHighlight ?? false
    },
    get disabled() {
      return props.disabled ?? false
    },
  })
  const rest = omit(
    local,
    "items",
    "defaultValue",
    "value",
    "onValueChange",
    "multiple",
    "autoHighlight",
    "disabled",
    "itemToStringLabel",
    "itemToStringValue",
    "children"
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
    <ComboboxContext value={context}>
      <Show
        when={local.multiple}
        fallback={
          <ComboboxPrimitive.Root
            items={labels()}
            value={selected()[0] ?? null}
            onValueChange={(next) => report(next)}
            itemToStringValue={local.itemToStringValue}
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
          value={selected()}
          onValueChange={(next) => report(next)}
          itemToStringValue={local.itemToStringValue}
          autoHighlight={local.autoHighlight}
          disabled={local.disabled}
          {...rest}
        >
          {local.children}
        </ComboboxPrimitive.Root>
      </Show>
    </ComboboxContext>
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
  const local = merge(props, {
    get showRemove() {
      return props.showRemove ?? true
    },
  })
  const rest = omit(local, "showRemove", "value", "class", "sx", "children")
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
  const rest = omit(props, "class", "sx", "children")
  const ctx = useCombobox()
  onSettled(() => {
    ctx.setChips(true)
  })
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      {...rest}
      {...styleProps(props.class, combobox.chips, props.sx)}
    >
      {props.children}
    </ComboboxPrimitive.Chips>
  )
}

function ComboboxChipsInput(props: {
  asChild?: AsChild<"input">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, combobox.chipInput, props.sx)}
    />
  )
}

/** Empties the input and the value, as Base UI's. */
function ComboboxClear(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      {...rest}
      render={(childProps) => (
        <InputGroupButton
          {...childProps()}
          variant="ghost"
          size="icon-xs"
          class={props.class}
          sx={[props.sx]}
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
  const items = useContext(ComboboxGroupContext)
  return (
    <For each={items?.() ?? []}>
      {(item, index) => props.children?.({ item, index: index() })}
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
  const local = merge(props, {
    get side() {
      return props.side ?? ("bottom" as const)
    },
    get sideOffset() {
      return props.sideOffset ?? 6
    },
    get align() {
      return props.align ?? ("start" as const)
    },
    get alignOffset() {
      return props.alignOffset ?? 0
    },
  })
  const rest = omit(
    local,
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "anchor",
    "class",
    "sx",
    "children"
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
  const rest = omit(props, "class", "sx", "children")
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      {...rest}
      {...styleProps(props.class, combobox.empty, props.sx)}
    >
      {props.children}
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
  const rest = omit(props, "items", "asChild", "class", "sx", "children")
  return (
    <ComboboxGroupContext value={() => props.items ?? []}>
      <ComboboxPrimitive.Group
        data-slot="combobox-group"
        render={asRender(props.asChild)}
        {...rest}
        {...styleProps(props.class, props.sx)}
      >
        {props.children}
      </ComboboxPrimitive.Group>
    </ComboboxGroupContext>
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
  const local = merge(props, {
    get disabled() {
      return props.disabled ?? false
    },
    get showTrigger() {
      return props.showTrigger ?? true
    },
    get showClear() {
      return props.showClear ?? false
    },
  })
  const rest = omit(
    local,
    "disabled",
    "showTrigger",
    "showClear",
    "class",
    "sx",
    "children"
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
  const rest = omit(props, "value", "asChild", "class", "sx", "children")
  const ctx = useCombobox()
  // Base UI's `value`: the item itself, as the combobox's `items` hold it.
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      value={props.value}
      label={ctx.label(props.value)}
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        combobox.item,
        props.sx
      )}
    >
      {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, menuLabel, combobox.label, props.sx)}
    >
      {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  const ctx = useCombobox()
  // The primitives show the items that match what is typed.
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, combobox.list, props.sx)}
    >
      <For each={ctx.items}>
        {(item, index) => props.children?.({ item, index: index() })}
      </For>
    </ComboboxPrimitive.List>
  )
}

function ComboboxSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      {...rest}
      {...styleProps(props.class, menuSeparator, props.sx)}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
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
      when={props.asChild}
      fallback={
        <ComboboxPrimitive.Trigger
          data-slot="combobox-trigger"
          {...rest}
          {...styleProps(props.class, combobox.triggerOwn, props.sx)}
        >
          {props.children}
          {chevron()}
        </ComboboxPrimitive.Trigger>
      }
    >
      {(child) => (
        <ComboboxPrimitive.Trigger
          data-slot="combobox-trigger"
          {...rest}
          {...styleProps(props.class, combobox.triggerOwn, props.sx)}
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
