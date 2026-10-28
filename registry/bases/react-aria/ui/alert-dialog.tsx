"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Dialog as AlertDialogPrimitive,
  DialogTrigger as AlertDialogTriggerPrimitive,
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
} from "react-aria-components"
import type {
  DialogTriggerProps as AlertDialogTriggerPrimitiveProps,
  ModalOverlayProps as ModalOverlayPrimitiveProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { Button } from "./button"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function AlertDialogTrigger({ ...props }: AlertDialogTriggerPrimitiveProps) {
  return (
    <AlertDialogTriggerPrimitive data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogOverlay({
  sx,
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "style" | "children"> & {
  sx?: Sx
  children: React.ReactNode
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="alert-dialog-overlay"
      {...props}
      {...styleProps(backdropMotion, alertDialog.overlay, sx)}
    >
      {children}
    </ModalOverlayPrimitive>
  )
}

/** The dialog itself, in its overlay: React Aria's `Modal` holding its `Dialog`. */
function AlertDialog({
  sx,
  size = "default",
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "style" | "children"> &
  Pick<React.ComponentProps<typeof ModalPrimitive>, "isDismissable"> & {
    sx?: Sx
    size?: "default" | "sm"
    children: React.ReactNode
  }) {
  return (
    <AlertDialogOverlay {...props}>
      <ModalPrimitive
        data-slot="alert-dialog-content"
        data-size={size}
        {...styleProps(modalMotion, alertDialog.content, sx)}
      >
        <AlertDialogPrimitive
          data-slot="alert-dialog"
          role="alertdialog"
          {...styleProps(alertDialog.inner)}
        >
          {children}
        </AlertDialogPrimitive>
      </ModalPrimitive>
    </AlertDialogOverlay>
  )
}

function AlertDialogContent({
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog size={size} {...props}>
      {children}
    </AlertDialog>
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
  React.ComponentProps<typeof Heading>,
  "slot" | "className" | "style"
> & {
  sx?: Sx
}) {
  return (
    <Heading
      slot="title"
      data-slot="alert-dialog-title"
      {...props}
      {...styleProps(alertDialog.title, sx)}
    />
  )
}

function AlertDialogDescription({ sx, ...props }: Omit<El, "slot">) {
  return (
    <div
      data-slot="alert-dialog-description"
      {...props}
      sx={[alertDialog.description, sx]}
    />
  )
}

function AlertDialogAction({ ...props }: React.ComponentProps<typeof Button>) {
  return <Button slot="close" data-slot="alert-dialog-action" {...props} />
}

function AlertDialogCancel({
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      slot="close"
      data-slot="alert-dialog-cancel"
      variant={variant}
      size={size}
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
  AlertDialogTitle,
  AlertDialogTrigger,
}
