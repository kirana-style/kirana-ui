"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@kirana-ui/react/drawer"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { drawer } from "../../../styles/drawer.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

type RootProps = React.ComponentProps<typeof DrawerPrimitive.Root>

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: RootProps["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<RootProps["swipeDirection"]>
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

/**
 * Base UI's Drawer root on the primitives': the same open, modal, swipe and snap-point props, and
 * Base UI's `disablePointerDismissal` as the primitives' `dismissible`, inverted.
 */
function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  disablePointerDismissal,
  ...props
}: RootProps & {
  showSwipeHandle?: boolean
  disablePointerDismissal?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        dismissible={
          disablePointerDismissal === undefined
            ? undefined
            : !disablePointerDismissal
        }
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal> & {
  [data: `data-${string}`]: unknown
}) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof DrawerPrimitive.Backdrop>, "className"> & {
  sx?: Sx
}) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      {...props}
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

function DrawerContent({
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DrawerPrimitive.Popup>, "className"> & {
  sx?: Sx
}) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      {/* Base UI's Viewport and Content, which the primitives' drawer does not have (PF-011):
          the boxes themselves, with their styles. */}
      <div
        data-slot="drawer-viewport"
        data-modal={modal}
        {...styleProps(drawer.viewport)}
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          {...props}
          {...styleProps(drawer.popup, drawer.motion, sx)}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <div data-slot="drawer-content" {...styleProps(drawer.content)}>
            {children}
          </div>
        </DrawerPrimitive.Popup>
      </div>
    </DrawerPortal>
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
}: Omit<React.ComponentProps<typeof DrawerPrimitive.Title>, "className"> & {
  sx?: Sx
}) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      {...props}
      {...styleProps(drawer.title, sx)}
    />
  )
}

function DrawerDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DrawerPrimitive.Description>,
  "className"
> & {
  sx?: Sx
}) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      {...props}
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
