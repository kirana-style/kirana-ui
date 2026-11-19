import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { splitProps } from "solid-js"
import type { JSX } from "solid-js"

import { skeleton } from "../../../styles/skeleton.styles"

function Skeleton(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
  }
) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <div
      data-slot="skeleton"
      {...rest}
      {...styleProps(local.class, skeleton, local.sx)}
    />
  )
}

export { Skeleton }
