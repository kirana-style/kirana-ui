import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ark } from "@ark-ui/solid"
import { badge } from "../../../styles/badge.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge(props: {
  variant?: BadgeVariants["variant"]
  asChild?: PolymorphicProps<"span">["asChild"]
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
    <ark.span
      data-slot="badge"
      data-variant={local.variant}
      {...rest}
      {...styleProps(local.class, badge({ variant: local.variant }), local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.span>
  )
}

export { Badge }
export { badge as badgeVariants } from "../../../styles/badge.styles"
