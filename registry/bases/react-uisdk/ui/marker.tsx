import * as React from "react"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { PartProps } from "@ui-sdk/react/primitive"
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
}: Omit<PartProps<"div">, "className"> & MarkerVariants & { sx?: Sx }) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "marker", "data-variant": variant },
      styleProps(marker.scope, marker.root({ variant }), sx),
      props
    ),
    render
  )
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
