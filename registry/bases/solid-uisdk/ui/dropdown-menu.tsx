import { createUniqueId, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@ui-sdk/solid/menu"
import { IconPlaceholder } from "./icon-placeholder"
import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
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

type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"

/**
 * Where the popup renders: the document's body, as Base UI's portal puts it, so it inherits the
 * page's text styles rather than its trigger's surroundings'. ui-sdk renders it in place otherwise.
 * Nothing on the server, where no popup is open.
 */
const popupContainer = () =>
  typeof document === "undefined" ? undefined : document.body

/** A Base UI side as ui-sdk's: `inline-start` and `inline-end` are its `start` and `end`. */
const sideOf = (side: Side) =>
  side === "inline-start" ? "start" : side === "inline-end" ? "end" : side

/**
 * ui-sdk's menu, as the dropdown menu's root. It renders no element: `open`, `defaultOpen` and the
 * rest go to ui-sdk's root, and `onOpenChange` is called with `{ open }`, as the Ark UI part's.
 */
function DropdownMenu(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const rest = omit(props, "onOpenChange", "children", "sx", "class")
  return (
    <Menu
      container={popupContainer()}
      {...rest}
      onOpenChange={(open: boolean) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </Menu>
  )
}

function DropdownMenuCheckboxItem(props: {
  value?: string
  defaultChecked?: boolean
  inset?: boolean
  /** Controlled with `onCheckedChange`, or `defaultChecked` for an item that keeps its own, as Base UI's. */
  checked?: boolean | null
  /** Called with `{ checked }`, as the Ark UI part's. */
  onCheckedChange?: (details: { checked: boolean }) => void
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "value",
    "defaultChecked",
    "inset",
    "checked",
    "onCheckedChange",
    "asChild",
    "class",
    "sx",
    "children"
  )
  // ui-sdk names every checkbox item with `value`; one without it gets its own.
  const id = createUniqueId()
  return (
    <UisdkPart
      part={MenuCheckboxItem}
      slotName="dropdown-menu-checkbox-item"
      tag="div"
      asChild={props.asChild}
      closeOnSelect={false}
      value={props.value ?? id}
      // `null`, an item that keeps its own state.
      checked={props.checked ?? undefined}
      defaultChecked={props.defaultChecked ?? false}
      onCheckedChange={(checked: boolean) =>
        props.onCheckedChange?.({ checked })
      }
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        props.sx
      )}
    >
      <span
        data-slot="dropdown-menu-checkbox-item-indicator"
        sx={menuIndicator}
      >
        <MenuItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MenuItemIndicator>
      </span>
      {props.children}
    </UisdkPart>
  )
}

/** The menu's popup. ui-sdk's content places itself: the positioner's styles join its own. */
function DropdownMenuContent(props: {
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
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
    <UisdkPart
      part={MenuContent}
      slotName="dropdown-menu-content"
      tag="div"
      side={sideOf(props.side ?? "bottom")}
      sideOffset={props.sideOffset ?? 4}
      align={props.align ?? "start"}
      alignOffset={props.alignOffset ?? 0}
      {...rest}
      {...styleProps(
        props.class,
        menuPositioner,
        popupMotion,
        menuSurface,
        dropdownMenu.content,
        props.sx
      )}
    >
      {props.children}
    </UisdkPart>
  )
}

/** A group: radio items read their radio group through it, as Base UI's do. */
function DropdownMenuGroup(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={MenuGroup}
      slotName="dropdown-menu-group"
      tag="div"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function DropdownMenuItem(props: {
  value?: string
  inset?: boolean
  variant?: "default" | "destructive"
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "value",
    "inset",
    "variant",
    "asChild",
    "class",
    "sx",
    "children"
  )
  // ui-sdk names an item with `value`, which the menu's `onAction` reports; one without it gets its own.
  const id = createUniqueId()
  const variant = () => props.variant ?? "default"
  return (
    <UisdkPart
      part={MenuItem}
      slotName="dropdown-menu-item"
      tag="div"
      asChild={props.asChild}
      value={props.value ?? id}
      data-inset={props.inset || undefined}
      data-variant={variant()}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuRowPadding,
        variant() === "destructive" && menuRowDestructive,
        props.sx
      )}
    >
      {props.children}
    </UisdkPart>
  )
}

function DropdownMenuLabel(props: {
  inset?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "inset", "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={MenuGroupLabel}
      slotName="dropdown-menu-label"
      tag="div"
      asChild={props.asChild}
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(props.class, menuLabel, menuLabelWeight, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function DropdownMenuPortal(props: {
  children?: JSX.Element
  sx?: Sx
  class?: string
}) {
  // Base UI's portal, which ui-sdk's content does itself (the root's `container`): its children,
  // for markup written for both.
  return <>{props.children}</>
}

/** ui-sdk's radio group, called with `{ value }` as the Ark UI part's. */
function DropdownMenuRadioGroup<V extends string = string>(props: {
  value?: V
  defaultValue?: V
  // The caller's own values (`"top" | "bottom"`), which its handler is typed for.
  onValueChange?: (details: { value: V }) => void
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <UisdkPart
      part={MenuRadioGroup}
      slotName="dropdown-menu-radio-group"
      tag="div"
      asChild={props.asChild}
      {...rest}
      onValueChange={(value: V) => props.onValueChange?.({ value })}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function DropdownMenuRadioItem(props: {
  value: string
  inset?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "value",
    "inset",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <UisdkPart
      part={MenuRadioItem}
      slotName="dropdown-menu-radio-item"
      tag="div"
      asChild={props.asChild}
      closeOnSelect={false}
      value={props.value}
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuCheckableRowPadding,
        props.sx
      )}
    >
      <span data-slot="dropdown-menu-radio-item-indicator" sx={menuIndicator}>
        <MenuItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MenuItemIndicator>
      </span>
      {props.children}
    </UisdkPart>
  )
}

function DropdownMenuSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={MenuSeparator}
      slotName="dropdown-menu-separator"
      tag="div"
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
 * A submenu, inside the menu's content: its trigger is an item of the outer menu. It renders no
 * element; `onOpenChange` is called with `{ open }`, as the Ark UI part's.
 */
function DropdownMenuSub(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const rest = omit(props, "onOpenChange", "children", "sx", "class")
  return (
    <MenuSub
      {...rest}
      onOpenChange={(open: boolean) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </MenuSub>
  )
}

/** A submenu's popup: ui-sdk's own part for it, placed beside its trigger. */
function DropdownMenuSubContent(props: {
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
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
    <UisdkPart
      part={MenuSubContent}
      slotName="dropdown-menu-sub-content"
      tag="div"
      side={sideOf(props.side ?? "inline-end")}
      sideOffset={props.sideOffset ?? 0}
      align={props.align ?? "start"}
      alignOffset={props.alignOffset ?? -3}
      {...rest}
      {...styleProps(
        props.class,
        menuPositioner,
        popupMotion,
        menuSurface,
        dropdownMenu.subContent,
        props.sx
      )}
    >
      {props.children}
    </UisdkPart>
  )
}

function DropdownMenuSubTrigger(props: {
  inset?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "inset", "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={MenuSubTrigger}
      slotName="dropdown-menu-sub-trigger"
      tag="div"
      asChild={props.asChild}
      data-inset={props.inset || undefined}
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuRowPadding,
        dropdownMenu.subTrigger,
        props.sx
      )}
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
    </UisdkPart>
  )
}

function DropdownMenuTrigger(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={MenuTrigger}
      slotName="dropdown-menu-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
