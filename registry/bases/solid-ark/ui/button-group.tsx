import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { buttonGroup } from "../../../styles/button-group.styles"
import { Separator } from "./separator"
import { ark } from "@ark-ui/solid"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

type ButtonGroupVariants = NonNullable<Parameters<typeof buttonGroup.root>[0]>

function ButtonGroup(props: {
  orientation?: ButtonGroupVariants["orientation"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "orientation",
    "class",
    "sx",
    "children",
  ])
  return (
    <div
      data-slot="button-group"
      role="group"
      data-orientation={local.orientation}
      {...rest}
      {...styleProps(
        local.class,
        buttonGroup.root({ orientation: local.orientation }),
        buttonGroup.width,
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

function ButtonGroupSeparator(props: {
  orientation?: "horizontal" | "vertical"
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ orientation: "vertical" } as const, props),
    ["orientation", "class", "sx"]
  )
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={local.orientation}
      {...rest}
      class={local.class}
      sx={[buttonGroup.separator, local.sx]}
    />
  )
}

function ButtonGroupText(props: {
  asChild?: PolymorphicProps<"div">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ark.div
      data-slot="button-group-text"
      {...rest}
      {...styleProps(local.class, buttonGroup.text, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.div>
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
export { buttonGroup as buttonGroupVariants } from "../../../styles/button-group.styles"
