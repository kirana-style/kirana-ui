import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { input } from "../../../styles/input.styles"

function Input({
  sx,
  type,
  ...props
}: Omit<React.ComponentProps<"input">, "className"> & { sx?: Sx }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      {...props}
      {...styleProps(input, sx)}
    />
  )
}

export { Input }
