import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { omit } from "solid-js"
import type { JSX } from "@solidjs/web"

import { skeleton } from "../../../styles/skeleton.styles"

function Skeleton(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
  }
) {
  const local = props
  const rest = omit(props, "class", "sx")
  return (
    <div
      data-slot="skeleton"
      {...rest}
      {...styleProps(local.class, skeleton, local.sx)}
    />
  )
}

export { Skeleton }
