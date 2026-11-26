import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Primitive } from "@kirana-ui/solid/primitive"
import { asRender } from "../../../lib/solid2/element"
import { marker } from "../../../styles/marker.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"
import { withDefaults } from "../../../lib/solid2/with-defaults"

type MarkerVariants = NonNullable<Parameters<typeof marker.root>[0]>

function Marker(props: {
  variant?: MarkerVariants["variant"]
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults({ variant: "default" } as const, props)
  const rest = omit(local, "variant", "asChild", "class", "sx", "children")
  return (
    <Primitive
      as="div"
      data-slot="marker"
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        marker.scope,
        marker.root({ variant: local.variant }),
        local.sx
      )}
      render={asRender(local.asChild)}
    >
      {local.children}
    </Primitive>
  )
}

function MarkerContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
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
  const local = props
  const rest = omit(props, "class", "sx", "children")
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
