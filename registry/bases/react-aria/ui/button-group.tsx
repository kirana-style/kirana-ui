import * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { buttonGroup } from "../../../styles/button-group.styles"
import { Separator } from "./separator"

type ButtonGroupVariants = NonNullable<Parameters<typeof buttonGroup.root>[0]>

function ButtonGroup({
  sx,
  orientation,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> &
  ButtonGroupVariants & { sx?: Sx }) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      {...props}
      sx={[buttonGroup.root({ orientation }), buttonGroup.width, sx]}
    />
  )
}

function ButtonGroupText({
  sx,
  render,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & {
  sx?: Sx
  render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode
}) {
  const own = {
    "data-slot": "button-group-text",
    ...props,
    ...styleProps(buttonGroup.text, sx),
  }
  if (render) return render(own)
  return <div {...own} />
}

function ButtonGroupSeparator({
  sx,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
      sx={[buttonGroup.separator, sx]}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroup as buttonGroupVariants,
}
