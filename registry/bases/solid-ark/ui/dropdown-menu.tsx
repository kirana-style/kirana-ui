import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  useLocaleContext,
} from "@ark-ui/solid"
import { positioning as place } from "../../../lib/placement"
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
import { Portal } from "solid-js/web"
import { dropdownMenu } from "../../../styles/dropdown-menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  MenuCheckboxItemProps,
  MenuItemGroupLabelProps,
  MenuItemGroupProps,
  MenuItemProps,
  MenuRadioItemGroupProps,
  MenuRadioItemProps,
  MenuRootProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
} from "@ark-ui/solid"
import type { PlacementProps } from "../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
const PlacementContext = createContext<(placement: PlacementProps) => void>()

function DropdownMenu(props: {
  /** Ark's own placement, over what the content asks for. */
  positioning?: MenuRootProps["positioning"]
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, [
    "positioning",
    "children",
    "sx",
    "class",
  ])
  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const [placement, setPlacement] = createSignal<PlacementProps>({})
  const locale = useLocaleContext()
  const resolved = createMemo(() => ({
    ...place(placement(), { rtl: locale?.()?.dir === "rtl" }),
    ...local.positioning,
  }))
  return (
    <PlacementContext.Provider value={setPlacement}>
      <MenuRoot lazyMount unmountOnExit positioning={resolved()} {...rest}>
        {local.children}
      </MenuRoot>
    </PlacementContext.Provider>
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
  asChild?: MenuCheckboxItemProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { defaultChecked: false, inset: false, checked: null } as const,
      props
    ),
    [
      "value",
      "defaultChecked",
      "inset",
      "checked",
      "onCheckedChange",
      "asChild",
      "class",
      "sx",
      "children",
    ]
  )
  // The item's own state while the caller keeps none (`checked` is `null` then: a boolean would
  // read an absent one as `false`).
  const [own, setOwn] = createSignal(local.defaultChecked)
  // Ark names every item with `value`, which its select events report; one without it gets its own.
  const id = createUniqueId()
  return (
    <MenuCheckboxItem
      asChild={local.asChild}
      data-slot="dropdown-menu-checkbox-item"
      closeOnSelect={false}
      value={local.value ?? id}
      checked={local.checked ?? own()}
      onCheckedChange={(next: boolean) => (
        setOwn(next),
        local.onCheckedChange?.({ checked: next })
      )}
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        local.sx
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
      {local.children}
    </MenuCheckboxItem>
  )
}

function DropdownMenuContent(props: {
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
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
      {
        side: "bottom",
        sideOffset: 4,
        align: "start",
        alignOffset: 0,
      } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  // Base UI's placement, which the root places the popup with.

  const setPlacement = useContext(PlacementContext)
  createEffect(() => {
    setPlacement?.({
      side: local.side,
      sideOffset: local.sideOffset,
      align: local.align,
      alignOffset: local.alignOffset,
    })
  })
  return (
    <Portal>
      <MenuPositioner {...styleProps(menuPositioner)}>
        <MenuContent
          data-slot="dropdown-menu-content"
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            dropdownMenu.content,
            local.sx
          )}
        >
          {local.children}
        </MenuContent>
      </MenuPositioner>
    </Portal>
  )
}

function DropdownMenuGroup(props: {
  asChild?: MenuItemGroupProps["asChild"]
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
    <MenuItemGroup
      asChild={local.asChild}
      data-slot="dropdown-menu-group"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </MenuItemGroup>
  )
}

function DropdownMenuItem(props: {
  value?: string
  inset?: boolean
  variant?: "default" | "destructive"
  asChild?: MenuItemProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ inset: false, variant: "default" } as const, props),
    ["value", "inset", "variant", "asChild", "class", "sx", "children"]
  )
  // Ark names every item with `value`, which its select events report; one without it gets its own.

  const id = createUniqueId()
  return (
    <MenuItem
      asChild={local.asChild}
      data-slot="dropdown-menu-item"
      value={local.value ?? id}
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
    >
      {local.children}
    </MenuItem>
  )
}

