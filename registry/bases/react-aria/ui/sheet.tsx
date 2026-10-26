"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Dialog as SheetPrimitive,
  DialogTrigger as SheetTriggerPrimitive,
} from "react-aria-components"
import type {
  ModalOverlayProps as ModalOverlayPrimitiveProps,
  DialogProps as SheetPrimitiveProps,
  DialogTriggerProps as SheetTriggerPrimitiveProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

function SheetTrigger({ ...props }: SheetTriggerPrimitiveProps) {
  return <SheetTriggerPrimitive data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      slot="close"
      data-slot="sheet-close"
      variant={variant}
      size={size}
      {...props}
    />
  )
}

function SheetOverlay({
  sx,
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "style" | "children"> & {
  sx?: Sx
  children: React.ReactNode
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="sheet-overlay"
      isDismissable
      {...props}
      {...styleProps(sheet.overlay, sx)}
    >
      {children}
    </ModalOverlayPrimitive>
  )
}

/** The sheet itself, in its overlay: React Aria's `Modal` holding its `Dialog`. */
function Sheet({
  sx,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "style" | "children"> &
  Pick<React.ComponentProps<typeof ModalPrimitive>, "isDismissable"> & {
    sx?: Sx
    children: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"
    showCloseButton?: boolean
  }) {
  return (
    <SheetOverlay {...props}>
      <ModalPrimitive
        data-slot="sheet-content"
        data-side={side}
        {...styleProps(sheet.content, sheet.side[side], sx)}
      >
        <SheetPrimitive data-slot="sheet" {...styleProps(sheet.inner)}>
          {children}
          {showCloseButton && (
            <SheetClose variant="ghost" size="icon-sm" sx={sheet.close}>
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
              <span sx={visuallyHidden}>Close</span>
            </SheetClose>
          )}
        </SheetPrimitive>
      </ModalPrimitive>
    </SheetOverlay>
  )
}

function SheetContent({ ...props }: React.ComponentProps<typeof Sheet>) {
  return <Sheet {...props} />
}

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function SheetHeader({ sx, ...props }: El) {
  return <div data-slot="sheet-header" {...props} sx={[sheet.header, sx]} />
}

function SheetFooter({ sx, ...props }: El) {
  return <div data-slot="sheet-footer" {...props} sx={[sheet.footer, sx]} />
}

function SheetTitle({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "slot" | "className"> & {
  sx?: Sx
}) {
  return (
    <Heading
      slot="title"
      data-slot="sheet-title"
      {...props}
      {...styleProps(sheet.title, sx)}
    />
  )
}

function SheetDescription({ sx, ...props }: Omit<El, "slot">) {
  return (
    <div
      data-slot="sheet-description"
      {...props}
      sx={[sheet.description, sx]}
    />
  )
}

export {
  type SheetPrimitiveProps,
  type SheetTriggerPrimitiveProps,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
