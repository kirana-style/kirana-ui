import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Dialog as DialogPrimitive } from "@kirana-ui/solid/dialog"
import { asRender } from "../../../lib/solid/element"
import { IconPlaceholder } from "./icon-placeholder"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/**
 * Kirana UI's dialog, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange` (given
 * `{ open }`), `modal`, and `closeOnInteractOutside` (the root's `dismissible`). It renders no
 * element.
 */
function Dialog(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  modal?: boolean
  closeOnInteractOutside?: boolean
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, , rest] = splitProps(
    props,
    ["onOpenChange", "closeOnInteractOutside", "children"],
    ["sx", "class"]
  )
  return (
    <DialogPrimitive.Root
      {...rest}
      dismissible={local.closeOnInteractOutside}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
    </DialogPrimitive.Root>
  )
}

function DialogClose(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </DialogPrimitive.Close>
  )
}

/** The popup in the page's portal beside its backdrop: the design places it, no positioner. */
function DialogContent(props: {
  showCloseButton?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ showCloseButton: true } as const, props),
    ["showCloseButton", "class", "sx", "children"]
  )
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        {...rest}
        {...styleProps(local.class, modalMotion, dialog.content, local.sx)}
      >
        {local.children}
        <Show when={local.showCloseButton}>
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={(closeProps) => (
              <Button
                {...closeProps()}
                variant="ghost"
                size="icon-sm"
                sx={dialog.close}
              >
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
                <span sx={visuallyHidden}>Close</span>
              </Button>
            )}
          />
        </Show>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function DialogDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      {...rest}
      {...styleProps(local.class, dialog.description, local.sx)}
    >
      {local.children}
    </DialogPrimitive.Description>
  )
}

function DialogFooter(props: {
  showCloseButton?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ showCloseButton: false } as const, props),
    ["showCloseButton", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="dialog-footer"
      {...rest}
      {...styleProps(local.class, dialog.footer, local.sx)}
    >
      {local.children}
      <Show when={local.showCloseButton}>
        <DialogPrimitive.Close
          render={(closeProps) => (
            <Button {...closeProps()} variant="outline">
              Close
            </Button>
          )}
        />
      </Show>
    </div>
  )
}

function DialogHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="dialog-header"
      {...rest}
      {...styleProps(local.class, dialog.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function DialogOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      {...rest}
      {...styleProps(local.class, backdropMotion, dialog.overlay, local.sx)}
      render={asRender(local.asChild)}
    />
  )
}

function DialogTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      {...rest}
      {...styleProps(local.class, dialog.title, local.sx)}
    >
      {local.children}
    </DialogPrimitive.Title>
  )
}

function DialogTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </DialogPrimitive.Trigger>
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
  DialogTitle,
  DialogTrigger,
}
