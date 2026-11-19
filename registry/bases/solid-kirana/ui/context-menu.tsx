import { createSignal, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ContextMenu as Menu } from "@kirana-ui/solid/context-menu"
import { asRender } from "../../../lib/solid/element"
import { IconPlaceholder } from "./icon-placeholder"
import {
  menuCheckableRowPadding,
  menuLabel,
  menuLabelWeight,
  menuPositioner,
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
  menuSeparator,
  menuShortcut,
  menuSurface,
} from "../../../styles/menu.styles"
import { contextMenu } from "../../../styles/context-menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/** A popup's side, as Base UI names it: `inline-start` and `inline-end` follow the direction. */
type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"

/**
 * Kirana UI's context menu, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange` (given
 * `{ open }`). It renders no element; the rest (`disabled`, `loop`, `modal`) goes to Kirana UI's
 * root. Closed, the popup leaves the page.
 */
function ContextMenu(props: {
  /**
   * Ark UI's own placement. Not read: the content's `side`, `align` and offsets place the popup,
   * as Base UI's do.
   */
  positioning?: Record<string, unknown>
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, , rest] = splitProps(
    props,
    ["onOpenChange", "children"],
    ["positioning", "sx", "class"]
  )
  return (
    <Menu.Root
      {...rest}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
    </Menu.Root>
  )
}

function ContextMenuCheckboxItem(props: {
  value?: string
  defaultChecked?: boolean
  inset?: boolean
  /** Controlled with `onCheckedChange`, or `defaultChecked` for an item that keeps its own, as Base UI's. */
  checked?: boolean | null
  /** Ark's change, as a details object: `{ checked }`. */
  onCheckedChange?: (details: { checked: boolean }) => void
  /** It stays open when chosen, as Base UI's does, unless `closeOnSelect`. */
  closeOnSelect?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, , rest] = splitProps(
    mergeProps(
      {
        defaultChecked: false,
        inset: false,
        checked: null,
        closeOnSelect: false,
      } as const,
      props
    ),
    [
      "defaultChecked",
      "inset",
      "checked",
      "onCheckedChange",
      "closeOnSelect",
      "asChild",
      "class",
      "sx",
      "children",
    ],
    // Ark names every item with `value`; Kirana UI's items need none.
    ["value"]
  )
  // The item's own state while the caller keeps none (`checked` is `null` then: a boolean would
  // read an absent one as `false`).
  const [own, setOwn] = createSignal(local.defaultChecked)
  return (
    <Menu.CheckboxItem
      data-slot="context-menu-checkbox-item"
      closeOnClick={local.closeOnSelect}
      checked={local.checked ?? own()}
      onCheckedChange={(next) => (
        setOwn(next),
        local.onCheckedChange?.({ checked: next })
      )}
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        local.sx
      )}
      render={asRender(local.asChild)}
    >
      <span sx={contextMenu.indicator}>
        <Menu.CheckboxItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </Menu.CheckboxItemIndicator>
      </span>
      {local.children}
    </Menu.CheckboxItem>
  )
}

function ContextMenuContent(props: {
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { side: "right", sideOffset: 0, align: "start", alignOffset: 4 } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        {...styleProps(menuPositioner)}
      >
        <Menu.Popup
          data-slot="context-menu-content"
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            contextMenu.content,
            local.sx
          )}
        >
          {local.children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function ContextMenuGroup(props: {
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
  // A radio item inside it still finds the radio group around it, as Base UI's does.
  return (
    <Menu.Group
      data-slot="context-menu-group"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Menu.Group>
  )
}

function ContextMenuItem(props: {
  value?: string
  inset?: boolean
  variant?: "default" | "destructive"
  /** Whether choosing it closes the menu, as Ark's `closeOnSelect`. */
  closeOnSelect?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, , rest] = splitProps(
    mergeProps(
      { inset: false, variant: "default", closeOnSelect: true } as const,
      props
    ),
    ["inset", "variant", "closeOnSelect", "asChild", "class", "sx", "children"],
    // Ark names every item with `value`; Kirana UI's items need none.
    ["value"]
  )
  return (
    <Menu.Item
      data-slot="context-menu-item"
      closeOnClick={local.closeOnSelect}
      data-inset={local.inset || undefined}
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuRowPadding,
        local.variant === "destructive" && menuRowDestructive,
        local.sx
      )}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Menu.Item>
  )
}

