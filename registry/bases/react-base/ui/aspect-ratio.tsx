import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { aspectRatio } from "../../../styles/aspect-ratio.styles"

function AspectRatio({
  ratio,
  sx,
  style,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & {
  ratio: number
  sx?: Sx
}) {
  return (
    <div
      data-slot="aspect-ratio"
      // The ratio, as upstream hands it to its style.
      style={{ "--ratio": ratio, ...style } as React.CSSProperties}
      {...props}
      sx={[aspectRatio, sx]}
    />
  )
}

export { AspectRatio }
