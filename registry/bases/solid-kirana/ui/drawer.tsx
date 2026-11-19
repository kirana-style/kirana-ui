import { Drawer as DrawerPrimitive } from "@kirana-ui/solid/drawer"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  createContext,
  createMemo,
  createSignal,
  mergeProps,
  Show,
  splitProps,
  useContext,
} from "solid-js"
import type { JSX } from "solid-js"

import { asRender } from "../../../lib/solid/element"
import type { AsChild } from "../../../lib/solid/element"
import { drawer } from "../../../styles/drawer.styles"

export type SwipeDirection = "up" | "down" | "left" | "right"

/** What a Drawer hands its content, as React's context does: getters, so they follow it. */
type DrawerContext = {
  readonly hasSnapPoints: boolean
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
}

const DrawerContext = createContext<DrawerContext>()

/**
 * Base UI's drawer on Kirana UI's: `swipeDirection` (the edge it leaves by, `down` by default),
 * `snapPoints`, `modal`, `showSwipeHandle`, `disablePointerDismissal` (the primitives'
 * `dismissible`, inverted), `open` or `defaultOpen`; `onOpenChange` gets `details.open`, the Ark
 * UI parts' shape every Solid base keeps. The swipe, the snap points and the nested drawers are
 * the primitives' own, which write Base UI's variables for the styles.
 */
function Drawer(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  modal?: boolean
  showSwipeHandle?: boolean
  snapPoints?: (number | string)[]
  swipeDirection?: SwipeDirection
  /** Base UI's name for staying open on a click outside. */
  disablePointerDismissal?: boolean
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local] = splitProps(
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
      "open",
      "defaultOpen",
      "onOpenChange",
      "modal",
      "showSwipeHandle",
      "snapPoints",
      "swipeDirection",
      "disablePointerDismissal",
      "children",
    ]
  )
  // The first value only, as Base UI's `defaultOpen`.
  const [own, setOwn] = createSignal(local.defaultOpen ?? false)
  const open = () => local.open ?? own()
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
      <DrawerPrimitive.Root
        open={open()}
        onOpenChange={(next) => {
          setOwn(next)
          local.onOpenChange?.({ open: next })
        }}
        modal={local.modal}
        snapPoints={local.snapPoints}
        swipeDirection={local.swipeDirection}
        dismissible={local.disablePointerDismissal ? false : undefined}
      >
        {local.children}
      </DrawerPrimitive.Root>
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
  // Base UI's viewport and content, which Kirana UI's drawer does not have: the boxes themselves,
  // as React's Kirana UI drawer draws them.
  return (
    <DrawerPrimitive.Portal>
      <Show when={context.modal}>
        <DrawerOverlay
          data-snap-points={context.hasSnapPoints ? "" : undefined}
        />
      </Show>
      <div
        data-slot="drawer-viewport"
        data-modal={String(context.modal)}
        sx={drawer.viewport}
      >
        <DrawerPrimitive.Popup
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
        </DrawerPrimitive.Popup>
      </div>
    </DrawerPrimitive.Portal>
  )
}

function DrawerClose(props: {
  asChild?: AsChild<"button">
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
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DrawerPrimitive.Close>
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
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      {...rest}
      {...styleProps(local.class, drawer.description, local.sx)}
    >
      {local.children}
    </DrawerPrimitive.Description>
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
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      render={asRender(local.asChild)}
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
  asChild?: AsChild<"h2">
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
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(local.class, drawer.title, local.sx)}
    >
      {local.children}
    </DrawerPrimitive.Title>
  )
}

function DrawerTrigger(props: {
  asChild?: AsChild<"button">
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
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DrawerPrimitive.Trigger>
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
