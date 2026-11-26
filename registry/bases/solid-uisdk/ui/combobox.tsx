/**
 * ui-sdk's combobox, taking Base UI's API as the Ark UI part does: `items` (strings, objects with a
 * `label` and `value`, or groups with their own `items`), which `ComboboxList` and
 * `ComboboxCollection` draw through their `children` function and ui-sdk filters as it is typed in;
 * a value or a list of them (`multiple`; `value` with `onValueChange` called with `{ value }`), in
 * the shape the items were given; `autoHighlight`; `itemToStringLabel` and `itemToStringValue`,
 * ui-sdk's `itemToLabel` and `itemToValue`. Its popup renders in the body, as Base UI's portal puts
 * it, placed against the chips, else the input's group, else the trigger, as Base UI places it.
 */
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Combobox as UisdkCombobox,
  ComboboxChip as UisdkComboboxChip,
  ComboboxChipRemove,
  ComboboxChips as UisdkComboboxChips,
  ComboboxClear as UisdkComboboxClear,
  ComboboxContent as UisdkComboboxContent,
  ComboboxEmpty as UisdkComboboxEmpty,
  ComboboxGroup as UisdkComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput as UisdkComboboxInput,
  ComboboxItem as UisdkComboboxItem,
  ComboboxItemIndicator,
  ComboboxList as UisdkComboboxList,
  ComboboxSeparator as UisdkComboboxSeparator,
  ComboboxTrigger as UisdkComboboxTrigger,
  ComboboxValue as UisdkComboboxValue,
} from "@ui-sdk/solid/combobox"
import type { JSX } from "@solidjs/web"
import {
  createContext,
  createSignal,
  For,
  omit,
  onCleanup,
  Show,
  useContext,
} from "solid-js"
import type { Accessor, Setter } from "solid-js"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
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
import { withDefaults } from "../../../lib/solid2/with-defaults"

/** Base UI's sides: the physical four and the logical two, which ui-sdk names `start` and `end`. */
type BaseSide =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "inline-start"
  | "inline-end"

/** One element the popup may be placed against. */
type Anchor = [
  Accessor<HTMLElement | undefined>,
  Setter<HTMLElement | undefined>,
]

/** What a Combobox hands its parts. */
type ComboboxContextValue = {
  /** The root's items, which `ComboboxList` draws (ui-sdk filters what it draws). */
  readonly items: readonly unknown[]
  /**
   * What the popup is placed against unless it is given an anchor, as Base UI places it: the chips,
   * else the input's group, else the trigger. ui-sdk's default is an element of its own.
   */
  chips: Anchor
  input: Anchor
  trigger: Anchor
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null)
/** A group's items, which its `ComboboxCollection` draws. */
const ComboboxGroupContext = createContext<(() => readonly unknown[]) | null>(
  null
)
/** Inside the popup: an input there is not the anchor (the popup's own trigger is). */
const InContentContext = createContext(false)

/** An item's label, as Base UI reads it: an object's `label`, else the item as text. */
const labelOf = (item: unknown) =>
  typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item)

/**
 * Sets `anchor` to the element its setter is given, while the component is on the page. Made in
 * the component's body: Solid 2 takes no `onCleanup` in a `ref` callback.
 */
function useAnchor(anchor: Anchor | undefined) {
  let current: HTMLElement | undefined
  onCleanup(() => {
    if (anchor && current && anchor[0]() === current) anchor[1](undefined)
  })
  return (el: HTMLElement) => {
    if (!anchor) return
    current = el
    anchor[1](() => el)
  }
}

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
  // oxlint-disable-next-line no-explicit-any
  itemToStringValue?: (item: any) => string
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "items",
    "value",
    "onValueChange",
    "itemToStringLabel",
    "itemToStringValue",
    "children"
  )
  const context: ComboboxContextValue = {
    get items() {
      return props.items ?? []
    },
    chips: createSignal<HTMLElement>(),
    input: createSignal<HTMLElement>(),
    trigger: createSignal<HTMLElement>(),
  }
  return (
    <ComboboxContext value={context}>
      <UisdkCombobox
        container={typeof document === "undefined" ? undefined : document.body}
        itemToLabel={props.itemToStringLabel ?? labelOf}
        itemToValue={props.itemToStringValue}
        value={props.value}
        {...(rest as Record<string, unknown>)}
        onValueChange={(next: unknown) =>
          props.onValueChange?.({ value: next })
        }
      >
        {props.children}
      </UisdkCombobox>
    </ComboboxContext>
  )
}

