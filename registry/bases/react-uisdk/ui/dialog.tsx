"use client"

import * as React from "react"
import * as DialogPrimitive from "@ui-sdk/react/dialog"
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
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

/**
 * Base UI's Dialog root on ui-sdk's, which renders its content in the body, as Base UI's portal
 * does, and ends the content's scroll-driven animations as it closes (LF-024).
 */
function Dialog({
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Dialog>) {
  const [content, handle] = useClosingRoot(onOpenChange)
  return (
    <ClosingContent value={content}>
      <DialogPrimitive.Dialog
        data-slot="dialog"
        container={popupContainer()}
        onOpenChange={handle}
        {...props}
      />
    </ClosingContent>
  )
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.DialogTrigger>
) {
  return (
    <DialogPrimitive.DialogTrigger
      {...props}
      render={slotRender(
        slotOf(props, "dialog-trigger"),
        "button",
        props.render
      )}
    />
  )
}

/** Base UI's portal, which ui-sdk's content does itself: its children as they are. */
function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DialogClose(
  props: React.ComponentProps<typeof DialogPrimitive.DialogClose>
) {
  return (
    <DialogPrimitive.DialogClose
      {...props}
      render={slotRender(slotOf(props, "dialog-close"), "button", props.render)}
    />
  )
}

function DialogOverlay({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DialogPrimitive.DialogBackdrop>,
  "className"
> & { sx?: Sx }) {
  return (
    <DialogPrimitive.DialogBackdrop
      {...props}
      render={slotRender(slotOf(props, "dialog-overlay"), "div", props.render)}
      {...styleProps(backdropMotion, dialog.overlay, sx)}
    />
  )
}

function DialogContent({
  sx,
  children,
  showCloseButton = true,
  ref,
  ...props
}: Omit<
  React.ComponentProps<typeof DialogPrimitive.DialogContent>,
  "className" | "children"
> & {
  children?: React.ReactNode
  showCloseButton?: boolean
  sx?: Sx
}) {
  const closing = useClosingContent(ref)
  return (
    <>
      <DialogOverlay />
      <DialogPrimitive.DialogContent
        {...props}
        ref={closing}
        render={slotRender(
          slotOf(props, "dialog-content"),
          "div",
          props.render
        )}
        {...styleProps(modalMotion, dialog.content, sx)}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.DialogClose
            render={slotRender(
              "dialog-close",
              "button",
              <Button variant="ghost" size="icon-sm" sx={dialog.close} />
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
          </DialogPrimitive.DialogClose>
        )}
      </DialogPrimitive.DialogContent>
    </>
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
        <DialogPrimitive.DialogClose render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.DialogClose>
      )}
    </div>
  )
}

function DialogTitle({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DialogPrimitive.DialogTitle>,
  "className"
> & { sx?: Sx }) {
  return (
    <DialogPrimitive.DialogTitle
      {...props}
      render={slotRender(slotOf(props, "dialog-title"), "h2", props.render)}
      {...styleProps(dialog.title, sx)}
    />
  )
}

function DialogDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof DialogPrimitive.DialogDescription>,
  "className"
> & { sx?: Sx }) {
  return (
    <DialogPrimitive.DialogDescription
      {...props}
      render={slotRender(
        slotOf(props, "dialog-description"),
        "p",
        props.render
      )}
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
