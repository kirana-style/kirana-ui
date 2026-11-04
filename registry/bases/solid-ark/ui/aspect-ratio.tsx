import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { aspectRatio } from "../../../styles/aspect-ratio.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function AspectRatio(props: {
  ratio: number
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["ratio", "class", "sx", "children"])
  const own = () => styleProps(local.class, aspectRatio, local.sx)
  return (
    <div
      data-slot="aspect-ratio"
      {...rest}
      class={own().class}
      // The ratio, as upstream hands it to its style.
      style={{ ...own().style, "--ratio": String(local.ratio) }}
    >
      {local.children}
    </div>
  )
}

export { AspectRatio }
