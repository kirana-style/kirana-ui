import { createContext, omit, useContext } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogTrigger as AlertDialogTriggerPrimitive,
} from "@ui-sdk/solid/alert-dialog"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import type { AsChild } from "../../../lib/solid2/element"
import {
  endScrollAnimations,
  popupContainer,
  UisdkPart,
} from "../../../lib/solid2/uisdk-part"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import type { button } from "../../../styles/button.styles"
import { Button } from "./button"

/** The open alert dialog's content, whose scroll-driven animations end as it closes (LF-024). */
type ContentHolder = { el: HTMLElement | null }

const ContentContext = createContext<ContentHolder | null>(null)

/**
 * ui-sdk's alert dialog, which an outside press does not close, taking Ark UI's root's props:
 * `open` is given with `onOpenChange` called with `{ open }`, as Solid's Ark UI parts take it. It
 * renders no element; its popup renders in the body, as Base UI's portal puts it, and as it closes
 * its content's scroll-driven animations end (LF-024).
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
  const content: ContentHolder = { el: null }
  return (
    <ContentContext value={content}>
      <AlertDialogPrimitive
        container={popupContainer()}
        {...rest}
        onOpenChange={(open: boolean) => {
          // Before ui-sdk gathers what its exit waits for.
          if (!open) endScrollAnimations(content.el)
          props.onOpenChange?.({ open })
        }}
      >
        {props.children}
      </AlertDialogPrimitive>
    </ContentContext>
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
  // ui-sdk's close, drawn as the registry's Button.
  return (
    <UisdkPart
      part={AlertDialogClose}
      slotName="alert-dialog-cancel"
      tag="button"
      {...rest}
      asChild={(childProps) => (
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
  const rest = omit(props, "size", "class", "sx", "children", "ref")
  const content = useContext(ContentContext)
  return (
    <>
      <AlertDialogOverlay />
      <UisdkPart
        part={AlertDialogContentPrimitive}
        slotName="alert-dialog-content"
        tag="div"
        data-size={props.size ?? "default"}
        ref={[
          props.ref as JSX.Ref<HTMLElement>,
          (el: HTMLElement) => content && (content.el = el),
        ]}
        {...rest}
        {...styleProps(props.class, modalMotion, alertDialog.content, props.sx)}
      >
        {props.children}
      </UisdkPart>
    </>
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
    <UisdkPart
      part={AlertDialogDescriptionPrimitive}
      slotName="alert-dialog-description"
      tag="p"
      {...rest}
      {...styleProps(props.class, alertDialog.description, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
    <UisdkPart
      part={AlertDialogBackdrop}
      slotName="alert-dialog-overlay"
      tag="div"
      asChild={props.asChild}
      {...rest}
      {...styleProps(
        props.class,
        backdropMotion,
        alertDialog.overlay,
        props.sx
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
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={AlertDialogTitlePrimitive}
      slotName="alert-dialog-title"
      tag="h2"
      {...rest}
      {...styleProps(props.class, alertDialog.title, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
    <UisdkPart
      part={AlertDialogTriggerPrimitive}
      slotName="alert-dialog-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
