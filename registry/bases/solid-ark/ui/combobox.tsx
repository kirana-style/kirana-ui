import {
  For,
  Show,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
  untrack,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  ComboboxClearTrigger,
  ComboboxContent as ArkComboboxContent,
  ComboboxControl,
  ComboboxInput as ArkComboboxInput,
  ComboboxItem as ArkComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxList as ArkComboboxList,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger as ArkComboboxTrigger,
  createListCollection,
  useLocaleContext,
} from "@ark-ui/solid"
import { positioning as place } from "../../../lib/placement"
import { combobox } from "../../../styles/combobox.styles"
import { IconPlaceholder } from "./icon-placeholder"
import { Button } from "./button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group"
import { Portal } from "solid-js/web"
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
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PlacementProps } from "../../../lib/placement"
import type {
  ComboboxInputProps,
  ComboboxTriggerProps,
  ComboboxItemGroupLabelProps,
  ComboboxItemGroupProps,
  ComboboxItemProps,
  ComboboxListProps,
} from "@ark-ui/solid"

/** What a Combobox hands its parts: getters, so they follow it. */
type ComboboxContextValue = {
  /** The items, or the groups with their matching items, that match what is typed. */
  readonly filtered: unknown[]
  /** A group's items that match what is typed. */
  filter: (items: readonly unknown[]) => unknown[]
  label: (item: unknown) => string
  value: (item: unknown) => string
  /** The selected items, in the shape the caller gave them. */
  readonly selected: unknown[]
  remove: (item: unknown) => void
  /** Whether the popup is anchored to the chips (`data-chips`). */
  readonly chips: boolean
  setChips: (chips: boolean) => void
  setPlacement: (placement: PlacementProps) => void
  /**
   * The input's id, a caller's (`<ComboboxInput id>`), which the root hands Zag as its own: Zag
   * finds its input by the id it gave it.
   */
  setInputId: (id: string | undefined) => void
}

const ComboboxContext = createContext<ComboboxContextValue>()
/** A group's items, which its `ComboboxCollection` draws. */
const ComboboxGroupContext = createContext<() => unknown[]>()
/** Inside the popup: an input there is not the anchor (the popup's own trigger is). */
const InContentContext = createContext(false)

function useCombobox() {
  const context = useContext(ComboboxContext)
  if (!context)
    throw new Error("A combobox part must be used within a Combobox.")
  return context
}

