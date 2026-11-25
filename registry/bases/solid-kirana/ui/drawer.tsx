import { Drawer as DrawerPrimitive } from "@kirana-ui/solid/drawer"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  createContext,
  createMemo,
  createSignal,
  omit,
  Show,
  untrack,
  useContext,
} from "solid-js"
import type { JSX } from "@solidjs/web"

import { asRender } from "../../../lib/solid2/element"
import type { AsChild } from "../../../lib/solid2/element"
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
 * `snapPoints`, `modal`, `showSwipeHandle`, `disablePointerDismissal`, `open` or `defaultOpen`; `onOpenChange` gets `details.open`, the Ark
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
  // The first value only, as Base UI's `defaultOpen`.
  const [own, setOwn] = createSignal(untrack(() => props.defaultOpen ?? false))
  const open = () => props.open ?? own()
  return (
    <DrawerContext
      value={{
        get hasSnapPoints() {
          return (props.snapPoints?.length ?? 0) > 0
        },
        get modal() {
          return props.modal ?? true
        },
        get showSwipeHandle() {
          return props.showSwipeHandle ?? false
        },
        get swipeDirection() {
          return props.swipeDirection ?? "down"
        },
      }}
    >
      <DrawerPrimitive.Root
        open={open()}
        onOpenChange={(next) => {
          setOwn(next)
          props.onOpenChange?.({ open: next })
        }}
        modal={props.modal ?? true}
        snapPoints={props.snapPoints}
        swipeDirection={props.swipeDirection ?? "down"}
        disablePointerDismissal={props.disablePointerDismissal ?? false}
      >
        {props.children}
      </DrawerPrimitive.Root>
    </DrawerContext>
  )
}

function DrawerContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  const context = useContext(DrawerContext)
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
          {...styleProps(props.class, drawer.popup, drawer.motion, props.sx)}
        >
          <Show when={context.showSwipeHandle}>
            <DrawerSwipeHandle />
          </Show>
          <div data-slot="drawer-content" sx={drawer.content}>
            {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </DrawerPrimitive.Close>
  )
}

function DrawerDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      {...rest}
      {...styleProps(props.class, drawer.description, props.sx)}
    >
      {props.children}
    </DrawerPrimitive.Description>
  )
}

function DrawerFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="drawer-footer"
      {...rest}
      {...styleProps(props.class, drawer.footer, props.sx)}
    >
      {props.children}
    </div>
  )
}

function DrawerHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="drawer-header"
      {...rest}
      {...styleProps(props.class, drawer.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function DrawerOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, drawer.overlay, props.sx)}
    />
  )
}

function DrawerSwipeHandle(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      {...rest}
      {...styleProps(props.class, drawer.swipeHandle, props.sx)}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, drawer.title, props.sx)}
    >
      {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      render={asRender(props.asChild)}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
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
