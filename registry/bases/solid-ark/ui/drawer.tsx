import { props as styleProps } from "@kirana-style/core"
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent as ArkDrawerContent,
  DrawerDescription as ArkDrawerDescription,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle as ArkDrawerTitle,
  DrawerTrigger as ArkDrawerTrigger,
  useLocaleContext,
} from "@ark-ui/solid"
import { Portal } from "solid-js/web"
import { drawer } from "../../../styles/drawer.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  DrawerBackdropProps,
  DrawerCloseTriggerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
} from "@ark-ui/solid"
import {
  createContext,
  createMemo,
  mergeProps,
  Show,
  splitProps,
  useContext,
} from "solid-js"

export type SwipeDirection = "up" | "down" | "left" | "right"

/** What a Drawer hands its content, as React's context does: getters, so they follow it. */
type DrawerContext = {
  readonly hasSnapPoints: boolean
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
}

const DrawerContext = createContext<DrawerContext>()

function Drawer(props: {
  modal?: boolean
  showSwipeHandle?: boolean
  snapPoints?: (number | string)[]
  swipeDirection?: SwipeDirection
  /** Base UI's name for staying open on a click outside. */
  disablePointerDismissal?: boolean
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        modal: true,
        showSwipeHandle: false,
        swipeDirection: "down",
        disablePointerDismissal: false,
      } as const,
      props
    ),
    [
      "modal",
      "showSwipeHandle",
      "snapPoints",
      "swipeDirection",
      "disablePointerDismissal",
      "children",
    ]
  )
  // Zag's sides are logical (`start`, `end`) and it writes the physical one; Base UI's are physical.
  const locale = useLocaleContext()
  const logicalDirection = createMemo(() => {
    const direction = local.swipeDirection
    if (direction === "up" || direction === "down") return direction
    const rtl = locale?.()?.dir === "rtl"
    return (direction === "left") !== rtl ? "start" : "end"
  })
  return (
    <DrawerContext.Provider
      value={{
        get hasSnapPoints() {
          return (local.snapPoints?.length ?? 0) > 0
        },
        get modal() {
          return local.modal
        },
        get showSwipeHandle() {
          return local.showSwipeHandle
        },
        get swipeDirection() {
          return local.swipeDirection
        },
      }}
    >
      {/* Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. */}
      <DrawerRoot
        modal={local.modal}
        snapPoints={local.snapPoints}
        swipeDirection={logicalDirection()}
        closeOnInteractOutside={!local.disablePointerDismissal}
        lazyMount
        unmountOnExit
        {...rest}
      >
        {local.children}
      </DrawerRoot>
    </DrawerContext.Provider>
  )
}

function DrawerContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const context = useContext(DrawerContext)
  if (!context) throw new Error("DrawerContent must be used within a Drawer.")
  const swipeAxis = createMemo(() =>
    context.swipeDirection === "down" || context.swipeDirection === "up"
      ? "y"
      : "x"
  )
  // Ark's positioner is Base UI's viewport, its content the popup; the content inside is ours.
  return (
    <Portal>
      <Show when={context.modal}>
        <DrawerOverlay
          data-snap-points={context.hasSnapPoints ? "" : undefined}
        />
      </Show>
      <DrawerPositioner
        data-slot="drawer-viewport"
        data-modal={String(context.modal)}
        {...styleProps(drawer.viewport)}
      >
        <ArkDrawerContent
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis()}
          data-snap-points={context.hasSnapPoints ? "" : undefined}
          {...rest}
          {...styleProps(local.class, drawer.popup, drawer.motion, local.sx)}
        >
          <Show when={context.showSwipeHandle}>
            <DrawerSwipeHandle />
          </Show>
          <div data-slot="drawer-content" sx={drawer.content}>
            {local.children}
          </div>
        </ArkDrawerContent>
      </DrawerPositioner>
    </Portal>
  )
}

function DrawerClose(props: {
  asChild?: DrawerCloseTriggerProps["asChild"]
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
    <DrawerCloseTrigger
      asChild={local.asChild}
      data-slot="drawer-close"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DrawerCloseTrigger>
  )
}

function DrawerDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ArkDrawerDescription
      asChild={(childProps) => (
        <p
          {...childProps()}
          data-slot="drawer-description"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            drawer.description,
            local.sx
          )}
        >
          {local.children}
        </p>
      )}
    />
  )
}

function DrawerFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="drawer-footer"
      {...rest}
      {...styleProps(local.class, drawer.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function DrawerHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="drawer-header"
      {...rest}
      {...styleProps(local.class, drawer.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function DrawerOverlay(props: {
  asChild?: DrawerBackdropProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DrawerBackdrop
      asChild={local.asChild}
      data-slot="drawer-overlay"
      {...rest}
      {...styleProps(local.class, drawer.overlay, local.sx)}
    />
  )
}

function DrawerSwipeHandle(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      {...rest}
      {...styleProps(local.class, drawer.swipeHandle, local.sx)}
    />
  )
}

function DrawerTitle(props: {
  asChild?: DrawerTitleProps["asChild"]
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
    <ArkDrawerTitle
      asChild={local.asChild}
      data-slot="drawer-title"
      {...rest}
      {...styleProps(local.class, drawer.title, local.sx)}
    >
      {local.children}
    </ArkDrawerTitle>
  )
}

function DrawerTrigger(props: {
  asChild?: DrawerTriggerProps["asChild"]
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
    <ArkDrawerTrigger
      asChild={local.asChild}
      data-slot="drawer-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkDrawerTrigger>
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
}
