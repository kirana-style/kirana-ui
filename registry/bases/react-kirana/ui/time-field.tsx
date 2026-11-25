"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { TimeField as TimeFieldPrimitive } from "@kirana-ui/react/time-field"

import type { Sx } from "../../../lib/sx"
import { input } from "../../../styles/input.styles"
import { timeField } from "../../../styles/time-field.styles"

type El<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

/** The field, drawn as an Input; it draws its segments and hidden input unless given children. */
function TimeField({
  sx,
  children,
  ...props
}: El<typeof TimeFieldPrimitive.Root>) {
  return (
    <TimeFieldPrimitive.Root
      data-slot="time-field"
      {...props}
      {...styleProps(input, timeField.root, sx)}
    >
      {children ?? (
        <>
          <TimeFieldSegments />
          <TimeFieldInput />
        </>
      )}
    </TimeFieldPrimitive.Root>
  )
}

/** The time's segments, in the locale's order: each drawn as a `TimeFieldSegment` unless given a function. */
function TimeFieldSegments({
  children,
}: Partial<React.ComponentProps<typeof TimeFieldPrimitive.Segments>>) {
  return (
    <TimeFieldPrimitive.Segments>
      {children ?? ((segment) => <TimeFieldSegment segment={segment} />)}
    </TimeFieldPrimitive.Segments>
  )
}

function TimeFieldSegment({
  sx,
  ...props
}: El<typeof TimeFieldPrimitive.Segment>) {
  return (
    <TimeFieldPrimitive.Segment
      data-slot="time-field-segment"
      {...props}
      {...styleProps(timeField.segment, sx)}
    />
  )
}

/** The hidden input the time is submitted by. */
function TimeFieldInput(
  props: Omit<
    React.ComponentProps<typeof TimeFieldPrimitive.Input>,
    "className"
  >
) {
  return <TimeFieldPrimitive.Input data-slot="time-field-input" {...props} />
}

export { TimeField, TimeFieldSegments, TimeFieldSegment, TimeFieldInput }
