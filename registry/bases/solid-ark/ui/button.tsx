import { splitProps } from "solid-js"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

import { button } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> &
  ButtonVariants & { sx?: Sx }

/**
 * Upstream trims each run of text to its capitals (React's and Vue's Button wrap each in a label);
 * Solid's children are not inspected here yet, so a label is not wrapped.
 */
function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["variant", "size", "sx", "children"])
  return (
    <button
      data-slot="button"
      data-variant={local.variant ?? "default"}
      data-size={local.size ?? "default"}
      {...rest}
      sx={[button({ variant: local.variant, size: local.size }), local.sx]}
    >
      {local.children}
    </button>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
