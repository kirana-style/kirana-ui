"use client"

import * as React from "react"
import * as DrawerPrimitive from "@ui-sdk/react/drawer"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import {
  endScrollAnimations,
  popupContainer,
  slotRender,
  slotOf,
} from "../../../lib/uisdk-slot"
import { drawer } from "../../../styles/drawer.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

/** Base UI's swipe directions, each the edge ui-sdk names as its `side`. */
type SwipeDirection = "up" | "down" | "left" | "right"
const SIDES = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
} as const

type RootProps = React.ComponentProps<typeof DrawerPrimitive.Drawer>

type DrawerContextProps = {
  /** The content's own element, whose scroll-driven animations end as the drawer closes. */
  content: React.RefObject<HTMLDivElement | null>
  hasSnapPoints: boolean
  modal: RootProps["modal"]
  showSwipeHandle: boolean
  swipeDirection: SwipeDirection
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  disablePointerDismissal,
  onOpenChange,
  ...props
}: Omit<RootProps, "side" | "snapPoints"> & {
  showSwipeHandle?: boolean
  // Base UI's, as every React base's part takes them: the edge it leaves through, its snap points
  // (a fraction, or a length such as `"148px"`, which ui-sdk reads the same), and whether a press
  // outside leaves it open (ui-sdk's `closeOnOutsidePress`, inverted).
  swipeDirection?: SwipeDirection
  snapPoints?: (number | string)[]
  disablePointerDismissal?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const content = React.useRef<HTMLDivElement>(null)
  const contextValue = React.useMemo(
    () => ({ content, hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Drawer
        data-slot="drawer"
        container={popupContainer()}
        modal={modal}
        snapPoints={snapPoints as RootProps["snapPoints"]}
        side={SIDES[swipeDirection]}
        onOpenChange={(open, details) => {
          // Before ui-sdk gathers what its exit waits for (LF-024).
          if (!open) endScrollAnimations(content.current)
          onOpenChange?.(open, details)
        }}
        closeOnOutsidePress={
          disablePointerDismissal === undefined
            ? undefined
            : !disablePointerDismissal
        }
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger(
  props: React.ComponentProps<typeof DrawerPrimitive.DrawerTrigger>
) {
  return (
    <DrawerPrimitive.DrawerTrigger
      {...props}
      render={slotRender(
        slotOf(props, "drawer-trigger"),
        "button",
        props.render
      )}
    />
  )
}

/** Base UI's portal, which ui-sdk's content does itself: its children as they are. */
function DrawerPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DrawerClose(
  props: React.ComponentProps<typeof DrawerPrimitive.DrawerClose>
) {
  return (
    <DrawerPrimitive.DrawerClose
      {...props}
      render={slotRender(slotOf(props, "drawer-close"), "button", props.render)}
    />
  )
}

function DrawerOverlay({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DrawerPrimitive.DrawerBackdrop>,
  "className"
> & {
  sx?: Sx
}) {
  return (
    <DrawerPrimitive.DrawerBackdrop
      {...props}
      render={slotRender(slotOf(props, "drawer-overlay"), "div", props.render)}
      {...styleProps(drawer.overlay, sx)}
    />
  )
}

function DrawerSwipeHandle({ sx, ...props }: El) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      {...props}
      sx={[drawer.swipeHandle, sx]}
    />
  )
}

/**
 * The sheet. ui-sdk's content places itself in a viewport of its own and moves itself (`translate`),
 * so it takes the popup's and the content's styles but not Base UI's motion, and the attributes
 * the registry's styles read on Base UI's (`data-swipe-direction`, `data-swipe-axis`).
 */
function DrawerContent({
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof DrawerPrimitive.DrawerContent>,
  "className" | "children"
> & { sx?: Sx; children?: React.ReactNode }) {
  const { content, hasSnapPoints, modal, showSwipeHandle, swipeDirection } =
    useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"
  return (
    <>
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.DrawerContent
        data-modal={modal}
        data-swipe-axis={swipeAxis}
        data-swipe-direction={swipeDirection}
        data-snap-points={hasSnapPoints ? "" : undefined}
        {...props}
        render={slotRender(slotOf(props, "drawer-popup"), "div", props.render)}
        {...styleProps(drawer.popup, sx)}
      >
        {showSwipeHandle && <DrawerSwipeHandle />}
        <div data-slot="drawer-content" ref={content} sx={drawer.content}>
          {children}
        </div>
      </DrawerPrimitive.DrawerContent>
    </>
  )
}

function DrawerHeader({ sx, ...props }: El) {
  return <div data-slot="drawer-header" {...props} sx={[drawer.header, sx]} />
}

function DrawerFooter({ sx, ...props }: El) {
  return <div data-slot="drawer-footer" {...props} sx={[drawer.footer, sx]} />
}

function DrawerTitle({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DrawerPrimitive.DrawerTitle>,
  "className"
> & {
  sx?: Sx
}) {
  return (
    <DrawerPrimitive.DrawerTitle
      {...props}
      render={slotRender(slotOf(props, "drawer-title"), "h2", props.render)}
      {...styleProps(drawer.title, sx)}
    />
  )
}

function DrawerDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DrawerPrimitive.DrawerDescription>,
  "className"
> & {
  sx?: Sx
}) {
  return (
    <DrawerPrimitive.DrawerDescription
      {...props}
      render={slotRender(
        slotOf(props, "drawer-description"),
        "p",
        props.render
      )}
      {...styleProps(drawer.description, sx)}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
