import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { PartProps } from "@ui-sdk/react/primitive"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { badge } from "../../../styles/badge.styles"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge({
  sx,
  variant = "default",
  render,
  ...props
}: Omit<PartProps<"span">, "className"> & BadgeVariants & { sx?: Sx }) {
  return renderElement(
    "span",
    mergeProps(
      { "data-slot": "badge", "data-variant": variant },
      styleProps(badge({ variant }), sx),
      props
    ),
    render
  )
}

export { Badge, badge as badgeVariants }
