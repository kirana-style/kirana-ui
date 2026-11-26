/**
 * ui-sdk's drawer, with the Ark UI part's props: `swipeDirection` (the edge it leaves through) is
 * ui-sdk's `side`, `disablePointerDismissal` its `closeOnOutsidePress` inverted, `snapPoints` as
 * fractions or lengths, which ui-sdk reads the same; `open` is controlled with `onOpenChange` called
 * with `{ open }`. Its popup renders in the body; as it closes, the content's scroll-driven
 * animations end (LF-024).
 */
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Drawer as UisdkDrawer,
  DrawerBackdrop,
  DrawerClose as UisdkDrawerClose,
  DrawerContent as UisdkDrawerContent,
  DrawerDescription as UisdkDrawerDescription,
  DrawerTitle as UisdkDrawerTitle,
  DrawerTrigger as UisdkDrawerTrigger,
} from "@ui-sdk/solid/drawer"
import type { JSX } from "@solidjs/web"
import { createContext, omit, Show, useContext } from "solid-js"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { drawer } from "../../../styles/drawer.styles"
import { withDefaults } from "../../../lib/solid2/with-defaults"

export type SwipeDirection = "up" | "down" | "left" | "right"

/** What a Drawer hands its content, as React's context does: getters, so they follow it. */
type DrawerContext = {
  readonly hasSnapPoints: boolean
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
  /** The content's own element, whose scroll-driven animations end as the drawer closes. */
  content: HTMLElement | undefined
}

const DrawerContext = createContext<DrawerContext>()

const SIDES = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
} as const

/**
 * Cancels the animations a scroll drives inside `el` (a scroll fade's), as the drawer starts to
 * close: ui-sdk ends a popup's exit once every animation in its subtree has finished, and one a
 * scroll drives never does (LF-024).
 */
function endScrollAnimations(el: Element | undefined) {
  if (!el) return
  for (const animation of el.getAnimations({ subtree: true })) {
    if (animation.timeline && animation.timeline !== document.timeline)
      animation.cancel()
  }
}

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
  const local = withDefaults(
    { modal: true, showSwipeHandle: false, swipeDirection: "down" } as const,
    props
  )
  const rest = omit(
    local,
    "open",
    "onOpenChange",
    "modal",
    "showSwipeHandle",
    "snapPoints",
    "swipeDirection",
    "disablePointerDismissal",
    "children"
  )
  const context: DrawerContext = {
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
    content: undefined,
  }
  return (
    <DrawerContext value={context}>
      <UisdkDrawer
        container={typeof document === "undefined" ? undefined : document.body}
        modal={local.modal}
        snapPoints={local.snapPoints as never}
        side={SIDES[local.swipeDirection]}
        closeOnOutsidePress={
          local.disablePointerDismissal === undefined
            ? undefined
            : !local.disablePointerDismissal
        }
        open={local.open}
        {...rest}
        onOpenChange={(open: boolean) => {
          // Before ui-sdk gathers what its exit waits for (LF-024).
          if (!open) endScrollAnimations(context.content)
          local.onOpenChange?.({ open })
        }}
      >
        {local.children}
      </UisdkDrawer>
    </DrawerContext>
  )
}

/**
 * The sheet. ui-sdk's content places itself in a viewport of its own and moves itself
 * (`translate`), so it takes the popup's and the content's styles but not Base UI's motion, and the
 * attributes the registry's styles read on Base UI's (`data-swipe-direction`, `data-swipe-axis`). It
 * takes focus as it opens, as Base UI's popup; ui-sdk's goes to the first field.
 */
function DrawerContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  const context = useContext(DrawerContext)
  const axis = () =>
    context.swipeDirection === "down" || context.swipeDirection === "up"
      ? "y"
      : "x"
  return (
    <>
      <Show when={context.modal}>
        <DrawerOverlay
          data-snap-points={context.hasSnapPoints ? "" : undefined}
        />
      </Show>
      <UisdkPart
        part={UisdkDrawerContent}
        slotName="drawer-popup"
        tag="div"
        initialFocus="content"
        data-modal={String(context.modal)}
        data-swipe-axis={axis()}
        data-swipe-direction={context.swipeDirection}
        data-snap-points={context.hasSnapPoints ? "" : undefined}
        {...rest}
        {...styleProps(props.class, drawer.popup, props.sx)}
      >
        <Show when={context.showSwipeHandle}>
          <DrawerSwipeHandle />
        </Show>
        <div
          data-slot="drawer-content"
          ref={(el: HTMLDivElement) => (context.content = el)}
          sx={drawer.content}
        >
          {props.children}
        </div>
      </UisdkPart>
    </>
  )
}

function DrawerClose(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkDrawerClose}
      slotName="drawer-close"
      tag="button"
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function DrawerDescription(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkDrawerDescription}
      slotName="drawer-description"
      tag="p"
      {...rest}
      {...styleProps(props.class, drawer.description, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
  asChild?: AsChild
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={DrawerBackdrop}
      slotName="drawer-overlay"
      tag="div"
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
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkDrawerTitle}
      slotName="drawer-title"
      tag="h2"
      {...rest}
      {...styleProps(props.class, drawer.title, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function DrawerTrigger(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkDrawerTrigger}
      slotName="drawer-trigger"
      tag="button"
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
