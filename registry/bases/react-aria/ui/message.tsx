import type * as React from "react"

import type { Sx } from "../../../lib/sx"
import { message } from "../../../styles/message.styles"

type Div = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function MessageGroup({ sx, ...props }: Div) {
  return <div data-slot="message-group" {...props} sx={[message.group, sx]} />
}

function Message({
  sx,
  align = "start",
  ...props
}: Div & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      {...props}
      sx={[message.root, sx]}
    />
  )
}

function MessageAvatar({ sx, ...props }: Div) {
  return <div data-slot="message-avatar" {...props} sx={[message.avatar, sx]} />
}

function MessageContent({ sx, ...props }: Div) {
  return (
    <div data-slot="message-content" {...props} sx={[message.content, sx]} />
  )
}

function MessageHeader({ sx, ...props }: Div) {
  return <div data-slot="message-header" {...props} sx={[message.header, sx]} />
}

function MessageFooter({ sx, ...props }: Div) {
  return <div data-slot="message-footer" {...props} sx={[message.footer, sx]} />
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
}
