import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@ark-ui/solid"
import { Button } from "./button"
import { Portal } from "solid-js/web"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { button } from "../../../styles/button.styles"
import type { DialogBackdropProps, DialogTriggerProps } from "@ark-ui/solid"

function AlertDialog(props: {
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, ["children", "sx", "class"])
  return (
    <DialogRoot
      role="alertdialog"
      closeOnInteractOutside={false}
      lazyMount
      unmountOnExit
      {...rest}
    >
      {local.children}
    </DialogRoot>
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
    <DialogCloseTrigger
      data-slot="alert-dialog-cancel"
      {...rest}
      asChild={(childProps) => (
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
    <Portal>
      <AlertDialogOverlay />
      <DialogPositioner>
        <DialogContent
          data-slot="alert-dialog-content"
          data-size={local.size}
          {...rest}
          {...styleProps(
            local.class,
            modalMotion,
            alertDialog.content,
            local.sx
          )}
        >
          {local.children}
        </DialogContent>
      </DialogPositioner>
    </Portal>
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
    <DialogDescription
      asChild={(childProps) => (
        <p
          {...childProps()}
          data-slot="alert-dialog-description"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            alertDialog.description,
            local.sx
          )}
        >
          {local.children}
        </p>
      )}
    />
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
  asChild?: DialogBackdropProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DialogBackdrop
      asChild={local.asChild}
      data-slot="alert-dialog-overlay"
      {...rest}
      {...styleProps(
        local.class,
        backdropMotion,
        alertDialog.overlay,
        local.sx
      )}
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
    <DialogTitle
      data-slot="alert-dialog-title"
      {...rest}
      {...styleProps(local.class, alertDialog.title, local.sx)}
    >
      {local.children}
    </DialogTitle>
  )
}

function AlertDialogTrigger(props: {
  asChild?: DialogTriggerProps["asChild"]
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
    <DialogTrigger
      asChild={local.asChild}
      data-slot="alert-dialog-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DialogTrigger>
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
