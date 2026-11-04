import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  Show,
  splitProps,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  SelectContent as ArkSelectContent,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem as ArkSelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPositioner,
  SelectRoot,
  SelectTrigger as ArkSelectTrigger,
  SelectValueText,
  createListCollection,
  useLocaleContext,
  useSelectContext,
} from "@ark-ui/solid"
import { positioning as place } from "../../../lib/placement"
import { select } from "../../../styles/select.styles"
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
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "solid-js"
import type { PlacementProps } from "../../../lib/placement"
import type { Sx } from "@kirana-style/core"
import type {
  ListCollection,
  SelectItemGroupLabelProps,
  SelectItemGroupProps,
  SelectTriggerProps,
} from "@ark-ui/solid"

/** An entry of the select's collection: its value and text (`null`, the placeholder). */
type Entry = { label: string; value: string | null; disabled?: boolean }
/** How a `SelectItem` adds itself to a select given no items. */
const RegisterContext = createContext<(entry: Entry) => void>()
/** The label of the select's `null` entry, which its value shows while none is chosen. */
const PlaceholderContext = createContext<() => string | undefined>()
/** The content's placement, which it hands to its root (`lib/placement.ts`). */
const PlacementContext = createContext<(placement: PlacementProps) => void>()
/**
 * The trigger's id, a caller's (`<SelectTrigger id>`, for a label's `for`), handed to the root's
 * `ids`: Zag finds its trigger by the id it gave it, so one written over it leaves the popup with
 * no anchor.
 */
const TriggerIdContext = createContext<(id: string | undefined) => void>()

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
    "onValueChange",
    "children",
  ])
  /**
   * Ark's select is built from a collection: pass `items` as Base UI's select takes them (an entry
   * whose `value` is `null` is the placeholder), or a `collection` of your own
   * (`createListCollection`). Each `SelectItem` names its entry by `value`, or with `item`. A hidden
   * native select carries the value in a form. The value is one (`null` for none), or several in a
   * `multiple` select, as Base UI's.
   */
  // Without `items` or a `collection`, the items are read from the markup, as Base UI's are: each
  // `SelectItem` registers its value and text.
  const [registered, setRegistered] = createSignal<Entry[]>([])
  const register = (entry: Entry) => {
    if (local.items || local.collection) return
    if (!registered().some((known) => known.value === entry.value))
      setRegistered([...registered(), entry])
  }
  const collection = createMemo(
    () =>
      local.collection ??
      createListCollection({
        // The placeholder's entry is the empty value, which clears the select as Base UI's does.
        items: local.items ?? registered(),
        itemToString: (item: Entry) => item.label,
        itemToValue: (item: Entry) => item.value ?? "",
        isItemDisabled: (item: Entry) => !!item.disabled,
      })
  )
  const placeholder = () =>
    local.items?.find((item) => item.value === null)?.label
  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const [placement, setPlacement] = createSignal<PlacementProps>({})
  const [triggerId, setTriggerId] = createSignal<string>()
  const locale = useLocaleContext()
  const positioning = createMemo(() =>
    place(placement(), { rtl: locale?.()?.dir === "rtl" })
  )

  const list = (next: string | string[] | null | undefined) =>
    next === null ? [] : typeof next === "string" ? [next] : next
  /** A value reported in the shape the caller gave it: one, or the list. */
  const report = (next: string[]) =>
    Array.isArray(local.value) || Array.isArray(local.defaultValue)
      ? next
      : (next[0] ?? null)
  return (
    <RegisterContext.Provider value={register}>
      <PlaceholderContext.Provider value={placeholder}>
        <PlacementContext.Provider value={setPlacement}>
          <TriggerIdContext.Provider value={setTriggerId}>
            {/* Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. */}
            <SelectRoot
              lazyMount
              unmountOnExit
              collection={collection()}
              defaultValue={list(local.defaultValue)}
              value={local.value === undefined ? undefined : list(local.value)}
              positioning={positioning()}
              ids={triggerId() ? { trigger: triggerId() } : undefined}
              {...styleProps(select.rootArk)}
              {...rest}
              onValueChange={(details) =>
                local.onValueChange?.({ value: report(details.value) as V })
              }
            >
              {local.children}
              <SelectHiddenSelect />
            </SelectRoot>
          </TriggerIdContext.Provider>
        </PlacementContext.Provider>
      </PlaceholderContext.Provider>
    </RegisterContext.Provider>
  )
}

