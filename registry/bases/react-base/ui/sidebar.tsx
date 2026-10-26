"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { useIsMobile } from "../../../lib/use-mobile"
import { sidebar } from "../../../styles/sidebar.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { Input } from "./input"
import { Separator } from "./separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { Skeleton } from "./skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

type El<T extends "div" | "main" | "ul" | "li" | "button" = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  sx,
  children,
  ...props
}: El & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // The sidebar's own state, unless the caller controls it with `open` and `onOpenChange`.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // Kept in a cookie, so the next page load starts in the same state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((current) => !current)
      : setOpen((current) => !current)
  }, [isMobile, setOpen, setOpenMobile])

  // ⌘B or Ctrl+B toggles the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // `data-state="expanded"` or `"collapsed"` on the sidebar, which its parts read.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div data-slot="sidebar-wrapper" {...props} sx={[sidebar.wrapper, sx]}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  sx,
  children,
  dir,
  ...props
}: El & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  const padded = variant === "floating" || variant === "inset"

  if (collapsible === "none") {
    return (
      <div data-slot="sidebar" {...props} sx={[sidebar.static, sx]}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          sx={sidebar.mobile}
          side={side}
          showCloseButton={false}
        >
          <SheetHeader sx={visuallyHidden}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div sx={sidebar.mobileInner}>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      sx={sidebar.root}
    >
      {/* Holds the room the fixed panel takes on the page. */}
      <div
        data-slot="sidebar-gap"
        sx={[sidebar.gap, padded && sidebar.gapPadded]}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        {...props}
        sx={[sidebar.container, padded && sidebar.containerPadded, sx]}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          sx={sidebar.inner}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
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

function SidebarRail({ sx, ...props }: El<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
      sx={[sidebar.rail, sx]}
    />
  )
}

function SidebarInset({ sx, ...props }: El<"main">) {
  return <main data-slot="sidebar-inset" {...props} sx={[sidebar.inset, sx]} />
}

function SidebarInput({ sx, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      {...props}
      sx={[sidebar.input, sx]}
    />
  )
}

function SidebarHeader({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      {...props}
      sx={[sidebar.header, sx]}
    />
  )
}

function SidebarFooter({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      {...props}
      sx={[sidebar.footer, sx]}
    />
  )
}

function SidebarSeparator({
  sx,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      {...props}
      sx={[sidebar.separator, sx]}
    />
  )
}

function SidebarContent({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      {...props}
      sx={[sidebar.content, sx]}
    />
  )
}

function SidebarGroup({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      {...props}
      sx={[sidebar.group, sx]}
    />
  )
}

function SidebarGroupLabel({
  sx,
  render,
  ...props
}: Omit<useRender.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(styleProps(sidebar.groupLabel, sx), props),
    render,
    state: { slot: "sidebar-group-label", sidebar: "group-label" },
  })
}

function SidebarGroupAction({
  sx,
  render,
  ...props
}: Omit<useRender.ComponentProps<"button">, "className"> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(styleProps(sidebar.groupAction, sx), props),
    render,
    state: { slot: "sidebar-group-action", sidebar: "group-action" },
  })
}

function SidebarGroupContent({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      {...props}
      sx={[sidebar.groupContent, sx]}
    />
  )
}

function SidebarMenu({ sx, ...props }: El<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      {...props}
      sx={[sidebar.menu, sx]}
    />
  )
}

function SidebarMenuItem({ sx, ...props }: El<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      {...props}
      sx={[sidebar.menuItem, sx]}
    />
  )
}

const MENU_BUTTON_VARIANTS = {
  default: null,
  outline: sidebar.menuButtonOutline,
}
const MENU_BUTTON_SIZES = {
  default: sidebar.menuButtonDefault,
  sm: sidebar.menuButtonSm,
  lg: sidebar.menuButtonLg,
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  sx,
  ...props
}: Omit<useRender.ComponentProps<"button">, "className"> & {
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
  variant?: keyof typeof MENU_BUTTON_VARIANTS
  size?: keyof typeof MENU_BUTTON_SIZES
  sx?: Sx
}) {
  const { isMobile, state } = useSidebar()
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      styleProps(
        sidebar.menuButton,
        MENU_BUTTON_VARIANTS[variant],
        MENU_BUTTON_SIZES[size],
        sx
      ),
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  })

  if (!tooltip) {
    return comp
  }

  const content = typeof tooltip === "string" ? { children: tooltip } : tooltip

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...content}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  sx,
  render,
  showOnHover = false,
  ...props
}: Omit<useRender.ComponentProps<"button">, "className"> & {
  showOnHover?: boolean
  sx?: Sx
}) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      styleProps(
        sidebar.menuAction,
        showOnHover && sidebar.menuActionOnHover,
        sx
      ),
      props
    ),
    render,
    state: { slot: "sidebar-menu-action", sidebar: "menu-action" },
  })
}

function SidebarMenuBadge({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      {...props}
      sx={[sidebar.menuBadge, sx]}
    />
  )
}

function SidebarMenuSkeleton({
  sx,
  showIcon = false,
  ...props
}: El & { showIcon?: boolean }) {
  // A width between 50 and 90%, so a list of them reads as text.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...props}
      sx={[sidebar.menuSkeleton, sx]}
    >
      {showIcon && (
        <Skeleton
          data-sidebar="menu-skeleton-icon"
          sx={sidebar.menuSkeletonIcon}
        />
      )}
      <Skeleton
        data-sidebar="menu-skeleton-text"
        sx={sidebar.menuSkeletonText}
        style={{ maxWidth: width }}
      />
    </div>
  )
}

function SidebarMenuSub({ sx, ...props }: El<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...props}
      sx={[sidebar.menuSub, sx]}
    />
  )
}

function SidebarMenuSubItem({ sx, ...props }: El<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...props}
      sx={[sidebar.menuSubItem, sx]}
    />
  )
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  sx,
  ...props
}: Omit<useRender.ComponentProps<"a">, "className"> & {
  size?: "sm" | "md"
  isActive?: boolean
  sx?: Sx
}) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(styleProps(sidebar.menuSubButton, sx), props),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  })
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
