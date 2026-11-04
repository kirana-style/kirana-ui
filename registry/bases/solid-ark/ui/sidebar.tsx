import {
  Show,
  createContext,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
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
import { ark } from "@ark-ui/solid"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Skeleton } from "./skeleton"
import { useIsMobile } from "../../../lib/solid/use-mobile"
import { Separator } from "./separator"
import { IconPlaceholder } from "./icon-placeholder"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

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
  const [local, rest] = splitProps(
    mergeProps(
      { side: "left", variant: "sidebar", collapsible: "offcanvas" } as const,
      props
    ),
    ["side", "variant", "collapsible", "dir", "class", "sx", "children"]
  )
  const ctx = useSidebar()
  return (
    <>
      {local.collapsible === "none" ? (
        <div
          data-slot="sidebar"
          {...rest}
          {...styleProps(local.class, sidebar.static, local.sx)}
        >
          {local.children}
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
                dir={local.dir}
                data-sidebar="sidebar"
                data-slot="sidebar"
                data-mobile="true"
                sx={sidebar.mobile}
                side={local.side}
                showCloseButton={false}
              >
                <SheetHeader sx={visuallyHidden}>
                  <SheetTitle>Sidebar</SheetTitle>
                  <SheetDescription>
                    Displays the mobile sidebar.
                  </SheetDescription>
                </SheetHeader>
                <div sx={sidebar.mobileInner}>{local.children}</div>
              </SheetContent>
            </Sheet>
          ) : (
            <div
              data-state={ctx.state}
              data-collapsible={
                ctx.state === "collapsed" ? local.collapsible : ""
              }
              data-variant={local.variant}
              data-side={local.side}
              data-slot="sidebar"
              sx={sidebar.root}
            >
              <div
                data-slot="sidebar-gap"
                sx={[
                  sidebar.gap,
                  (local.variant === "floating" || local.variant === "inset") &&
                    sidebar.gapPadded,
                ]}
              />
              <div
                data-slot="sidebar-container"
                data-side={local.side}
                dir={local.dir}
                {...rest}
                {...styleProps(
                  local.class,
                  sidebar.container,
                  (local.variant === "floating" || local.variant === "inset") &&
                    sidebar.containerPadded,
                  local.sx
                )}
              >
                <div
                  data-sidebar="sidebar"
                  data-slot="sidebar-inner"
                  sx={sidebar.inner}
                >
                  {local.children}
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      {...rest}
      {...styleProps(local.class, sidebar.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SidebarFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      {...rest}
      {...styleProps(local.class, sidebar.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SidebarGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      {...rest}
      {...styleProps(local.class, sidebar.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SidebarGroupAction(props: {
  asChild?: PolymorphicProps<"button">["asChild"]
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
    <ark.button
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      {...rest}
      {...styleProps(local.class, sidebar.groupAction, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.button>
  )
}

function SidebarGroupContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      {...rest}
      {...styleProps(local.class, sidebar.groupContent, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SidebarGroupLabel(props: {
  asChild?: PolymorphicProps<"div">["asChild"]
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
    <ark.div
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      {...rest}
      {...styleProps(local.class, sidebar.groupLabel, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.div>
  )
}

function SidebarHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      {...rest}
      {...styleProps(local.class, sidebar.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SidebarInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      {...rest}
      class={local.class}
      sx={[sidebar.input, local.sx]}
    />
  )
}

function SidebarInset(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <main
      data-slot="sidebar-inset"
      {...rest}
      {...styleProps(local.class, sidebar.inset, local.sx)}
    >
      {local.children}
    </main>
  )
}

function SidebarMenu(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      {...rest}
      {...styleProps(local.class, sidebar.menu, local.sx)}
    >
      {local.children}
    </ul>
  )
}

function SidebarMenuAction(props: {
  showOnHover?: boolean
  asChild?: PolymorphicProps<"button">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ showOnHover: false } as const, props),
    ["asChild", "showOnHover", "class", "sx", "children"]
  )
  return (
    <ark.button
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      {...rest}
      {...styleProps(
        local.class,
        sidebar.menuAction,
        local.showOnHover && sidebar.menuActionOnHover,
        local.sx
      )}
      asChild={local.asChild}
    >
      {local.children}
    </ark.button>
  )
}

function SidebarMenuBadge(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      {...rest}
      {...styleProps(local.class, sidebar.menuBadge, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SidebarMenuButton(props: {
  isActive?: boolean
  /** A label shown beside the button while the sidebar is collapsed to its icons. */
  tooltip?: string | { children: string; hidden?: boolean }
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  /** Ark UI's `asChild`: the element given takes the button's props. */
  asChild?: PolymorphicProps<"button">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { isActive: false, variant: "default", size: "default" } as const,
      props
    ),
    [
      "asChild",
      "isActive",
      "variant",
      "size",
      "tooltip",
      "class",
      "sx",
      "children",
    ]
  )
  const ctx = useSidebar()

  const label = createMemo(() =>
    typeof local.tooltip === "string"
      ? { children: local.tooltip }
      : local.tooltip
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
              <ark.button
                {...childProps()}
                data-slot="sidebar-menu-button"
                data-sidebar="menu-button"
                data-size={local.size}
                data-active={local.isActive ? "" : undefined}
                {...rest}
                {...styleProps(
                  childProps().class,
                  local.class,
                  sidebar.menuButton,
                  VARIANTS[local.variant],
                  SIZES[local.size],
                  local.sx
                )}
                asChild={local.asChild}
              >
                {local.children}
              </ark.button>
            )}
          />
          <TooltipContent side="right" align="center">
            {label()!.children}
          </TooltipContent>
        </Tooltip>
      ) : (
        <ark.button
          data-slot="sidebar-menu-button"
          data-sidebar="menu-button"
          data-size={local.size}
          data-active={local.isActive ? "" : undefined}
          {...rest}
          {...styleProps(
            local.class,
            sidebar.menuButton,
            VARIANTS[local.variant],
            SIZES[local.size],
            local.sx
          )}
          asChild={local.asChild}
        >
          {local.children}
        </ark.button>
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      {...rest}
      {...styleProps(local.class, sidebar.menuItem, local.sx)}
    >
      {local.children}
    </li>
  )
}

function SidebarMenuSkeleton(props: {
  showIcon?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ showIcon: false } as const, props),
    ["showIcon", "class", "sx"]
  )
  // A width between 50 and 90%, so a list of them reads as text.
  const width = `${Math.floor(Math.random() * 40) + 50}%`
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...rest}
      {...styleProps(local.class, sidebar.menuSkeleton, local.sx)}
    >
      <Show when={local.showIcon}>
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...rest}
      {...styleProps(local.class, sidebar.menuSub, local.sx)}
    >
      {local.children}
    </ul>
  )
}

function SidebarMenuSubButton(props: {
  size?: "sm" | "md"
  isActive?: boolean
  asChild?: PolymorphicProps<"a">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "md", isActive: false } as const, props),
    ["asChild", "size", "isActive", "class", "sx", "children"]
  )
  return (
    <ark.a
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-active={local.isActive ? "" : undefined}
      {...rest}
      {...styleProps(local.class, sidebar.menuSubButton, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.a>
  )
}

function SidebarMenuSubItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...rest}
      {...styleProps(local.class, sidebar.menuSubItem, local.sx)}
    >
      {local.children}
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
  const [local, rest] = splitProps(
    mergeProps({ defaultOpen: true } as const, props),
    ["defaultOpen", "open", "onOpenChange", "class", "sx", "children"]
  )
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobileState] = createSignal(false)
  // The sidebar's own state, unless the caller controls it.
  const [own, setOwn] = createSignal(untrack(() => local.defaultOpen))
  const open = () => local.open ?? own()

  function setOpen(value: boolean | ((value: boolean) => boolean)) {
    const openState = typeof value === "function" ? value(open()) : value
    if (local.open !== undefined) local.onOpenChange?.(openState)
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
  onMount(() => {
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
    onCleanup(() => window.removeEventListener("keydown", onKeydown))
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
    <SidebarContext.Provider value={context}>
      <div
        data-slot="sidebar-wrapper"
        {...rest}
        {...styleProps(local.class, sidebar.wrapper, local.sx)}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  )
}

function SidebarRail(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const ctx = useSidebar()
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabindex="-1"
      title="Toggle Sidebar"
      {...rest}
      {...styleProps(local.class, sidebar.rail, local.sx)}
      onClick={ctx.toggleSidebar}
    />
  )
}

function SidebarSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      {...rest}
      class={local.class}
      sx={[sidebar.separator, local.sx]}
    />
  )
}

function SidebarTrigger(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const ctx = useSidebar()
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      onClick={ctx.toggleSidebar}
      {...rest}
      class={local.class}
      sx={[local.sx]}
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
