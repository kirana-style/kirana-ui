import * as React from "react"
import { Input as InputPrimitive } from "@ui-sdk/react/input"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { input } from "../../../styles/input.styles"

type InputProps = React.ComponentProps<typeof InputPrimitive>

/** Base UI's Input's props, whose value may be a number, as an `<input>`'s; ui-sdk's is a string. */
function Input({
  sx,
  type,
  value,
  defaultValue,
  ...props
}: Omit<InputProps, "className" | "value" | "defaultValue"> & {
  sx?: Sx
  value?: string | number
  defaultValue?: string | number
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      value={value === undefined ? undefined : String(value)}
      defaultValue={
        defaultValue === undefined ? undefined : String(defaultValue)
      }
      {...props}
      {...styleProps(input, sx)}
    />
  )
}

export { Input }
