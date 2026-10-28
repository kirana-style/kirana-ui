import * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { marker } from "../../../styles/marker.styles"

type El = Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }
type MarkerVariants = NonNullable<Parameters<typeof marker.root>[0]>

function Marker({
  sx,
  variant = "default",
  render,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> &
  MarkerVariants & {
    sx?: Sx
    render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode
  }) {
  const own = {
    ...props,
    "data-slot": "marker",
    "data-variant": variant,
    ...styleProps(marker.scope, marker.root({ variant }), sx),
  }
  if (render) return render(own)
  return <div {...own} />
}

function MarkerIcon({ sx, ...props }: El) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      {...props}
      sx={[marker.icon, sx]}
    />
  )
}

function MarkerContent({ sx, ...props }: El) {
  return (
    <span data-slot="marker-content" {...props} sx={[marker.content, sx]} />
  )
}

export { Marker, MarkerIcon, MarkerContent, marker as markerVariants }
