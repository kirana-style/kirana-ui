import { mergeProps, useRender } from "@kirana-ui/react/use-render"
import type { PartComponentProps } from "@kirana-ui/react/runtime"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { badge } from "../../../styles/badge.styles"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge({
  sx,
  variant = "default",
  render,
  ...props
}: Omit<
  PartComponentProps<
    "span",
    { slot: string; variant: BadgeVariants["variant"] }
  >,
  "className"
> &
  BadgeVariants & { sx?: Sx }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(styleProps(badge({ variant }), sx), props),
    render,
    state: { slot: "badge", variant },
  })
}

export { Badge, badge as badgeVariants }
