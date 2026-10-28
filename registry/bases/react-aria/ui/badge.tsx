import * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { badge } from "../../../styles/badge.styles"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

function Badge({
  sx,
  variant = "default",
  render,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> &
  BadgeVariants & {
    sx?: Sx
    render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode
  }) {
  const own = {
    "data-slot": "badge",
    "data-variant": variant,
    ...props,
    ...styleProps(badge({ variant }), sx),
  }
  if (render) return render(own)
  return <span {...own} />
}

export { Badge, badge as badgeVariants }
