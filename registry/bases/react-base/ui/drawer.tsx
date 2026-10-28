"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { drawer } from "../../../styles/drawer.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
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
  ...props
}: DrawerPrimitive.Root.Props & {
  showSwipeHandle?: boolean
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
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  sx,
  ...props
}: Omit<DrawerPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
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
}: Omit<DrawerPrimitive.Popup.Props, "className"> & { sx?: Sx }) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
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
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            {...styleProps(drawer.content)}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
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
}: Omit<DrawerPrimitive.Title.Props, "className"> & { sx?: Sx }) {
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
}: Omit<DrawerPrimitive.Description.Props, "className"> & { sx?: Sx }) {
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
