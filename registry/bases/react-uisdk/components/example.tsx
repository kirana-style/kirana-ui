import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { example } from "../../../styles/example.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function ExampleWrapper({ sx, ...props }: El) {
  return (
    <div sx={example.page}>
      <div data-slot="example-wrapper" {...props} sx={[example.wrapper, sx]} />
    </div>
  )
}

function Example({
  title,
  children,
  sx,
  containerSx,
  ...props
}: El & {
  title?: string
  containerSx?: Sx
}) {
  return (
    <div data-slot="example" {...props} sx={[example.root, containerSx]}>
      {title && <div sx={example.title}>{title}</div>}
      <div data-slot="example-content" sx={[example.content, sx]}>
        {children}
      </div>
    </div>
  )
}

export { ExampleWrapper, Example }
