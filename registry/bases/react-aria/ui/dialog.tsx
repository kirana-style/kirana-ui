"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Dialog as DialogPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
} from "react-aria-components"
import type {
  DialogProps as DialogPrimitiveProps,
  DialogTriggerProps as DialogTriggerPrimitiveProps,
  ModalOverlayProps as ModalOverlayPrimitiveProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

function DialogTrigger({ ...props }: DialogTriggerPrimitiveProps) {
  return <DialogTriggerPrimitive data-slot="dialog-trigger" {...props} />
}

function DialogClose({
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      slot="close"
      data-slot="dialog-close"
      variant={variant}
      size={size}
      {...props}
    />
  )
}

function DialogOverlay({
  sx,
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "style" | "children"> & {
  sx?: Sx
  children: React.ReactNode
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="dialog-overlay"
      {...props}
      {...styleProps(backdropMotion, dialog.overlay, sx)}
    >
      {children}
    </ModalOverlayPrimitive>
  )
}

/** The dialog itself, in its overlay: React Aria's `Modal` holding its `Dialog`. */
function Dialog({
  sx,
  children,
  showCloseButton = true,
  isDismissable = true,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "style" | "children"> &
  Pick<React.ComponentProps<typeof ModalPrimitive>, "isDismissable"> & {
    sx?: Sx
    children: React.ReactNode
    showCloseButton?: boolean
  }) {
  return (
    <DialogOverlay isDismissable={isDismissable} {...props}>
      <ModalPrimitive
        data-slot="dialog-content"
        {...styleProps(modalMotion, dialog.content, sx)}
      >
        <DialogPrimitive data-slot="dialog" {...styleProps(dialog.inner)}>
          {children}
          {showCloseButton && (
            <DialogClose variant="ghost" size="icon-sm" sx={dialog.close}>
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
              <span sx={visuallyHidden}>Close</span>
            </DialogClose>
          )}
        </DialogPrimitive>
      </ModalPrimitive>
    </DialogOverlay>
  )
}

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function DialogHeader({ sx, ...props }: El) {
  return <div data-slot="dialog-header" {...props} sx={[dialog.header, sx]} />
}

function DialogFooter({
  sx,
  showCloseButton = false,
  children,
  ...props
}: El & { showCloseButton?: boolean }) {
  return (
    <div data-slot="dialog-footer" {...props} sx={[dialog.footer, sx]}>
      {children}
      {showCloseButton && <DialogClose variant="outline">Close</DialogClose>}
    </div>
  )
}

function DialogTitle({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "slot" | "className"> & {
  sx?: Sx
}) {
  return (
    <Heading
      slot="title"
      data-slot="dialog-title"
      {...props}
      {...styleProps(dialog.title, sx)}
    />
  )
}

function DialogDescription({ sx, ...props }: Omit<El, "slot">) {
  return (
    <div
      data-slot="dialog-description"
      {...props}
      sx={[dialog.description, sx]}
    />
  )
}

export {
  type DialogPrimitiveProps,
  type DialogTriggerPrimitiveProps,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
}