function SelectContent(props: {
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
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
      } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  // Base UI's placement, which the root places the popup with. `alignItemWithTrigger`, Base UI's
  // popup laid over its trigger with the chosen item level with it, has no counterpart in Ark: the
  // popup always opens beside the trigger.

  const setPlacement = useContext(PlacementContext)
  createEffect(() => {
    setPlacement?.({
      side: local.side,
      sideOffset: local.sideOffset,
      align: local.align,
      alignOffset: local.alignOffset,
    })
  })

  // Whether the list can scroll up or down, for Base UI's scroll arrows (`SelectScrollButton`).
  const [list, setList] = createSignal<HTMLElement>()
  const [canUp, setCanUp] = createSignal(false)
  const [canDown, setCanDown] = createSignal(false)
  const measure = () => {
    const element = list()
    if (!element) return
    setCanUp(element.scrollTop > 0)
    setCanDown(
      element.scrollTop + element.clientHeight < element.scrollHeight - 1
    )
  }
  createEffect(() => {
    const element = list()
    if (!element) return
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    for (const child of element.children) resize.observe(child)
    onCleanup(() => resize.disconnect())
  })
  return (
    <Portal>
      <SelectPositioner {...styleProps(menuPositioner)}>
        <ArkSelectContent
          data-slot="select-content"
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            select.content,
            local.sx
          )}
        >
          <Show when={canUp()}>
            <SelectScrollButton direction="up" list={list()} />
          </Show>
          <SelectList
            ref={setList}
            {...styleProps(select.list)}
            onScroll={measure}
          >
            {local.children}
          </SelectList>
          <Show when={canDown()}>
            <SelectScrollButton direction="down" list={list()} />
          </Show>
        </ArkSelectContent>
      </SelectPositioner>
    </Portal>
  )
}

function SelectGroup(props: {
  asChild?: SelectItemGroupProps["asChild"]
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
    <SelectItemGroup
      asChild={local.asChild}
      data-slot="select-group"
      {...rest}
      {...styleProps(local.class, select.group, local.sx)}
    >
      {local.children}
    </SelectItemGroup>
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
  // Its entry of the select's collection: `item`, or the one Base UI's `value` names. `unknown`: a
  // caller's items are of its own type.

  const context = useSelectContext()
  const register = useContext(RegisterContext)
  // Read from the markup, the item registers once its text is in the page; until then it is its
  // own entry.
  const [text, setText] = createSignal<HTMLElement>()
  const own = createMemo<Entry>(() => ({
    value: local.value ?? null,
    label: text()?.textContent?.trim() ?? "",
    disabled: !!local.disabled,
  }))
  onMount(() => register?.(own()))
  const entry = createMemo(
    () => local.item ?? context().collection.find(local.value ?? "") ?? own()
  )
  return (
    <ArkSelectItem
      data-slot="select-item"
      item={entry()}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        select.item,
        local.sx
      )}
    >
      <SelectItemText ref={setText} {...styleProps(select.itemText)}>
        {local.children}
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
    </ArkSelectItem>
  )
}

function SelectLabel(props: {
  asChild?: SelectItemGroupLabelProps["asChild"]
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
    <SelectItemGroupLabel
      asChild={local.asChild}
      data-slot="select-label"
      {...rest}
      {...styleProps(local.class, menuLabel, local.sx)}
    >
      {local.children}
    </SelectItemGroupLabel>
  )
}

