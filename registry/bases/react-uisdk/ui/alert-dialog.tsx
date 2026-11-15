"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@ui-sdk/react/alert-dialog"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import {
  ClosingContent,
  popupContainer,
  slotRender,
  useClosingContent,
  useClosingRoot,
  slotOf,
} from "../../../lib/uisdk-slot"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { Button } from "./button"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function AlertDialog({
  onOpenChange,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.AlertDialog>) {
  const [content, handle] = useClosingRoot(onOpenChange)
  return (
    <ClosingContent value={content}>
      <AlertDialogPrimitive.AlertDialog
        data-slot="alert-dialog"
        container={popupContainer()}
        onOpenChange={handle}
        {...props}
      />
    </ClosingContent>
  )
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogTrigger>) {
  return (
    <AlertDialogPrimitive.AlertDialogTrigger
      {...props}
      render={slotRender(
        slotOf(props, "alert-dialog-trigger"),
        "button",
        props.render
      )}
    />
  )
}

/** Base UI's portal, which ui-sdk's content does itself: its children as they are. */
function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function AlertDialogOverlay({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogBackdrop>,
  "className"
> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.AlertDialogBackdrop
      {...props}
      render={slotRender(
        slotOf(props, "alert-dialog-overlay"),
        "div",
        props.render
      )}
      {...styleProps(backdropMotion, alertDialog.overlay, sx)}
    />
  )
}

function AlertDialogContent({
  sx,
  size = "default",
  ref,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogContent>,
  "className"
> & {
  size?: "default" | "sm"
  sx?: Sx
}) {
  const closing = useClosingContent(ref)
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.AlertDialogContent
        data-size={size}
        {...props}
        ref={closing}
        render={slotRender(
          slotOf(props, "alert-dialog-content"),
          "div",
          props.render
        )}
        {...styleProps(modalMotion, alertDialog.content, sx)}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ sx, ...props }: El) {
  return (
    <div
      data-slot="alert-dialog-header"
      {...props}
      sx={[alertDialog.header, sx]}
    />
  )
}

function AlertDialogFooter({ sx, ...props }: El) {
  return (
    <div
      data-slot="alert-dialog-footer"
      {...props}
      sx={[alertDialog.footer, sx]}
    />
  )
}

function AlertDialogMedia({ sx, ...props }: El) {
  return (
    <div
      data-slot="alert-dialog-media"
      {...props}
      sx={[alertDialog.media, sx]}
    />
  )
}

function AlertDialogTitle({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogTitle>,
  "className"
> & {
  sx?: Sx
}) {
  return (
    <AlertDialogPrimitive.AlertDialogTitle
      {...props}
      render={slotRender(
        slotOf(props, "alert-dialog-title"),
        "h2",
        props.render
      )}
      {...styleProps(alertDialog.title, sx)}
    />
  )
}

function AlertDialogDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogDescription>,
  "className"
> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.AlertDialogDescription
      {...props}
      render={slotRender(
        slotOf(props, "alert-dialog-description"),
        "p",
        props.render
      )}
      {...styleProps(alertDialog.description, sx)}
    />
  )
}

function AlertDialogAction({ ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" {...props} />
}

function AlertDialogCancel({
  sx,
  variant = "outline",
  size = "default",
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogClose>,
  "className"
> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size" | "sx">) {
  return (
    <AlertDialogPrimitive.AlertDialogClose
      {...props}
      render={slotRender(
        "alert-dialog-cancel",
        "button",
        <Button variant={variant} size={size} sx={sx} />
      )}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