function DropdownMenuLabel(props: {
  inset?: boolean
  asChild?: MenuItemGroupLabelProps["asChild"]
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
    <MenuItemGroupLabel
      asChild={local.asChild}
      data-slot="dropdown-menu-label"
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(local.class, menuLabel, menuLabelWeight, local.sx)}
    >
      {local.children}
    </MenuItemGroupLabel>
  )
}

function DropdownMenuPortal(props: {
  children?: JSX.Element
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["children", "sx", "class"])
  // Upstream's portal around the content. The content here teleports itself to `<body>`, so this only
  // passes its children through, for markup written for both.
  return <>{local.children}</>
}

function DropdownMenuRadioGroup(props: {
  asChild?: MenuRadioItemGroupProps["asChild"]
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
    <MenuRadioItemGroup
      asChild={local.asChild}
      data-slot="dropdown-menu-radio-group"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </MenuRadioItemGroup>
  )
}

function DropdownMenuRadioItem(props: {
  value: string
  inset?: boolean
  asChild?: MenuRadioItemProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ inset: false } as const, props),
    ["value", "inset", "asChild", "class", "sx", "children"]
  )
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <MenuRadioItem
      asChild={local.asChild}
      data-slot="dropdown-menu-radio-item"
      closeOnSelect={false}
      value={local.value}
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuCheckableRowPadding,
        local.sx
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
      {local.children}
    </MenuRadioItem>
  )
}

function DropdownMenuSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <MenuSeparator
      asChild={(childProps) => (
        <div
          {...childProps()}
          data-slot="dropdown-menu-separator"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            menuSeparator,
            local.sx
          )}
        />
      )}
    />
  )
}

function DropdownMenuShortcut(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      {...rest}
      {...styleProps(local.class, menuShortcut, local.sx)}
    >
      {local.children}
    </span>
  )
}

function DropdownMenuSub(props: {
  /** Ark's own placement, over what the content asks for. */
  positioning?: MenuRootProps["positioning"]
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, [
    "positioning",
    "children",
    "sx",
    "class",
  ])
  // A submenu is a menu inside the menu: its trigger is an item of the outer one.

  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const [placement, setPlacement] = createSignal<PlacementProps>({})
  const locale = useLocaleContext()
  const resolved = createMemo(() => ({
    ...place(placement(), { rtl: locale?.()?.dir === "rtl" }),
    ...local.positioning,
  }))
  return (
    <PlacementContext.Provider value={setPlacement}>
      <MenuRoot lazyMount unmountOnExit positioning={resolved()} {...rest}>
        {local.children}
      </MenuRoot>
    </PlacementContext.Provider>
  )
}

function DropdownMenuSubContent(props: {
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
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
      {
        side: "inline-end",
        sideOffset: 0,
        align: "start",
        alignOffset: -3,
      } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  // Base UI's placement, which the root places the popup with.

  const setPlacement = useContext(PlacementContext)
  createEffect(() => {
    setPlacement?.({
      side: local.side,
      sideOffset: local.sideOffset,
      align: local.align,
      alignOffset: local.alignOffset,
    })
  })
  return (
    <Portal>
      <MenuPositioner {...styleProps(menuPositioner)}>
        <MenuContent
          data-slot="dropdown-menu-sub-content"
          {...rest}
          {...styleProps(
            local.class,
            popupMotion,
            menuSurface,
            dropdownMenu.subContent,
            local.sx
          )}
        >
          {local.children}
        </MenuContent>
      </MenuPositioner>
    </Portal>
  )
}

function DropdownMenuSubTrigger(props: {
  inset?: boolean
  asChild?: MenuTriggerItemProps["asChild"]
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
    <MenuTriggerItem
      asChild={local.asChild}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={local.inset || undefined}
      {...rest}
      {...styleProps(
        local.class,
        menuRowBase,
        menuRowPadding,
        dropdownMenu.subTrigger,
        local.sx
      )}
    >
      {local.children}
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        {...styleProps(dropdownMenu.subTriggerIcon)}
      />
    </MenuTriggerItem>
  )
}

function DropdownMenuTrigger(props: {
  asChild?: MenuTriggerProps["asChild"]
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
    <MenuTrigger
      asChild={local.asChild}
      data-slot="dropdown-menu-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </MenuTrigger>
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
