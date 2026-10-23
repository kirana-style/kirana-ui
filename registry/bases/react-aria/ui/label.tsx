"use client"

import { props as styleProps } from "@kirana-style/core"
import { LabelContext, Label as LabelPrimitive } from "react-aria-components"
import type { LabelProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { label } from "../../../styles/label.styles"

function Label({
  sx,
  htmlFor,
  slot,
  ...props
}: Omit<LabelProps, "className" | "style"> & { sx?: Sx }) {
  const element = (
    <LabelPrimitive
      data-slot="label"
      {...props}
      {...styleProps(label, sx)}
      htmlFor={htmlFor}
      slot={slot}
    />
  )
  // A label pointed at a control by `htmlFor`, outside a React Aria field, labels that control
  // rather than the field around it.
  if (htmlFor && slot === undefined) {
    return <LabelContext.Provider value={null}>{element}</LabelContext.Provider>
  }
  return element
}

export { Label }