function ContextMenuLabel(props: {
  inset?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ inset: false } as const, props),
    ["inset", "asChild", "class", "sx", "children"]
  )
  // The group's label: inside its group, as Base UI's label must be.
  return (
    <Menu.GroupLabel
      data-slot="context-menu-label"
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(local.class, menuLabel, menuLabelWeight, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Menu.GroupLabel>
  )
}

function ContextMenuPortal(props: {
  children?: JSX.Element
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["children", "sx", "class"])
  // Upstream's portal around the content. The content here draws its own portal, so this only
  // passes its children through, for markup written for both.
  return <>{local.children}</>
}

function ContextMenuRadioGroup<V extends string = string>(props: {
  value?: V
  defaultValue?: V
  /** Ark's change, as a details object: `{ value }`. */
  onValueChange?: (details: { value: V }) => void
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // The group's own value while the caller keeps none. A radio item finds the group through any
  // group between them, as Base UI's does.
  const [own, setOwn] = createSignal<V | null>(local.defaultValue ?? null)
  return (
    <Menu.RadioGroup<V>
      data-slot="context-menu-radio-group"
      value={local.value ?? own()}
      onValueChange={(next) => (
        setOwn(() => next),
        local.onValueChange?.({ value: next })
      )}
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Menu.RadioGroup>
  )
}

function ContextMenuRadioItem(props: {
  value: string
  inset?: boolean
  /** It stays open when chosen, as Base UI's does, unless `closeOnSelect`. */
  closeOnSelect?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ inset: false, closeOnSelect: false } as const, props),
    ["value", "inset", "closeOnSelect", "asChild", "class", "sx", "children"]
  )
  return (
    <Menu.RadioItem
      data-slot="context-menu-radio-item"
      closeOnClick={local.closeOnSelect}
      value={local.value}
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        local.sx
      )}
      render={asRender(local.asChild)}
    >
      <span sx={contextMenu.indicator}>
        <Menu.RadioItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </Menu.RadioItemIndicator>
      </span>
      {local.children}
    </Menu.RadioItem>
  )
}

function ContextMenuSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <Menu.Separator
      data-slot="context-menu-separator"
      {...rest}
      {...styleProps(local.class, menuSeparator, local.sx)}
    />
  )
}

function ContextMenuShortcut(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="context-menu-shortcut"
      {...rest}
      {...styleProps(local.class, menuShortcut, local.sx)}
    >
      {local.children}
    </span>
  )
}

/**
 * A submenu, a menu inside the menu (its trigger an item of the outer one), taking the Ark UI
 * parts' props as `ContextMenu` does. It renders no element.
 */
function ContextMenuSub(props: {
  /**
   * Ark UI's own placement. Not read: the content's `side`, `align` and offsets place the popup,
   * as Base UI's do.
   */
  positioning?: Record<string, unknown>
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, , rest] = splitProps(
    props,
    ["onOpenChange", "children"],
    ["positioning", "sx", "class"]
  )
  return (
    <Menu.SubmenuRoot
      {...rest}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
    </Menu.SubmenuRoot>
  )
}

function ContextMenuSubContent(props: {
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { side: "right", sideOffset: 0, align: "start", alignOffset: 4 } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        {...styleProps(menuPositioner)}
      >
        <Menu.Popup
          data-slot="context-menu-sub-content"
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            contextMenu.content,
            contextMenu.subContent,
            local.sx
          )}
        >
          {local.children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function ContextMenuSubTrigger(props: {
  inset?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ inset: false } as const, props),
    ["inset", "asChild", "class", "sx", "children"]
  )
  return (
    <Menu.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuRowPadding,
        contextMenu.subTrigger,
        local.sx
      )}
      render={asRender(local.asChild)}
    >
      {local.children}
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        {...styleProps(contextMenu.subTriggerIcon)}
      />
    </Menu.SubmenuTrigger>
  )
}

function ContextMenuTrigger(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  // A div, as Base UI's trigger: a region, not a button.
  return (
    <Menu.Trigger
      data-slot="context-menu-trigger"
      {...rest}
      {...styleProps(local.class, contextMenu.trigger, local.sx)}
    >
      {local.children}
    </Menu.Trigger>
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ContextMenuPortal,
}
