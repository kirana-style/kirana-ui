"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { TextArea as TextareaPrimitive } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { textarea } from "../../../styles/textarea.styles"

function Textarea({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof TextareaPrimitive>,
  "className" | "style"
> & {
  sx?: Sx
}) {
  return (
    <TextareaPrimitive
      data-slot="textarea"
      {...props}
      {...styleProps(textarea, sx)}
    />
  )
}

export { Textarea }
