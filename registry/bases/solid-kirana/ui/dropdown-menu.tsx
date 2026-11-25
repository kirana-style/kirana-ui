import { createSignal, omit, untrack } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Menu } from "@kirana-ui/solid/menu"
import { asRender } from "../../../lib/solid2/element"
import { IconPlaceholder } from "./icon-placeholder"
import {
  menuCheckableRowPadding,
  menuIndicator,
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
import { dropdownMenu } from "../../../styles/dropdown-menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/** A popup's side, as Base UI names it: `inline-start` and `inline-end` follow the direction. */
type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"

/**
 * Kirana UI's menu, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange` (given
 * `{ open }`). It renders no element; the rest (`disabled`, `loopFocus`, `modal`) goes to Kirana UI's
 * root. Closed, the popup leaves the page.
 */
function DropdownMenu(props: {
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

function DropdownMenuCheckboxItem(props: {
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
      data-slot="dropdown-menu-checkbox-item"
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
        props.sx
      )}
      render={asRender(props.asChild)}
    >
      <span
        data-slot="dropdown-menu-checkbox-item-indicator"
        sx={menuIndicator}
      >
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

function DropdownMenuContent(props: {
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
        side={props.side ?? "bottom"}
        sideOffset={props.sideOffset ?? 4}
        align={props.align ?? "start"}
        alignOffset={props.alignOffset ?? 0}
        {...styleProps(menuPositioner)}
      >
        <Menu.Popup
          data-slot="dropdown-menu-content"
          {...rest}
          {...styleProps(
            props.class,
            popupMotion,
            menuSurface,
            dropdownMenu.content,
            props.sx
          )}
        >
          {props.children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuGroup(props: {
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
      data-slot="dropdown-menu-group"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Menu.Group>
  )
}

function DropdownMenuItem(props: {
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
      data-slot="dropdown-menu-item"
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

function DropdownMenuLabel(props: {
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
      data-slot="dropdown-menu-label"
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(props.class, menuLabel, menuLabelWeight, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Menu.GroupLabel>
  )
}

function DropdownMenuPortal(props: {
  children?: JSX.Element
  sx?: Sx
  class?: string
}) {
  // Upstream's portal around the content. The content here draws its own portal, so this only
  // passes its children through, for markup written for both.
  return <>{props.children}</>
}

function DropdownMenuRadioGroup<V extends string = string>(props: {
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
      data-slot="dropdown-menu-radio-group"
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

function DropdownMenuRadioItem(props: {
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
      data-slot="dropdown-menu-radio-item"
      closeOnClick={props.closeOnSelect ?? false}
      value={props.value}
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        props.sx
      )}
      render={asRender(props.asChild)}
    >
      <span data-slot="dropdown-menu-radio-item-indicator" sx={menuIndicator}>
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

function DropdownMenuSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <Menu.Separator
      data-slot="dropdown-menu-separator"
      {...rest}
      {...styleProps(props.class, menuSeparator, props.sx)}
    />
  )
}

function DropdownMenuShortcut(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      {...rest}
      {...styleProps(props.class, menuShortcut, props.sx)}
    >
      {props.children}
    </span>
  )
}

/**
 * A submenu, a menu inside the menu (its trigger an item of the outer one), taking the Ark UI
 * parts' props as `DropdownMenu` does. It renders no element.
 */
function DropdownMenuSub(props: {
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

function DropdownMenuSubContent(props: {
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
  // The content's look under the submenu's own, as Base UI's submenu is a `DropdownMenuContent`.
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={props.side ?? "inline-end"}
        sideOffset={props.sideOffset ?? 0}
        align={props.align ?? "start"}
        alignOffset={props.alignOffset ?? -3}
        {...styleProps(menuPositioner)}
      >
        <Menu.Popup
          data-slot="dropdown-menu-sub-content"
          {...rest}
          {...styleProps(
            props.class,
            popupMotion,
            menuSurface,
            dropdownMenu.content,
            dropdownMenu.subContent,
            props.sx
          )}
        >
          {props.children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuSubTrigger(props: {
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
      data-slot="dropdown-menu-sub-trigger"
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuRowPadding,
        dropdownMenu.subTrigger,
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
        {...styleProps(dropdownMenu.subTriggerIcon)}
      />
    </Menu.SubmenuTrigger>
  )
}

function DropdownMenuTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  // `type="button"`: a trigger in a form opens the menu and submits nothing.
  return (
    <Menu.Trigger
      type="button"
      data-slot="dropdown-menu-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Menu.Trigger>
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuPortal,
}
