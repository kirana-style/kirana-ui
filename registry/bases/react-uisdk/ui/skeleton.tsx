import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { skeleton } from "../../../styles/skeleton.styles"

function Skeleton({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="skeleton" {...props} sx={[skeleton, sx]} />
}

export { Skeleton }
