import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { AlertDialog as AlertDialogPrimitive } from "@kirana-ui/solid/alert-dialog"
import { asRender } from "../../../lib/solid/element"
import { Button } from "./button"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { button } from "../../../styles/button.styles"
import type { AsChild } from "../../../lib/solid/element"

/**
 * Kirana UI's alert dialog, taking the Ark UI parts' props: `open`, `defaultOpen` and
 * `onOpenChange` (given `{ open }`). It renders no element; a press outside does not close it.
 */
function AlertDialog(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, , rest] = splitProps(
    props,
    ["onOpenChange", "children"],
    ["sx", "class"]
  )
  return (
    <AlertDialogPrimitive.Root
      {...rest}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
    </AlertDialogPrimitive.Root>
  )
}

function AlertDialogAction(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <Button
      data-slot="alert-dialog-action"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      {local.children}
    </Button>
  )
}

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

function AlertDialogCancel(props: {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "outline", size: "default" } as const, props),
    ["variant", "size", "class", "sx", "children"]
  )
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      {...rest}
      render={(childProps) => (
        <Button
          {...childProps()}
          variant={local.variant}
          size={local.size}
          class={local.class}
          sx={[local.sx]}
        >
          {local.children}
        </Button>
      )}
    />
  )
}

function AlertDialogContent(props: {
  size?: "default" | "sm"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["size", "class", "sx", "children"]
  )
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={local.size}
        {...rest}
        {...styleProps(local.class, modalMotion, alertDialog.content, local.sx)}
      >
        {local.children}
      </AlertDialogPrimitive.Popup>
    </AlertDialogPrimitive.Portal>
  )
}

function AlertDialogDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      {...rest}
      {...styleProps(local.class, alertDialog.description, local.sx)}
    >
      {local.children}
    </AlertDialogPrimitive.Description>
  )
}

function AlertDialogFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="alert-dialog-footer"
      {...rest}
      {...styleProps(local.class, alertDialog.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AlertDialogHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="alert-dialog-header"
      {...rest}
      {...styleProps(local.class, alertDialog.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AlertDialogMedia(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="alert-dialog-media"
      {...rest}
      {...styleProps(local.class, alertDialog.media, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AlertDialogOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      {...rest}
      {...styleProps(
        local.class,
        backdropMotion,
        alertDialog.overlay,
        local.sx
      )}
      render={asRender(local.asChild)}
    />
  )
}

function AlertDialogTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      {...rest}
      {...styleProps(local.class, alertDialog.title, local.sx)}
    >
      {local.children}
    </AlertDialogPrimitive.Title>
  )
}

function AlertDialogTrigger(props: {
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
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </AlertDialogPrimitive.Trigger>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
}
