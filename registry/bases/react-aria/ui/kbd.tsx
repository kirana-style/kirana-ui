"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Keyboard as KbdPrimitive } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { kbd } from "../../../styles/kbd.styles"

type KbdProps = Omit<
  React.ComponentProps<typeof KbdPrimitive>,
  "className" | "style"
> & { sx?: Sx }

function Kbd({ sx, ...props }: KbdProps) {
  return (
    <KbdPrimitive data-slot="kbd" {...props} {...styleProps(kbd.root, sx)} />
  )
}

function KbdGroup({ sx, ...props }: KbdProps) {
  return (
    <KbdPrimitive
      data-slot="kbd-group"
      {...props}
      {...styleProps(kbd.group, sx)}
    />
  )
}

export { Kbd, KbdGroup }