function ComboboxChip(props: {
  showRemove?: boolean
  /** The chip's item, which its remove button takes out of the selection. */
  value?: unknown
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults({ showRemove: true } as const, props)
  const rest = omit(local, "showRemove", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkComboboxChip}
      slotName="combobox-chip"
      tag="div"
      {...rest}
      {...styleProps(local.class, combobox.chip, local.sx)}
    >
      {local.children}
      <Show when={local.showRemove}>
        <UisdkPart
          part={ComboboxChipRemove}
          slotName="combobox-chip-remove"
          tag="button"
          asChild={(childProps) => (
            <Button
              {...childProps()}
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
    </UisdkPart>
  )
}

function ComboboxChips(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  // The chips place the popup (Base UI's `anchor`, which its examples give them).
  const context = useContext(ComboboxContext)
  const anchorChips = useAnchor(context?.chips)
  return (
    <UisdkPart
      part={UisdkComboboxChips}
      slotName="combobox-chips"
      tag="div"
      ref={anchorChips}
      {...rest}
      {...styleProps(props.class, combobox.chips, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function ComboboxChipsInput(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={UisdkComboboxInput}
      slotName="combobox-chip-input"
      tag="input"
      {...rest}
      {...styleProps(props.class, combobox.chipInput, props.sx)}
    />
  )
}

/** ui-sdk's clear, drawn as the InputGroup's button. */
function ComboboxClear(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={UisdkComboboxClear}
      slotName="combobox-clear"
      tag="button"
      {...rest}
      asChild={(childProps) => (
        <InputGroupButton
          {...childProps()}
          variant="ghost"
          size="icon-xs"
          class={props.class}
          sx={props.sx}
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

/** Each of the group's items through the function, as Base UI's collection; ui-sdk filters them. */
function ComboboxCollection(props: {
  /** Each of its group's matching items. */
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

/** ui-sdk's room on the popup, under names its descendants inherit (LF-025). */
const ROOM: JSX.CSSProperties = {
  "--uisdk-available-height": "var(--available-height)",
  "--uisdk-available-width": "var(--available-width)",
}

/**
 * Base UI's placement. ui-sdk's content places itself, with no positioner: the positioner's styles
 * join the content's.
 */
function ComboboxContent(props: {
  side?: BaseSide
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  /** Base UI's anchor (`useComboboxAnchor`'s); without it, the chips, the input's group or the trigger. */
  anchor?: { current: HTMLElement | null } | HTMLElement | null
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults(
    { side: "bottom", sideOffset: 6, align: "start", alignOffset: 0 } as const,
    props
  )
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
  const context = useContext(ComboboxContext)
  const given = () => {
    const anchor = local.anchor
    return anchor && "current" in anchor ? anchor.current : (anchor ?? null)
  }
  const placedAgainst = () =>
    given() ??
    context?.chips[0]() ??
    context?.input[0]() ??
    context?.trigger[0]() ??
    undefined
  const own = () =>
    styleProps(
      local.class,
      menuPositioner,
      popupMotion,
      menuSurface,
      combobox.content,
      local.sx
    )
  return (
    <InContentContext value={true}>
      <UisdkPart
        part={UisdkComboboxContent}
        slotName="combobox-content"
        tag="div"
        data-chips={String(!!(given() ?? context?.chips[0]()))}
        side={
          local.side === "inline-start"
            ? "start"
            : local.side === "inline-end"
              ? "end"
              : local.side
        }
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        anchor={placedAgainst()}
        {...rest}
        class={own().class}
        style={{ ...own().style, ...ROOM }}
      >
        {local.children}
      </UisdkPart>
    </InContentContext>
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
    <UisdkPart
      part={UisdkComboboxEmpty}
      slotName="combobox-empty"
      tag="div"
      {...rest}
      {...styleProps(props.class, combobox.empty, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

/** Base UI's group `items`, which its collection draws. */
function ComboboxGroup(props: {
  items?: readonly unknown[]
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "items", "class", "sx", "children")
  return (
    <ComboboxGroupContext value={() => props.items ?? []}>
      <UisdkPart
        part={UisdkComboboxGroup}
        slotName="combobox-group"
        tag="div"
        {...rest}
        {...styleProps(props.class, props.sx)}
      >
        {props.children}
      </UisdkPart>
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
  const local = withDefaults(
    { disabled: false, showTrigger: true, showClear: false } as const,
    props
  )
  const rest = omit(
    local,
    "disabled",
    "showTrigger",
    "showClear",
    "class",
    "sx",
    "children"
  )
  // The input's group places the popup, as Base UI's does; in the popup ("Combobox in Popup") the
  // trigger outside it does instead.
  const context = useContext(ComboboxContext)
  const anchorInput = useAnchor(context?.input)
  const inContent = useContext(InContentContext)
  return (
    <InputGroup
      ref={(el: HTMLElement) => {
        if (!inContent) anchorInput(el)
      }}
      class={local.class}
      sx={[combobox.input, local.sx]}
    >
      <UisdkPart
        part={UisdkComboboxInput}
        slotName="input-group-control"
        tag="input"
        {...rest}
        asChild={(childProps) => (
          <InputGroupInput {...childProps()} disabled={local.disabled} />
        )}
      />
      <InputGroupAddon align="inline-end">
        {/* The trigger renders the InputGroup's button, so the button keeps its own styles. */}
        <Show when={local.showTrigger}>
          <UisdkPart
            part={UisdkComboboxTrigger}
            slotName="input-group-button"
            tag="button"
            disabled={local.disabled}
            asChild={(childProps) => (
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

/** Base UI's `value`: the item itself, as the combobox's `items` hold it. */
function ComboboxItem(props: {
  value: unknown
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkComboboxItem}
      slotName="combobox-item"
      tag="div"
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
      <ComboboxItemIndicator
        render={(given: Record<string, unknown>) => (
          <span
            {...given}
            {...styleProps(
              given.class as string | undefined,
              menuIndicator,
              combobox.indicator
            )}
          >
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </span>
        )}
      />
    </UisdkPart>
  )
}

function ComboboxLabel(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={ComboboxGroupLabel}
      slotName="combobox-label"
      tag="div"
      {...rest}
      {...styleProps(props.class, menuLabel, combobox.label, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

/**
 * Each of the root's items through the function, as Base UI's list calls its children with each;
 * ui-sdk hides those that do not match what is typed.
 */
function ComboboxList(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  /** Each item, as Base UI's list calls its children with each. */
  // oxlint-disable-next-line no-explicit-any
  children?: (entry: { item: any; index: number }) => JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  const context = useContext(ComboboxContext)
  return (
    <UisdkPart
      part={UisdkComboboxList}
      slotName="combobox-list"
      tag="div"
      {...rest}
      {...styleProps(props.class, combobox.list, props.sx)}
    >
      <For each={context?.items ?? []}>
        {(item, index) => props.children?.({ item, index: index() })}
      </For>
    </UisdkPart>
  )
}

function ComboboxSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={UisdkComboboxSeparator}
      slotName="combobox-separator"
      tag="div"
      {...rest}
      {...styleProps(props.class, menuSeparator, props.sx)}
    />
  )
}

/**
 * ui-sdk's trigger. As Base UI's `render`, an `asChild` function is given the trigger's props and
 * its chevron, which it draws inside its own element. Without an input outside the popup, the
 * trigger places it.
 */
function ComboboxTrigger(props: {
  asChild?: (
    props: (userProps?: Record<string, unknown>) => Record<string, unknown>,
    chevron: () => JSX.Element
  ) => JSX.Element
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  const context = useContext(ComboboxContext)
  const anchorTrigger = useAnchor(context?.trigger)
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
    <UisdkComboboxTrigger
      ref={anchorTrigger}
      {...rest}
      render={(given: Record<string, unknown>) => {
        const asChild = props.asChild
        return asChild ? (
          asChild(
            (userProps) => ({
              ...userProps,
              ...given,
              "data-slot": "combobox-trigger",
            }),
            chevron
          )
        ) : (
          <button
            type="button"
            {...given}
            data-slot="combobox-trigger"
            {...styleProps(
              given.class as string | undefined,
              props.class,
              combobox.triggerOwn,
              props.sx
            )}
          >
            {props.children}
            {chevron()}
          </button>
        )
      }}
    />
  )
}

/** The value as a list: none, one, or a `multiple` combobox's. */
const list = (value: unknown): unknown[] =>
  value === undefined || value === null
    ? []
    : Array.isArray(value)
      ? value
      : [value]

/** The selection, through the function as Base UI's value calls its children; else its labels. */
function ComboboxValue(props: {
  /** Given the selected items, as Base UI's value calls its children. */
  // oxlint-disable-next-line no-explicit-any
  children?: (values: any[]) => JSX.Element
}) {
  return (
    <UisdkComboboxValue>
      {(state: { value: unknown; label: string }) => {
        const render = props.children
        return render ? render(list(state.value)) : state.label
      }}
    </UisdkComboboxValue>
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

/** Base UI's anchor ref; the popup is anchored to the chips (`ComboboxChips`) on its own. */
export const useComboboxAnchor = () => ({ current: null as HTMLElement | null })
