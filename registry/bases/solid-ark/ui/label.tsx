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
  return (
    <label
      data-slot="label"
      {...rest}
      {...styleProps(local.class, label, local.sx)}
    >
      {local.children}
    </label>
  )
}

export { Label }
