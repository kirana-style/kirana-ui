"use client"

import * as React from "react"
import * as SheetPrimitive from "@ui-sdk/react/dialog"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import {
  ClosingContent,
  popupContainer,
  slotRender,
  useClosingContent,
  useClosingRoot,
  slotOf,
} from "../../../lib/uisdk-slot"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

function Sheet({
  onOpenChange,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Dialog>) {
  const [content, handle] = useClosingRoot(onOpenChange)
  return (
    <ClosingContent value={content}>
      <SheetPrimitive.Dialog
        data-slot="sheet"
        container={popupContainer()}
        onOpenChange={handle}
        {...props}
      />
    </ClosingContent>
  )
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.DialogTrigger>) {
  return (
    <SheetPrimitive.DialogTrigger
      {...props}
      render={slotRender(
        slotOf(props, "sheet-trigger"),
        "button",
        props.render
      )}
    />
  )
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.DialogClose>) {
  return (
    <SheetPrimitive.DialogClose
      {...props}
      render={slotRender(slotOf(props, "sheet-close"), "button", props.render)}
    />
  )
}

/** Base UI's portal, which ui-sdk's content does itself: its children as they are. */
function SheetPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function SheetOverlay({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SheetPrimitive.DialogBackdrop>,
  "className"
> & { sx?: Sx }) {
  return (
    <SheetPrimitive.DialogBackdrop
      {...props}
      render={slotRender(slotOf(props, "sheet-overlay"), "div", props.render)}
      {...styleProps(sheet.overlay, sx)}
    />
  )
}

function SheetContent({
  sx,
  children,
  side = "right",
  showCloseButton = true,
  ref,
  ...props
}: Omit<
  React.ComponentProps<typeof SheetPrimitive.DialogContent>,
  "className" | "children"
> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  sx?: Sx
} & { children?: React.ReactNode }) {
  const closing = useClosingContent(ref)
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.DialogContent
        data-side={side}
        {...props}
        ref={closing}
        render={slotRender(slotOf(props, "sheet-content"), "div", props.render)}
        {...styleProps(sheet.content, sheet.side[side], sx)}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.DialogClose
            render={slotRender(
              "sheet-close",
              "button",
              <Button variant="ghost" size="icon-sm" sx={sheet.close} />
            )}
          >
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
            <span sx={visuallyHidden}>Close</span>
          </SheetPrimitive.DialogClose>
        )}
      </SheetPrimitive.DialogContent>
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
}: Omit<
  React.ComponentProps<typeof SheetPrimitive.DialogTitle>,
  "className"
> & { sx?: Sx }) {
  return (
    <SheetPrimitive.DialogTitle
      {...props}
      render={slotRender(slotOf(props, "sheet-title"), "h2", props.render)}
      {...styleProps(sheet.title, sx)}
    />
  )
}

function SheetDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SheetPrimitive.DialogDescription>,
  "className"
> & { sx?: Sx }) {
  return (
    <SheetPrimitive.DialogDescription
      {...props}
      render={slotRender(slotOf(props, "sheet-description"), "p", props.render)}
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
