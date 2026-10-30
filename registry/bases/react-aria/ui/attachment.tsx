import type * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import { Button } from "./button"
import type { Sx } from "../../../lib/sx"
import { attachment } from "../../../styles/attachment.styles"

type Div = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }
type Span = Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }

function Attachment({
  sx,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: Div & {
  state?: "idle" | "uploading" | "processing" | "error" | "done"
  size?: "default" | "sm" | "xs"
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      {...props}
      sx={[attachment.root, sx]}
    />
  )
}

function AttachmentMedia({
  sx,
  variant = "icon",
  ...props
}: Div & { variant?: "icon" | "image" }) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      {...props}
      sx={[attachment.media, variant === "image" && attachment.mediaImage, sx]}
    />
  )
}

function AttachmentContent({ sx, ...props }: Div) {
  return (
    <div
      data-slot="attachment-content"
      {...props}
      sx={[attachment.content, sx]}
    />
  )
}

function AttachmentTitle({ sx, ...props }: Span) {
  return (
    <span
      data-slot="attachment-title"
      {...props}
      sx={[attachment.title, attachment.titleWorking, sx]}
    />
  )
}

function AttachmentDescription({ sx, ...props }: Span) {
  return (
    <span
      data-slot="attachment-description"
      {...props}
      sx={[attachment.description, sx]}
    />
  )
}

function AttachmentActions({ sx, ...props }: Div) {
  return (
    <div
      data-slot="attachment-actions"
      {...props}
      sx={[attachment.actions, sx]}
    />
  )
}

function AttachmentAction({
  variant,
  size = "icon-xs",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      {...props}
    />
  )
}

function AttachmentTrigger({
  sx,
  render,
  type,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "className"> & {
  sx?: Sx
  render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode
}) {
  if (render) {
    return render({
      ...props,
      "data-slot": "attachment-trigger",
      ...styleProps(attachment.trigger, sx),
      children,
    } as React.HTMLAttributes<HTMLElement>)
  }

  return (
    <button
      {...props}
      type={type ?? "button"}
      data-slot="attachment-trigger"
      sx={[attachment.trigger, sx]}
    >
      {children}
    </button>
  )
}

function AttachmentGroup({ sx, ...props }: Div) {
  return (
    <div data-slot="attachment-group" {...props} sx={[attachment.group, sx]} />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
