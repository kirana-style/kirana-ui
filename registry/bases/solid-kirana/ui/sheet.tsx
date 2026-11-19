import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Dialog as DialogPrimitive } from "@kirana-ui/solid/dialog"
import { asRender } from "../../../lib/solid/element"
import { IconPlaceholder } from "./icon-placeholder"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/**
 * Kirana UI's dialog as a sheet, taking the Ark UI parts' props: `open`, `defaultOpen`,
 * `onOpenChange` (given `{ open }`), `modal`, and `closeOnInteractOutside` (the root's
 * `dismissible`). It renders no element.
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

function SheetClose(props: {
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
      data-slot="sheet-close"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
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
  const [local, rest] = splitProps(
    mergeProps({ side: "right", showCloseButton: true } as const, props),
    ["side", "showCloseButton", "class", "sx", "children"]
  )
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        data-side={local.side}
        {...rest}
        {...styleProps(
          local.class,
          sheet.content,
          sheet.side[local.side],
          local.sx
        )}
      >
        {local.children}
        <Show when={local.showCloseButton}>
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      {...rest}
      {...styleProps(local.class, sheet.description, local.sx)}
    >
      {local.children}
    </DialogPrimitive.Description>
  )
}

function SheetFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sheet-footer"
      {...rest}
      {...styleProps(local.class, sheet.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SheetHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sheet-header"
      {...rest}
      {...styleProps(local.class, sheet.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SheetOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DialogPrimitive.Backdrop
      data-slot="sheet-overlay"
      {...rest}
      {...styleProps(local.class, sheet.overlay, local.sx)}
      render={asRender(local.asChild)}
    />
  )
}

function SheetTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      {...rest}
      {...styleProps(local.class, sheet.title, local.sx)}
    >
      {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <DialogPrimitive.Trigger
      data-slot="sheet-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
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
