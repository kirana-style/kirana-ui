import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { input } from "../../../styles/input.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

function Input(
  props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class" | "value"> & {
    value?: string | number
    class?: string
    sx?: Sx
  }
) {
  const local = props
  const rest = omit(props, "value", "class", "sx")
  /** `value`, as on a native one, its changes the caller's `onInput`. */
  return (
    <input
      data-slot="input"
      value={local.value}
      {...rest}
      {...styleProps(local.class, input, local.sx)}
    />
  )
}

export { Input }
