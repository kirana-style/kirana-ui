import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { kbd } from "../../../styles/kbd.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Kbd(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <kbd
      data-slot="kbd"
      {...rest}
      {...styleProps(local.class, kbd.root, local.sx)}
    >
      {local.children}
    </kbd>
  )
}

function KbdGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <kbd
      data-slot="kbd-group"
      {...rest}
      {...styleProps(local.class, kbd.group, local.sx)}
    >
      {local.children}
    </kbd>
  )
}

export { Kbd, KbdGroup }
