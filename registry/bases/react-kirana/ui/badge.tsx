import { mergeProps, useRender } from "../../../lib/kirana-render"
import type { RenderProps } from "../../../lib/kirana-render"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { badge } from "../../../styles/badge.styles"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge({
  sx,
  variant = "default",
  render,
  ...props
}: Omit<RenderProps<"span">, "className"> & BadgeVariants & { sx?: Sx }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(styleProps(badge({ variant }), sx), props),
    render,
    state: { slot: "badge", variant },
  })
}

export { Badge, badge as badgeVariants }
