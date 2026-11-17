"use client"

import * as React from "react"

import type { PartProps } from "../../../lib/kirana-render"
import { Dialog as SheetPrimitive } from "@kirana-ui/react/dialog"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

function Sheet({ ...props }: PartProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: PartProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: PartProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: PartProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  sx,
  ...props
}: Omit<PartProps<typeof SheetPrimitive.Backdrop>, "className"> & { sx?: Sx }) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      {...props}
      {...styleProps(sheet.overlay, sx)}
    />
  )
}

function SheetContent({
  sx,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Omit<PartProps<typeof SheetPrimitive.Popup>, "className"> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  sx?: Sx
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        {...props}
        {...styleProps(sheet.content, sheet.side[side], sx)}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" size="icon-sm" sx={sheet.close} />}
          >
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
            <span sx={visuallyHidden}>Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
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
}: Omit<PartProps<typeof SheetPrimitive.Title>, "className"> & { sx?: Sx }) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      {...props}
      {...styleProps(sheet.title, sx)}
    />
  )
}

function SheetDescription({
  sx,
  ...props
}: Omit<PartProps<typeof SheetPrimitive.Description>, "className"> & {
  sx?: Sx
}) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      {...props}
      {...styleProps(sheet.description, sx)}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
