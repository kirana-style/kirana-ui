import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { textarea } from "../../../styles/textarea.styles"

function Textarea({
  sx,
  ...props
}: Omit<React.ComponentProps<"textarea">, "className"> & { sx?: Sx }) {
  return <textarea data-slot="textarea" {...props} sx={[textarea, sx]} />
}

export { Textarea }
