import type * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { bubble } from "../../../styles/bubble.styles"

type Div = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive"

function BubbleGroup({ sx, ...props }: Div) {
  return <div data-slot="bubble-group" {...props} sx={[bubble.group, sx]} />
}

function Bubble({
  variant = "default",
  align = "start",
  sx,
  ...props
}: Div & { variant?: BubbleVariant; align?: "start" | "end" }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      {...props}
      sx={[bubble.root, sx]}
    />
  )
}

function BubbleContent({
  sx,
  render,
  children,
  ...props
}: Div & {
  render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode
}) {
  if (render) {
    return render({
      ...props,
      "data-slot": "bubble-content",
      ...styleProps(bubble.content, sx),
      children,
    } as React.HTMLAttributes<HTMLElement>)
  }

  return (
    <div {...props} data-slot="bubble-content" sx={[bubble.content, sx]}>
      {children}
    </div>
  )
}

function BubbleReactions({
  side = "bottom",
  align = "end",
  sx,
  ...props
}: Div & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      {...props}
      sx={[bubble.reactions, sx]}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
