"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  sx,
  ...props
}: Omit<SheetPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
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
}: Omit<SheetPrimitive.Popup.Props, "className"> & {
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
}: Omit<SheetPrimitive.Title.Props, "className"> & { sx?: Sx }) {
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
}: Omit<SheetPrimitive.Description.Props, "className"> & { sx?: Sx }) {
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
