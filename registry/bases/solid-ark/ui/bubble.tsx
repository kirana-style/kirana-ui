import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { bubble } from "../../../styles/bubble.styles"
import { ark } from "@ark-ui/solid"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

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
  asChild?: PolymorphicProps<"div">["asChild"]
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
    <ark.div
      data-slot="bubble-content"
      {...rest}
      {...styleProps(local.class, bubble.content, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.div>
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