/**
 * Ark UI's combobox, taking Base UI's API: `items` (strings, objects with a `label` and `value`, or
 * groups with their own `items`), filtered by what is typed as Base UI's are, with `ComboboxList`
 * and `ComboboxCollection` drawing each match through their `children` function; a value or a list
 * of them (`multiple`), in the shape the items were given; `autoHighlight`.
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
  const value = (item: unknown) =>
    local.itemToStringValue?.(item) ??
    (typeof item === "object" && item !== null && "value" in item
      ? String((item as { value: unknown }).value)
      : String(item))

  const leaves = createMemo(() =>
    local.items.flatMap((item) => (isGroup(item) ? item.items : [item]))
  )

  // What is typed, while it is typed: an input showing the chosen item's label lists every item.
  const [query, setQuery] = createSignal("")
  const matches = (item: unknown) =>
    label(item).toLowerCase().includes(query().trim().toLowerCase())
  const filter = (pool: readonly unknown[]) => pool.filter(matches)
  const filtered = createMemo(() =>
    local.items.flatMap((item) => {
      if (!isGroup(item)) return matches(item) ? [item] : []
      return filter(item.items).length ? [item] : []
    })
  )
  const collection = createMemo(() =>
    createListCollection({
      items: leaves().filter(matches),
      itemToString: label,
      itemToValue: value,
    })
  )

  const list = (v: unknown) =>
    v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]
  const [own, setOwn] = createSignal<unknown[]>(
    untrack(() => list(local.defaultValue))
  )
  const selected = createMemo(() =>
    local.value === undefined ? own() : list(local.value)
  )
  function report(values: string[]) {
    const chosen = values
      .map((v) => leaves().find((item) => value(item) === v))
      .filter((item) => item !== undefined)
    setOwn(chosen)
    local.onValueChange?.({
      value: local.multiple ? chosen : (chosen[0] ?? null),
    })
  }
  // Opened, Base UI's single combobox highlights its chosen item; Ark's highlights none.
  const [highlighted, setHighlighted] = createSignal<string | null>(null)
  function opened(open: boolean) {
    if (open)
      setHighlighted(
        !local.multiple && selected()[0] !== undefined
          ? value(selected()[0])
          : null
      )
  }
  const remove = (item: unknown) =>
    report(
      selected()
        .filter((s) => s !== item)
        .map(value)
    )

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const [placement, setPlacement] = createSignal<PlacementProps>({})
  const locale = useLocaleContext()
  const positioning = createMemo(() =>
    place(placement(), { rtl: locale?.()?.dir === "rtl" })
  )
  const [inputId, setInputId] = createSignal<string>()
  const [chips, setChips] = createSignal(false)

  const context: ComboboxContextValue = {
    get filtered() {
      return filtered()
    },
    filter,
    label,
    value,
    get selected() {
      return selected()
    },
    remove,
    get chips() {
      return chips()
    },
    setChips,
    setPlacement,
    setInputId,
  }
  return (
    <ComboboxContext.Provider value={context}>
      {/* Closed, the popup leaves the page, as Base UI's does. */}
      <ComboboxRoot
        lazyMount
        unmountOnExit
        collection={collection()}
        value={selected().map(value)}
        defaultInputValue={
          !local.multiple && selected()[0] !== undefined
            ? label(selected()[0])
            : undefined
        }
        multiple={local.multiple}
        disabled={local.disabled}
        inputBehavior={local.autoHighlight ? "autohighlight" : "none"}
        selectionBehavior={local.multiple ? "clear" : "replace"}
        positioning={positioning()}
        ids={inputId() ? { input: inputId() } : undefined}
        openOnClick
        highlightedValue={highlighted() ?? undefined}
        {...styleProps(combobox.rootArk)}
        {...rest}
        onValueChange={(details) => report(details.value)}
        onOpenChange={(details) => opened(details.open)}
        onHighlightChange={(details) =>
          setHighlighted(details.highlightedValue)
        }
        onInputValueChange={(details) =>
          setQuery(details.reason === "input-change" ? details.inputValue : "")
        }
      >
        {local.children}
      </ComboboxRoot>
    </ComboboxContext.Provider>
  )
}

function ComboboxChip(props: {
  showRemove?: boolean
  /** The chip's item, which its ctx.remove button takes out of the selection. */
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
  const ctx = useCombobox()
  return (
    <div
      data-slot="combobox-chip"
      {...rest}
      {...styleProps(local.class, combobox.chip, local.sx)}
    >
      {local.children}
      <Show when={local.showRemove}>
        <Button
          data-slot="combobox-chip-remove"
          variant="ghost"
          size="icon-xs"
          tabindex="-1"
          sx={combobox.chipRemove}
          onClick={() => {
            ctx.remove(local.value)
          }}
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </Button>
      </Show>
    </div>
  )
}

function ComboboxChips(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  // Ark anchors the popup to its control, which the chips are: Base UI's `anchor`.
  const ctx = useCombobox()
  onMount(() => ctx.setChips(true))
  return (
    <ComboboxControl
      asChild={(childProps) => (
        <div
          {...childProps()}
          data-slot="combobox-chips"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            combobox.chips,
            local.sx
          )}
        >
          {local.children}
        </div>
      )}
    />
  )
}

function ComboboxChipsInput(props: {
  asChild?: ComboboxInputProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <ArkComboboxInput
      asChild={local.asChild}
      data-slot="combobox-chip-input"
      {...rest}
      {...styleProps(local.class, combobox.chipInput, local.sx)}
    />
  )
}

