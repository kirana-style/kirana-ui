import * as React from "react"
import { mergeProps, useRender } from "@kirana-ui/react/use-render"
import type { PartComponentProps } from "@kirana-ui/react/runtime"
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
}: Omit<
  PartComponentProps<
    "div",
    { slot: string; variant: MarkerVariants["variant"] }
  >,
  "className"
> &
  MarkerVariants & { sx?: Sx }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps(
      styleProps(marker.scope, marker.root({ variant }), sx),
      props
    ),
    render,
    state: { slot: "marker", variant },
  })
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
