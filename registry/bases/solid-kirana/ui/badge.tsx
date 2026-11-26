import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Primitive } from "@kirana-ui/solid/primitive"
import { asRender } from "../../../lib/solid2/element"
import { badge } from "../../../styles/badge.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"
import { withDefaults } from "../../../lib/solid2/with-defaults"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge(props: {
  variant?: BadgeVariants["variant"]
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults({ variant: "default" } as const, props)
  const rest = omit(local, "variant", "asChild", "class", "sx", "children")
  return (
    <Primitive
      as="span"
      data-slot="badge"
      data-variant={local.variant}
      {...rest}
      {...styleProps(local.class, badge({ variant: local.variant }), local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Primitive>
  )
}

export { Badge }
export { badge as badgeVariants } from "../../../styles/badge.styles"
