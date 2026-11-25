import { createSignal, omit, untrack } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ContextMenu as Menu } from "@kirana-ui/solid/context-menu"
import { asRender } from "../../../lib/solid2/element"
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
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/** A popup's side, as Base UI names it: `inline-start` and `inline-end` follow the direction. */
type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"

/**
 * Kirana UI's context menu, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange` (given
 * `{ open }`). It renders no element; the rest (`disabled`, `loopFocus`, `modal`) goes to Kirana UI's
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
  const rest = omit(
    props,
    "onOpenChange",
    "children",
    "positioning",
    "sx",
    "class"
  )
  return (
    <Menu.Root
      {...rest}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
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
  // Ark names every item with `value`; Kirana UI's items need none.
  const rest = omit(
    props,
    "defaultChecked",
    "inset",
    "checked",
    "onCheckedChange",
    "closeOnSelect",
    "asChild",
    "class",
    "sx",
    "children",
    "value"
  )
  // The item's own state while the caller keeps none (`checked` is `null` then: a boolean would
  // read an absent one as `false`).
  const [own, setOwn] = createSignal(
    untrack(() => props.defaultChecked ?? false)
  )
  return (
    <Menu.CheckboxItem
      data-slot="context-menu-checkbox-item"
      closeOnClick={props.closeOnSelect ?? false}
      checked={props.checked ?? own()}
      onCheckedChange={(next) => (
        setOwn(next),
        props.onCheckedChange?.({ checked: next })
      )}
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        props.sx
      )}
      render={asRender(props.asChild)}
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
      {props.children}
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
  const rest = omit(
    props,
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "class",
    "sx",
    "children"
  )
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={props.side ?? "right"}
        sideOffset={props.sideOffset ?? 0}
        align={props.align ?? "start"}
        alignOffset={props.alignOffset ?? 4}
        {...styleProps(menuPositioner)}
      >
        <Menu.Popup
          data-slot="context-menu-content"
          {...rest}
          {...styleProps(
            props.class,
            popupMotion,
            menuSurface,
            contextMenu.content,
            props.sx
          )}
        >
          {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  // A radio item inside it still finds the radio group around it, as Base UI's does.
  return (
    <Menu.Group
      data-slot="context-menu-group"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
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
  // Ark names every item with `value`; Kirana UI's items need none.
  const rest = omit(
    props,
    "inset",
    "variant",
    "closeOnSelect",
    "asChild",
    "class",
    "sx",
    "children",
    "value"
  )
  return (
    <Menu.Item
      data-slot="context-menu-item"
      closeOnClick={props.closeOnSelect ?? true}
      data-inset={props.inset || undefined}
      data-variant={props.variant ?? "default"}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuRowPadding,
        props.variant === "destructive" && menuRowDestructive,
        props.sx
      )}
      render={asRender(props.asChild)}
    >
      {props.children}
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
  const rest = omit(props, "inset", "asChild", "class", "sx", "children")
  // The group's label: inside its group, as Base UI's label must be.
  return (
    <Menu.GroupLabel
      data-slot="context-menu-label"
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(props.class, menuLabel, menuLabelWeight, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Menu.GroupLabel>
  )
}

function ContextMenuPortal(props: {
  children?: JSX.Element
  sx?: Sx
  class?: string
}) {
  // Upstream's portal around the content. The content here draws its own portal, so this only
  // passes its children through, for markup written for both.
  return <>{props.children}</>
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
  const rest = omit(
    props,
    "value",
    "defaultValue",
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children"
  )
  // The group's own value while the caller keeps none. A radio item finds the group through any
  // group between them, as Base UI's does.
  const [own, setOwn] = createSignal<V | null>(() => props.defaultValue ?? null)
  return (
    <Menu.RadioGroup<V>
      data-slot="context-menu-radio-group"
      value={props.value ?? own()}
      onValueChange={(next) => (
        setOwn(() => next),
        props.onValueChange?.({ value: next })
      )}
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
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
  const rest = omit(
    props,
    "value",
    "inset",
    "closeOnSelect",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <Menu.RadioItem
      data-slot="context-menu-radio-item"
      closeOnClick={props.closeOnSelect ?? false}
      value={props.value}
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        contextMenu.checkableRow,
        props.sx
      )}
      render={asRender(props.asChild)}
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
      {props.children}
    </Menu.RadioItem>
  )
}

function ContextMenuSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <Menu.Separator
      data-slot="context-menu-separator"
      {...rest}
      {...styleProps(props.class, menuSeparator, props.sx)}
    />
  )
}

function ContextMenuShortcut(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <span
      data-slot="context-menu-shortcut"
      {...rest}
      {...styleProps(props.class, menuShortcut, props.sx)}
    >
      {props.children}
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
  const rest = omit(
    props,
    "onOpenChange",
    "children",
    "positioning",
    "sx",
    "class"
  )
  return (
    <Menu.SubmenuRoot
      {...rest}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
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
  const rest = omit(
    props,
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "class",
    "sx",
    "children"
  )
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={props.side ?? "right"}
        sideOffset={props.sideOffset ?? 0}
        align={props.align ?? "start"}
        alignOffset={props.alignOffset ?? 4}
        {...styleProps(menuPositioner)}
      >
        <Menu.Popup
          data-slot="context-menu-sub-content"
          {...rest}
          {...styleProps(
            props.class,
            popupMotion,
            menuSurface,
            contextMenu.content,
            contextMenu.subContent,
            props.sx
          )}
        >
          {props.children}
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
  const rest = omit(props, "inset", "asChild", "class", "sx", "children")
  return (
    <Menu.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuRowPadding,
        contextMenu.subTrigger,
        props.sx
      )}
      render={asRender(props.asChild)}
    >
      {props.children}
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
  const rest = omit(props, "class", "sx", "children")
  // A div, as Base UI's trigger: a region, not a button.
  return (
    <Menu.Trigger
      data-slot="context-menu-trigger"
      {...rest}
      {...styleProps(props.class, contextMenu.trigger, props.sx)}
    >
      {props.children}
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
