import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ToggleRoot } from "@ark-ui/solid"
import { toggle, toggleScope } from "../../../styles/toggle.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { ToggleRootProps } from "@ark-ui/solid"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

function Toggle(props: {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  asChild?: ToggleRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", size: "default" } as const, props),
    ["variant", "size", "asChild", "class", "sx", "children"]
  )
  return (
    <ToggleRoot
      asChild={local.asChild}
      data-slot="toggle"
      {...rest}
      {...styleProps(
        local.class,
        toggleScope.anchor,
        toggle({ variant: local.variant, size: local.size }),
        local.sx
      )}
    >
      {local.children}
    </ToggleRoot>
  )
}

export { Toggle }
export { toggle as toggleVariants } from "../../../styles/toggle.styles"
