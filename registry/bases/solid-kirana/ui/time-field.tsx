import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { TimeField as TimeFieldPrimitive } from "@kirana-ui/solid/time-field"
import type {
  InputProps,
  RootProps,
  SegmentProps,
  SegmentsProps,
} from "@kirana-ui/solid/time-field"
import type { Sx } from "@kirana-style/core"

import { input } from "../../../styles/input.styles"
import { timeField } from "../../../styles/time-field.styles"

type Styled<P> = Omit<P, "class"> & { class?: string; sx?: Sx }

/** The field, drawn as an Input; it draws its segments and hidden input unless given children. */
function TimeField(props: Styled<RootProps>) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <TimeFieldPrimitive.Root
      data-slot="time-field"
      {...rest}
      {...styleProps(props.class, input, timeField.root, props.sx)}
    >
      {"children" in props ? (
        props.children
      ) : (
        <>
          <TimeFieldSegments />
          <TimeFieldInput />
        </>
      )}
    </TimeFieldPrimitive.Root>
  )
}

/** The time's segments, in the locale's order: each drawn as a `TimeFieldSegment` unless given a function. */
function TimeFieldSegments(props: Partial<SegmentsProps>) {
  return (
    <TimeFieldPrimitive.Segments>
      {props.children ?? ((segment) => <TimeFieldSegment segment={segment} />)}
    </TimeFieldPrimitive.Segments>
  )
}

function TimeFieldSegment(props: Styled<SegmentProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <TimeFieldPrimitive.Segment
      data-slot="time-field-segment"
      {...rest}
      {...styleProps(props.class, timeField.segment, props.sx)}
    />
  )
}

/** The hidden input the time is submitted by. */
function TimeFieldInput(props: InputProps) {
  return <TimeFieldPrimitive.Input data-slot="time-field-input" {...props} />
}

export { TimeField, TimeFieldSegments, TimeFieldSegment, TimeFieldInput }
