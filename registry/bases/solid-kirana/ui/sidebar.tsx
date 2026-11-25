import {
  Show,
  createContext,
  createMemo,
  createSignal,
  omit,
  onSettled,
  untrack,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { sidebar } from "../../../styles/sidebar.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Skeleton } from "./skeleton"
import { useIsMobile } from "../../../lib/solid2/use-mobile"
import { Separator } from "./separator"
import { IconPlaceholder } from "./icon-placeholder"
import { Button } from "./button"
import { Primitive } from "@kirana-ui/solid/primitive"
import { asRender } from "../../../lib/solid2/element"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

function Sidebar(props: {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  dir?: "ltr" | "rtl"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "side",
    "variant",
    "collapsible",
    "dir",
    "class",
    "sx",
    "children"
  )
  const ctx = useSidebar()
  const side = () => props.side ?? "left"
  const variant = () => props.variant ?? "sidebar"
  const collapsible = () => props.collapsible ?? "offcanvas"
  const padded = () => variant() === "floating" || variant() === "inset"
  return (
    <>
      {collapsible() === "none" ? (
        <div
          data-slot="sidebar"
          {...rest}
          {...styleProps(props.class, sidebar.static, props.sx)}
        >
          {props.children}
        </div>
      ) : (
        <>
          {ctx.isMobile ? (
            <Sheet
              open={ctx.openMobile}
              {...rest}
              onOpenChange={(details: { open: boolean }) =>
                ctx.setOpenMobile(details.open)
              }
            >
              <SheetContent
                dir={props.dir}
                data-sidebar="sidebar"
                data-slot="sidebar"
                data-mobile="true"
                sx={sidebar.mobile}
                side={side()}
                showCloseButton={false}
              >
                <SheetHeader sx={visuallyHidden}>
                  <SheetTitle>Sidebar</SheetTitle>
                  <SheetDescription>
                    Displays the mobile sidebar.
                  </SheetDescription>
                </SheetHeader>
                <div sx={sidebar.mobileInner}>{props.children}</div>
              </SheetContent>
            </Sheet>
          ) : (
            <div
              data-state={ctx.state}
              data-collapsible={ctx.state === "collapsed" ? collapsible() : ""}
              data-variant={variant()}
              data-side={side()}
              data-slot="sidebar"
              sx={sidebar.root}
            >
              <div
                data-slot="sidebar-gap"
                sx={[sidebar.gap, padded() && sidebar.gapPadded]}
              />
              <div
                data-slot="sidebar-container"
                data-side={side()}
                dir={props.dir}
                {...rest}
                {...styleProps(
                  props.class,
                  sidebar.container,
                  padded() && sidebar.containerPadded,
                  props.sx
                )}
              >
                <div
                  data-sidebar="sidebar"
                  data-slot="sidebar-inner"
                  sx={sidebar.inner}
                >
                  {props.children}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

function SidebarContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      {...rest}
      {...styleProps(props.class, sidebar.content, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SidebarFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      {...rest}
      {...styleProps(props.class, sidebar.footer, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SidebarGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      {...rest}
      {...styleProps(props.class, sidebar.group, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SidebarGroupAction(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <Primitive
      as="button"
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      {...rest}
      {...styleProps(props.class, sidebar.groupAction, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Primitive>
  )
}

function SidebarGroupContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      {...rest}
      {...styleProps(props.class, sidebar.groupContent, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SidebarGroupLabel(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <Primitive
      as="div"
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      {...rest}
      {...styleProps(props.class, sidebar.groupLabel, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Primitive>
  )
}

function SidebarHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      {...rest}
      {...styleProps(props.class, sidebar.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SidebarInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      {...rest}
      class={props.class}
      sx={[sidebar.input, props.sx]}
    />
  )
}

function SidebarInset(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <main
      data-slot="sidebar-inset"
      {...rest}
      {...styleProps(props.class, sidebar.inset, props.sx)}
    >
      {props.children}
    </main>
  )
}

function SidebarMenu(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      {...rest}
      {...styleProps(props.class, sidebar.menu, props.sx)}
    >
      {props.children}
    </ul>
  )
}

function SidebarMenuAction(props: {
  showOnHover?: boolean
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "showOnHover", "class", "sx", "children")
  return (
    <Primitive
      as="button"
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      {...rest}
      {...styleProps(
        props.class,
        sidebar.menuAction,
        props.showOnHover && sidebar.menuActionOnHover,
        props.sx
      )}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Primitive>
  )
}

function SidebarMenuBadge(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      {...rest}
      {...styleProps(props.class, sidebar.menuBadge, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SidebarMenuButton(props: {
  isActive?: boolean
  /** A label shown beside the button while the sidebar is collapsed to its icons. */
  tooltip?: string | { children: string; hidden?: boolean }
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  /** Ark UI's `asChild`, as every Solid base takes it: the element given takes the button's props. */
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "asChild",
    "isActive",
    "variant",
    "size",
    "tooltip",
    "class",
    "sx",
    "children"
  )
  const ctx = useSidebar()
  const size = () => props.size ?? "default"

  const label = createMemo(() =>
    typeof props.tooltip === "string"
      ? { children: props.tooltip }
      : props.tooltip
  )

  const VARIANTS = { default: null, outline: sidebar.menuButtonOutline }
  const SIZES = {
    default: sidebar.menuButtonDefault,
    sm: sidebar.menuButtonSm,
    lg: sidebar.menuButtonLg,
  }
  return (
    <>
      {label() ? (
        <Tooltip
          disabled={
            ctx.state !== "collapsed" || ctx.isMobile || label()!.hidden
          }
        >
          <TooltipTrigger
            asChild={(childProps) => (
              <Primitive
                as="button"
                {...childProps()}
                data-slot="sidebar-menu-button"
                data-sidebar="menu-button"
                data-size={size()}
                data-active={props.isActive ? "" : undefined}
                {...rest}
                {...styleProps(
                  childProps().class,
                  props.class,
                  sidebar.menuButton,
                  VARIANTS[props.variant ?? "default"],
                  SIZES[size()],
                  props.sx
                )}
                render={asRender(props.asChild)}
              >
                {props.children}
              </Primitive>
            )}
          />
          <TooltipContent side="right" align="center">
            {label()!.children}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Primitive
          as="button"
          data-slot="sidebar-menu-button"
          data-sidebar="menu-button"
          data-size={size()}
          data-active={props.isActive ? "" : undefined}
          {...rest}
          {...styleProps(
            props.class,
            sidebar.menuButton,
            VARIANTS[props.variant ?? "default"],
            SIZES[size()],
            props.sx
          )}
          render={asRender(props.asChild)}
        >
          {props.children}
        </Primitive>
      )}
    </>
  )
}

function SidebarMenuItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      {...rest}
      {...styleProps(props.class, sidebar.menuItem, props.sx)}
    >
      {props.children}
    </li>
  )
}

function SidebarMenuSkeleton(props: {
  showIcon?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "showIcon", "class", "sx")
  // A width between 50 and 90%, so a list of them reads as text.
  const width = `${Math.floor(Math.random() * 40) + 50}%`
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...rest}
      {...styleProps(props.class, sidebar.menuSkeleton, props.sx)}
    >
      <Show when={props.showIcon}>
        <Skeleton
          data-sidebar="menu-skeleton-icon"
          sx={sidebar.menuSkeletonIcon}
        />
      </Show>
      <Skeleton
        data-sidebar="menu-skeleton-text"
        sx={sidebar.menuSkeletonText}
        style={`max-width: ${width}`}
      />
    </div>
  )
}

function SidebarMenuSub(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...rest}
      {...styleProps(props.class, sidebar.menuSub, props.sx)}
    >
      {props.children}
    </ul>
  )
}

function SidebarMenuSubButton(props: {
  size?: "sm" | "md"
  isActive?: boolean
  asChild?: AsChild<"a">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "asChild",
    "size",
    "isActive",
    "class",
    "sx",
    "children"
  )
  return (
    <Primitive
      as="a"
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={props.size ?? "md"}
      data-active={props.isActive ? "" : undefined}
      {...rest}
      {...styleProps(props.class, sidebar.menuSubButton, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </Primitive>
  )
}

function SidebarMenuSubItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...rest}
      {...styleProps(props.class, sidebar.menuSubItem, props.sx)}
    >
      {props.children}
    </li>
  )
}

/** What a SidebarProvider hands its parts, as React's context does: getters, so they follow it. */
type SidebarContextValue = {
  readonly state: "expanded" | "collapsed"
  readonly open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  readonly openMobile: boolean
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void
  readonly isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue>()

function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.")
  return context
}

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

function SidebarProvider(props: {
  defaultOpen?: boolean
  /** The caller's state, in place of the sidebar's own, with `onOpenChange`. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "defaultOpen",
    "open",
    "onOpenChange",
    "class",
    "sx",
    "children"
  )
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobileState] = createSignal(false)
  // The sidebar's own state, unless the caller controls it.
  const [own, setOwn] = createSignal(untrack(() => props.defaultOpen ?? true))
  const open = () => props.open ?? own()

  function setOpen(value: boolean | ((value: boolean) => boolean)) {
    const openState = typeof value === "function" ? value(open()) : value
    if (props.open !== undefined) props.onOpenChange?.(openState)
    else setOwn(openState)
    // Kept in a cookie, so the next page load starts in the same state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }
  function setOpenMobile(value: boolean | ((value: boolean) => boolean)) {
    setOpenMobileState(
      typeof value === "function" ? value(openMobile()) : value
    )
  }
  const toggleSidebar = () =>
    isMobile.current
      ? setOpenMobile((current) => !current)
      : setOpen((current) => !current)

  // ⌘B or Ctrl+B toggles the sidebar.
  onSettled(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", onKeydown)
    return () => window.removeEventListener("keydown", onKeydown)
  })

  const context: SidebarContextValue = {
    // `data-state="expanded"` or `"collapsed"` on the sidebar, which its parts read.
    get state() {
      return open() ? "expanded" : "collapsed"
    },
    get open() {
      return open()
    },
    setOpen,
    get openMobile() {
      return openMobile()
    },
    setOpenMobile,
    get isMobile() {
      return isMobile.current
    },
    toggleSidebar,
  }

  return (
    <SidebarContext value={context}>
      <div
        data-slot="sidebar-wrapper"
        {...rest}
        {...styleProps(props.class, sidebar.wrapper, props.sx)}
      >
        {props.children}
      </div>
    </SidebarContext>
  )
}

function SidebarRail(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  const ctx = useSidebar()
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabindex="-1"
      title="Toggle Sidebar"
      {...rest}
      {...styleProps(props.class, sidebar.rail, props.sx)}
      onClick={ctx.toggleSidebar}
    />
  )
}

function SidebarSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      {...rest}
      class={props.class}
      sx={[sidebar.separator, props.sx]}
    />
  )
}

function SidebarTrigger(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  const ctx = useSidebar()
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      onClick={ctx.toggleSidebar}
      {...rest}
      class={props.class}
      sx={[props.sx]}
    >
      <IconPlaceholder
        lucide="PanelLeftIcon"
        tabler="IconLayoutSidebar"
        hugeicons="SidebarLeftIcon"
        phosphor="SidebarIcon"
        remixicon="RiSideBarLine"
      />
      <span sx={visuallyHidden}>Toggle Sidebar</span>
    </Button>
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
