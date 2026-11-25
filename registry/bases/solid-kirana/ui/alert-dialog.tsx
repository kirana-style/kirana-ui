import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { AlertDialog as AlertDialogPrimitive } from "@kirana-ui/solid/alert-dialog"
import { asRender } from "../../../lib/solid2/element"
import { Button } from "./button"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { button } from "../../../styles/button.styles"
import type { AsChild } from "../../../lib/solid2/element"

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
  const rest = omit(props, "onOpenChange", "children", "sx", "class")
  return (
    <AlertDialogPrimitive.Root
      {...rest}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </AlertDialogPrimitive.Root>
  )
}

function AlertDialogAction(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <Button
      data-slot="alert-dialog-action"
      {...rest}
      class={props.class}
      sx={[props.sx]}
    >
      {props.children}
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
  const rest = omit(props, "variant", "size", "class", "sx", "children")
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      {...rest}
      render={(childProps) => (
        <Button
          {...childProps()}
          variant={props.variant ?? "outline"}
          size={props.size ?? "default"}
          class={props.class}
          sx={[props.sx]}
        >
          {props.children}
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
  const rest = omit(props, "size", "class", "sx", "children")
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={props.size ?? "default"}
        {...rest}
        {...styleProps(props.class, modalMotion, alertDialog.content, props.sx)}
      >
        {props.children}
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
  const rest = omit(props, "class", "sx", "children")
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      {...rest}
      {...styleProps(props.class, alertDialog.description, props.sx)}
    >
      {props.children}
    </AlertDialogPrimitive.Description>
  )
}

function AlertDialogFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="alert-dialog-footer"
      {...rest}
      {...styleProps(props.class, alertDialog.footer, props.sx)}
    >
      {props.children}
    </div>
  )
}

function AlertDialogHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="alert-dialog-header"
      {...rest}
      {...styleProps(props.class, alertDialog.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function AlertDialogMedia(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="alert-dialog-media"
      {...rest}
      {...styleProps(props.class, alertDialog.media, props.sx)}
    >
      {props.children}
    </div>
  )
}

function AlertDialogOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      {...rest}
      {...styleProps(
        props.class,
        backdropMotion,
        alertDialog.overlay,
        props.sx
      )}
      render={asRender(props.asChild)}
    />
  )
}

function AlertDialogTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      {...rest}
      {...styleProps(props.class, alertDialog.title, props.sx)}
    >
      {props.children}
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
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
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