function SelectScrollButton(props: {
  direction: "up" | "down"
  /** The list it scrolls. */
  list: HTMLElement | undefined
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["direction", "list", "class", "sx"])
  /**
   * Base UI's `ScrollUpArrow` and `ScrollDownArrow`, which Ark UI's select has no counterpart for:
   * at the popup's top or bottom while the list can scroll that way, scrolling it while the pointer
   * rests on it. `SelectContent` mounts one per direction.
   */

  /** Pixels a frame, about Base UI's pace. */
  const STEP = 15
  let frame = 0
  function scroll() {
    if (!local.list) return
    local.list.scrollTop += local.direction === "up" ? -STEP : STEP
    frame = requestAnimationFrame(scroll)
  }
  const stop = () => cancelAnimationFrame(frame)
  onCleanup(stop)
  const own = () =>
    styleProps(
      local.class,
      select.scrollButton,
      local.direction === "up" ? select.scrollUp : select.scrollDown,
      local.sx
    )
  return (
    <div
      data-slot={
        local.direction === "up"
          ? "select-scroll-up-button"
          : "select-scroll-down-button"
      }
      data-direction={local.direction}
      data-side={local.direction === "up" ? "top" : "bottom"}
      data-visible=""
      aria-hidden="true"
      {...rest}
      class={own().class}
      // Base UI writes the arrow's position inline.
      style={{ ...own().style, position: "absolute" }}
      onPointerEnter={scroll}
      onPointerLeave={stop}
    >
      {local.direction === "up" ? (
        <IconPlaceholder
          lucide="ChevronUpIcon"
          tabler="IconChevronUp"
          hugeicons="ArrowUp01Icon"
          phosphor="CaretUpIcon"
          remixicon="RiArrowUpSLine"
        />
      ) : (
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          hugeicons="ArrowDown01Icon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
        />
      )}
    </div>
  )
}

function SelectSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  // Ark's select has no separator part: a rule between groups, as the others draw it.
  return (
    <div
      role="separator"
      data-slot="select-separator"
      {...rest}
      {...styleProps(local.class, menuSeparator, select.separator, local.sx)}
    />
  )
}

function SelectTrigger(props: {
  size?: "sm" | "default"
  /** A label's `for`: handed to the root, which writes it here as Zag's own. */
  id?: string
  asChild?: SelectTriggerProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["size", "id", "asChild", "class", "sx", "children"]
  )
  const setTriggerId = useContext(TriggerIdContext)
  createEffect(() => setTriggerId?.(local.id))
  return (
    <ArkSelectTrigger
      asChild={local.asChild}
      data-slot="select-trigger"
      data-size={local.size}
      {...rest}
      {...styleProps(local.class, select.trigger, select.triggerArk, local.sx)}
    >
      {local.children}
      <SelectIndicator
        asChild={(childProps) => (
          <IconPlaceholder
            {...childProps()}
            lucide="ChevronDownIcon"
            tabler="IconSelector"
            hugeicons="UnfoldMoreIcon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            {...styleProps(
              (childProps() as { class?: string }).class,
              select.triggerIcon
            )}
          />
        )}
      />
    </ArkSelectTrigger>
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
  const fallback = useContext(PlaceholderContext)
  const context = useSelectContext()
  // A value with no entry to name it (items read from the markup arrive after it): shown as the
  // value itself, as Base UI's select shows it without items.
  const unnamed = createMemo(
    () => !context().valueAsString && context().value.length > 0
  )
  // Ark prints its value's text unless given children, which pass on only when needed.
  const shown = () =>
    local.children
      ? local.children({
          value: context().value,
          items: context().selectedItems,
        })
      : unnamed()
        ? context().value.join(", ")
        : undefined
  return (
    <SelectValueText
      data-slot="select-value"
      placeholder={local.placeholder ?? fallback?.()}
      {...rest}
      {...styleProps(local.class, select.value, local.sx)}
    >
      {shown()}
    </SelectValueText>
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
export { createListCollection } from "@ark-ui/solid"
