import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { attachment } from "../../../styles/attachment.styles"
import { Button } from "./button"
import { ark } from "@ark-ui/solid"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"
import type { button } from "../../../styles/button.styles"

function Attachment(props: {
  state?: "idle" | "uploading" | "processing" | "error" | "done"
  size?: "default" | "sm" | "xs"
  orientation?: "horizontal" | "vertical"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { state: "done", size: "default", orientation: "horizontal" } as const,
      props
    ),
    ["state", "size", "orientation", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="attachment"
      data-state={local.state}
      data-size={local.size}
      data-orientation={local.orientation}
      {...rest}
      {...styleProps(local.class, attachment.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

function AttachmentAction(props: {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "ghost", size: "icon-xs" } as const, props),
    ["variant", "size", "class", "sx", "children"]
  )
  return (
    <Button
      data-slot="attachment-action"
      variant={local.variant}
      size={local.size}
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      {local.children}
    </Button>
  )
}

function AttachmentActions(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="attachment-actions"
      {...rest}
      {...styleProps(local.class, attachment.actions, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AttachmentContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="attachment-content"
      {...rest}
      {...styleProps(local.class, attachment.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AttachmentDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="attachment-description"
      {...rest}
      {...styleProps(local.class, attachment.description, local.sx)}
    >
      {local.children}
    </span>
  )
}

function AttachmentGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="attachment-group"
      {...rest}
      {...styleProps(local.class, attachment.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AttachmentMedia(props: {
  variant?: "icon" | "image"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "icon" } as const, props),
    ["variant", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="attachment-media"
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        attachment.media,
        local.variant === "image" && attachment.mediaImage,
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

function AttachmentTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="attachment-title"
      {...rest}
      {...styleProps(
        local.class,
        attachment.title,
        attachment.titleWorking,
        local.sx
      )}
    >
      {local.children}
    </span>
  )
}

function AttachmentTrigger(props: {
  type?: "button" | "submit" | "reset"
  asChild?: PolymorphicProps<"button">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "type",
    "class",
    "sx",
    "children",
  ])
  return (
    <ark.button
      data-slot="attachment-trigger"
      type={local.asChild ? local.type : (local.type ?? "button")}
      {...rest}
      {...styleProps(local.class, attachment.trigger, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.button>
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
}
