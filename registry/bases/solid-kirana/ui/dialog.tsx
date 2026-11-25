import { Show, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Dialog as DialogPrimitive } from "@kirana-ui/solid/dialog"
import { asRender } from "../../../lib/solid2/element"
import { IconPlaceholder } from "./icon-placeholder"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's dialog, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange` (given
 * `{ open }`), `modal`, and `closeOnInteractOutside` (`false` is the root's
 * `disablePointerDismissal`). It renders no element.
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
  const rest = omit(
    props,
    "onOpenChange",
    "closeOnInteractOutside",
    "children",
    "sx",
    "class"
  )
  return (
    <DialogPrimitive.Root
      {...rest}
      disablePointerDismissal={props.closeOnInteractOutside === false}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
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
  const rest = omit(props, "showCloseButton", "class", "sx", "children")
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        {...rest}
        {...styleProps(props.class, modalMotion, dialog.content, props.sx)}
      >
        {props.children}
        <Show when={props.showCloseButton ?? true}>
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
  const rest = omit(props, "class", "sx", "children")
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      {...rest}
      {...styleProps(props.class, dialog.description, props.sx)}
    >
      {props.children}
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
  const rest = omit(props, "showCloseButton", "class", "sx", "children")
  return (
    <div
      data-slot="dialog-footer"
      {...rest}
      {...styleProps(props.class, dialog.footer, props.sx)}
    >
      {props.children}
      <Show when={props.showCloseButton}>
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
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="dialog-header"
      {...rest}
      {...styleProps(props.class, dialog.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function DialogOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      {...rest}
      {...styleProps(props.class, backdropMotion, dialog.overlay, props.sx)}
      render={asRender(props.asChild)}
    />
  )
}

function DialogTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      {...rest}
      {...styleProps(props.class, dialog.title, props.sx)}
    >
      {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
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
