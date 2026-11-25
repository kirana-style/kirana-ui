import { Show, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Dialog as DialogPrimitive } from "@kirana-ui/solid/dialog"
import { asRender } from "../../../lib/solid2/element"
import { IconPlaceholder } from "./icon-placeholder"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's dialog as a sheet, taking the Ark UI parts' props: `open`, `defaultOpen`,
 * `onOpenChange` (given `{ open }`), `modal`, and `closeOnInteractOutside` (`false` is the root's
 * `disablePointerDismissal`). It renders no element.
 */
function Sheet(props: {
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

function SheetClose(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </DialogPrimitive.Close>
  )
}

/** The popup in the page's portal beside its backdrop: the design places it, no positioner. */
function SheetContent(props: {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "side", "showCloseButton", "class", "sx", "children")
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        data-side={props.side ?? "right"}
        {...rest}
        {...styleProps(
          props.class,
          sheet.content,
          sheet.side[props.side ?? "right"],
          props.sx
        )}
      >
        {props.children}
        <Show when={props.showCloseButton ?? true}>
          <DialogPrimitive.Close
            data-slot="sheet-close"
            render={(closeProps) => (
              <Button
                {...closeProps()}
                variant="ghost"
                size="icon-sm"
                sx={sheet.close}
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

function SheetDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      {...rest}
      {...styleProps(props.class, sheet.description, props.sx)}
    >
      {props.children}
    </DialogPrimitive.Description>
  )
}

function SheetFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sheet-footer"
      {...rest}
      {...styleProps(props.class, sheet.footer, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SheetHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sheet-header"
      {...rest}
      {...styleProps(props.class, sheet.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SheetOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <DialogPrimitive.Backdrop
      data-slot="sheet-overlay"
      {...rest}
      {...styleProps(props.class, sheet.overlay, props.sx)}
      render={asRender(props.asChild)}
    />
  )
}

function SheetTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      {...rest}
      {...styleProps(props.class, sheet.title, props.sx)}
    >
      {props.children}
    </DialogPrimitive.Title>
  )
}

function SheetTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <DialogPrimitive.Trigger
      data-slot="sheet-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </DialogPrimitive.Trigger>
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
}