function ComboboxClear(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <ComboboxClearTrigger
      data-slot="combobox-clear"
      {...rest}
      asChild={(childProps) => (
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
  /** Each of its group's matching items. */
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

function ComboboxContent(props: {
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  /** Base UI's anchor; Ark's popup is anchored to the chips themselves (`ComboboxChips`). */
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
  // Base UI's placement, which the root places the popup with.
  const ctx = useCombobox()
  createEffect(() => {
    ctx.setPlacement({
      side: local.side,
      sideOffset: local.sideOffset,
      align: local.align,
      alignOffset: local.alignOffset,
    })
  })
  return (
    <InContentContext.Provider value={true}>
      <Portal>
        <ComboboxPositioner {...styleProps(menuPositioner)}>
          <ArkComboboxContent
            data-slot="combobox-content"
            data-chips={String(ctx.chips)}
            {...rest}
            {...styleProps(
              local.class,
              popupMotion,
              menuSurface,
              combobox.content,
              combobox.contentArk,
              local.sx
            )}
          >
            {local.children}
          </ArkComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </InContentContext.Provider>
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
    <div
      data-slot="combobox-empty"
      {...rest}
      {...styleProps(local.class, combobox.empty, local.sx)}
    >
      {local.children}
    </div>
  )
}

function ComboboxGroup(props: {
  items?: readonly unknown[]
  asChild?: ComboboxItemGroupProps["asChild"]
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
  const ctx = useCombobox()
  return (
    <ComboboxGroupContext.Provider value={() => ctx.filter(local.items ?? [])}>
      <ComboboxItemGroup
        asChild={local.asChild}
        data-slot="combobox-group"
        {...rest}
        {...styleProps(local.class, local.sx)}
      >
        {local.children}
      </ComboboxItemGroup>
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
  // A caller's id goes to the root, which writes it on the input as Zag's own.
  const ctx = useCombobox()
  const [, others] = splitProps(rest, ["id"])
  createEffect(() => ctx.setInputId(rest.id as string | undefined))
  // In the popup ("Combobox in Popup"), the trigger outside it is the anchor, not this input.
  const inContent = useContext(InContentContext)
  return (
    <InputGroup class={local.class} sx={[combobox.input, local.sx]}>
      {inContent ? (
        <>
          <ArkComboboxInput
            asChild={(childProps) => (
              <InputGroupInput
                {...childProps()}
                disabled={local.disabled}
                {...others}
              />
            )}
          />
        </>
      ) : (
        <>
          <ComboboxControl
            asChild={(childProps) => (
              <>
                <ArkComboboxInput
                  {...childProps()}
                  asChild={(childProps2) => (
                    <InputGroupInput
                      {...childProps2()}
                      disabled={local.disabled}
                      {...others}
                    />
                  )}
                />
              </>
            )}
          />
        </>
      )}
      <InputGroupAddon align="inline-end">
        <Show when={local.showTrigger}>
          <>
            <ArkComboboxTrigger
              data-slot="input-group-button"
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
          </>
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
  asChild?: ComboboxItemProps["asChild"]
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
  // Base UI's `value`: the item itself, as the combobox's `items` hold it.
  return (
    <ArkComboboxItem
      asChild={local.asChild}
      data-slot="combobox-item"
      item={local.value}
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
      <ComboboxItemIndicator
        asChild={(childProps) => (
          <span
            {...childProps()}
            {...styleProps(
              childProps().class,
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
    </ArkComboboxItem>
  )
}

function ComboboxLabel(props: {
  asChild?: ComboboxItemGroupLabelProps["asChild"]
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
    <ComboboxItemGroupLabel
      asChild={local.asChild}
      data-slot="combobox-label"
      {...rest}
      {...styleProps(local.class, menuLabel, combobox.label, local.sx)}
    >
      {local.children}
    </ComboboxItemGroupLabel>
  )
}

function ComboboxList(props: {
  asChild?: ComboboxListProps["asChild"]
  class?: string
  sx?: Sx
  /** Each matching item, as Base UI's list calls its children with each. */
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
  return (
    <ArkComboboxList
      asChild={local.asChild}
      data-slot="combobox-list"
      {...rest}
      {...styleProps(local.class, combobox.list, local.sx)}
    >
      <For each={ctx.filtered}>
        {(item, index) => local.children?.({ item, index: index() })}
      </For>
    </ArkComboboxList>
  )
}

function ComboboxSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <div
      data-slot="combobox-separator"
      role="separator"
      aria-orientation="horizontal"
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
    props: Parameters<NonNullable<ComboboxTriggerProps["asChild"]>>[0],
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
        <ArkComboboxTrigger
          data-slot="combobox-trigger"
          {...rest}
          {...styleProps(local.class, combobox.triggerOwn, local.sx)}
        >
          {local.children}
          {chevron()}
        </ArkComboboxTrigger>
      }
    >
      {(child) => (
        <ArkComboboxTrigger
          data-slot="combobox-trigger"
          {...rest}
          {...styleProps(local.class, combobox.triggerOwn, local.sx)}
          asChild={(childProps) => child()(childProps, chevron)}
        />
      )}
    </Show>
  )
}

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

/** Base UI's anchor ref; Ark anchors the popup to the chips (`ComboboxChips`) on its own. */
export const useComboboxAnchor = () => ({ current: null as HTMLElement | null })
