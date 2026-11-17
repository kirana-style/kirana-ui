import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { kbd } from "../../../styles/kbd.styles"

function Kbd({
  sx,
  ...props
}: Omit<React.ComponentProps<"kbd">, "className"> & { sx?: Sx }) {
  return <kbd data-slot="kbd" {...props} sx={[kbd.root, sx]} />
}

function KbdGroup({
  sx,
  ...props
}: Omit<React.ComponentProps<"kbd">, "className"> & { sx?: Sx }) {
  return <kbd data-slot="kbd-group" {...props} sx={[kbd.group, sx]} />
}

export { Kbd, KbdGroup }
