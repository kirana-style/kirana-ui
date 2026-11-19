import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { label } from "../../../styles/label.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Label(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  // A caller's class after the label's own, as upstream's `cn(…, className)`: a part that renders
  // as the label (`asChild`, a button group's text) hands its class, whose type wins.
  return (
    <label
      data-slot="label"
      {...rest}
      {...styleProps(label, local.class, local.sx)}
    >
      {local.children}
    </label>
  )
}

export { Label }
