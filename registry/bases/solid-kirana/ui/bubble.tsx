import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { bubble } from "../../../styles/bubble.styles"
import { Primitive } from "@kirana-ui/solid/primitive"
import { asRender } from "../../../lib/solid/element"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

function Bubble(props: {
  variant?:
    | "default"
    | "secondary"
    | "muted"
    | "tinted"
    | "outline"
    | "ghost"
    | "destructive"
  align?: "start" | "end"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", align: "start" } as const, props),
    ["variant", "align", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="bubble"
      data-variant={local.variant}
      data-align={local.align}
      {...rest}
      {...styleProps(local.class, bubble.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

function BubbleContent(props: {
  asChild?: AsChild<"div">
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
    <Primitive
      as="div"
      data-slot="bubble-content"
      {...rest}
      {...styleProps(local.class, bubble.content, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Primitive>
  )
}

function BubbleGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="bubble-group"
      {...rest}
      {...styleProps(local.class, bubble.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function BubbleReactions(props: {
  side?: "top" | "bottom"
  align?: "start" | "end"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ side: "bottom", align: "end" } as const, props),
    ["side", "align", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="bubble-reactions"
      data-align={local.align}
      data-side={local.side}
      {...rest}
      {...styleProps(local.class, bubble.reactions, local.sx)}
    >
      {local.children}
    </div>
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
