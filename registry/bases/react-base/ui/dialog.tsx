"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/react"
import type { Sx } from "../../../lib/sx"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  sx,
  ...props
}: Omit<DialogPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      {...props}
      {...styleProps(backdropMotion, dialog.overlay, sx)}
    />
  )
}

function DialogContent({
  sx,
  children,
  showCloseButton = true,
  ...props
}: Omit<DialogPrimitive.Popup.Props, "className"> & {
  showCloseButton?: boolean
  sx?: Sx
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        {...props}
        {...styleProps(modalMotion, dialog.content, sx)}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={<Button variant="ghost" size="icon-sm" sx={dialog.close} />}
          >
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
            <span sx={visuallyHidden}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
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
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  sx,
  ...props
}: Omit<DialogPrimitive.Title.Props, "className"> & { sx?: Sx }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      {...props}
      {...styleProps(dialog.title, sx)}
    />
  )
}

function DialogDescription({
  sx,
  ...props
}: Omit<DialogPrimitive.Description.Props, "className"> & { sx?: Sx }) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      {...props}
      {...styleProps(dialog.description, sx)}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
