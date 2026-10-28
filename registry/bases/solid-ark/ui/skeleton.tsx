import { splitProps } from "solid-js"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

import { skeleton } from "../../../styles/skeleton.styles"

function Skeleton(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & { sx?: Sx }
) {
  const [local, rest] = splitProps(props, ["sx"])
  return <div data-slot="skeleton" {...rest} sx={[skeleton, local.sx]} />
}

export { Skeleton }
