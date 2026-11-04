import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ark } from "@ark-ui/solid"
import { marker } from "../../../styles/marker.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

type MarkerVariants = NonNullable<Parameters<typeof marker.root>[0]>

function Marker(props: {
  variant?: MarkerVariants["variant"]
  asChild?: PolymorphicProps<"div">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default" } as const, props),
    ["variant", "asChild", "class", "sx", "children"]
  )
  return (
    <ark.div
      data-slot="marker"
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        marker.scope,
        marker.root({ variant: local.variant }),
        local.sx
      )}
      asChild={local.asChild}
    >
      {local.children}
    </ark.div>
  )
}

function MarkerContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="marker-content"
      {...rest}
      {...styleProps(local.class, marker.content, local.sx)}
    >
      {local.children}
    </span>
  )
}

function MarkerIcon(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      {...rest}
      {...styleProps(local.class, marker.icon, local.sx)}
    >
      {local.children}
    </span>
  )
}

export { Marker, MarkerIcon, MarkerContent }
export { marker as markerVariants } from "../../../styles/marker.styles"
