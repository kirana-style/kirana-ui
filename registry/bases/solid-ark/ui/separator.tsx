import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { separator } from "../../../styles/separator.styles"
import type { Sx } from "@kirana-style/core"

function Separator(props: {
  orientation?: "horizontal" | "vertical"
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ orientation: "horizontal" } as const, props),
    ["orientation", "class", "sx"]
  )
  return (
    <div
      data-slot="separator"
      role="separator"
      aria-orientation={local.orientation}
      data-orientation={local.orientation}
      {...rest}
      {...styleProps(local.class, separator, local.sx)}
    />
  )
}

export { Separator }
