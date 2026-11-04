import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent as ArkDialogContent,
  DialogDescription as ArkDialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle as ArkDialogTitle,
  DialogTrigger as ArkDialogTrigger,
} from "@ark-ui/solid"
import { Portal } from "solid-js/web"
import { IconPlaceholder } from "./icon-placeholder"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogTriggerProps,
} from "@ark-ui/solid"

function Dialog(props: {
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, ["children", "sx", "class"])
  return (
    <DialogRoot lazyMount unmountOnExit {...rest}>
      {local.children}
    </DialogRoot>
  )
}

function DialogClose(props: {
  asChild?: DialogCloseTriggerProps["asChild"]
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
    <DialogCloseTrigger
      asChild={local.asChild}
      data-slot="dialog-close"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DialogCloseTrigger>
  )
}

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
    <Portal>
      <DialogOverlay />
      <DialogPositioner>
        <ArkDialogContent
          data-slot="dialog-content"
          {...rest}
          {...styleProps(local.class, modalMotion, dialog.content, local.sx)}
        >
          {local.children}
          <Show when={local.showCloseButton}>
            <>
              <DialogCloseTrigger
                data-slot="dialog-close"
                asChild={(childProps) => (
                  <Button
                    {...childProps()}
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
            </>
          </Show>
        </ArkDialogContent>
      </DialogPositioner>
    </Portal>
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
    <ArkDialogDescription
      asChild={(childProps) => (
        <p
          {...childProps()}
          data-slot="dialog-description"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            dialog.description,
            local.sx
          )}
        >
          {local.children}
        </p>
      )}
    />
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
        <>
          <DialogCloseTrigger
            asChild={(childProps) => (
              <Button {...childProps()} variant="outline">
                Close
              </Button>
            )}
          />
        </>
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
  asChild?: DialogBackdropProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DialogBackdrop
      asChild={local.asChild}
      data-slot="dialog-overlay"
      {...rest}
      {...styleProps(local.class, backdropMotion, dialog.overlay, local.sx)}
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
    <ArkDialogTitle
      data-slot="dialog-title"
      {...rest}
      {...styleProps(local.class, dialog.title, local.sx)}
    >
      {local.children}
    </ArkDialogTitle>
  )
}

function DialogTrigger(props: {
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
    <ArkDialogTrigger
      asChild={local.asChild}
      data-slot="dialog-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkDialogTrigger>
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
