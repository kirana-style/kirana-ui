import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { message } from "../../../styles/message.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Message(props: {
  align?: "start" | "end"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ align: "start" } as const, props),
    ["align", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="message"
      data-align={local.align}
      {...rest}
      {...styleProps(local.class, message.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

function MessageAvatar(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="message-avatar"
      {...rest}
      {...styleProps(local.class, message.avatar, local.sx)}
    >
      {local.children}
    </div>
  )
}

function MessageContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="message-content"
      {...rest}
      {...styleProps(local.class, message.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function MessageFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="message-footer"
      {...rest}
      {...styleProps(local.class, message.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function MessageGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="message-group"
      {...rest}
      {...styleProps(local.class, message.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function MessageHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="message-header"
      {...rest}
      {...styleProps(local.class, message.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
}
