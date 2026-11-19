import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Element } from "../../../lib/solid/element"
import { badge } from "../../../styles/badge.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge(props: {
  variant?: BadgeVariants["variant"]
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default" } as const, props),
    ["variant", "asChild", "class", "sx", "children"]
  )
  return (
    <Element
      as="span"
      data-slot="badge"
      data-variant={local.variant}
      {...rest}
      {...styleProps(local.class, badge({ variant: local.variant }), local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </Element>
  )
}

export { Badge }
export { badge as badgeVariants } from "../../../styles/badge.styles"
