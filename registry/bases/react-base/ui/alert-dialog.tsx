"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { Button } from "./button"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  sx,
  ...props
}: Omit<AlertDialogPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      {...props}
      {...styleProps(backdropMotion, alertDialog.overlay, sx)}
    />
  )
}

function AlertDialogContent({
  sx,
  size = "default",
  ...props
}: Omit<AlertDialogPrimitive.Popup.Props, "className"> & {
  size?: "default" | "sm"
  sx?: Sx
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        {...props}
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
  React.ComponentProps<typeof AlertDialogPrimitive.Title>,
  "className"
> & {
  sx?: Sx
}) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      {...props}
      {...styleProps(alertDialog.title, sx)}
    />
  )
}

function AlertDialogDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Description>,
  "className"
> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      {...props}
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
}: Omit<AlertDialogPrimitive.Close.Props, "className"> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size" | "sx">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button variant={variant} size={size} sx={sx} />}
      {...props}
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
