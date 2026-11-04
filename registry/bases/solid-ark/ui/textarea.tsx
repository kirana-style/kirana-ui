import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { textarea } from "../../../styles/textarea.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Textarea(
  props: Omit<
    JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "class" | "value"
  > & {
    value?: string | number
    class?: string
    sx?: Sx
  }
) {
  const [local, rest] = splitProps(props, ["value", "class", "sx"])
  /** `value`, as on a native one, its changes the caller's `onInput`. */
  return (
    <textarea
      data-slot="textarea"
      value={local.value}
      {...rest}
      {...styleProps(local.class, textarea, local.sx)}
    />
  )
}

export { Textarea }
