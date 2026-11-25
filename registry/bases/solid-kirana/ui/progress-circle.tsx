import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Progress as ProgressPrimitive } from "@kirana-ui/solid/progress"
import type { RootProps, ValueProps } from "@kirana-ui/solid/progress"
import type { Sx } from "@kirana-style/core"

import {
  progressCircle,
  progressCircleParts,
} from "../../../styles/progress-circle.styles"

type ProgressCircleVariants = NonNullable<Parameters<typeof progressCircle>[0]>

type Styled<P> = Omit<P, "class"> & { class?: string; sx?: Sx }

/** The value's share of the range, from 0 to 1, or `undefined` while it is not known. */
function shareOf(value: number | null, min = 0, max = 100) {
  if (value === null || max <= min) return undefined
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

/** The whole range: a ring in the progress track's colour. */
function ProgressCircleTrack(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <circle
      data-slot="progress-circle-track"
      pathLength="100"
      {...rest}
      {...styleProps(props.class, progressCircleParts.track, props.sx)}
    />
  )
}

/** The filled part: an arc as long as the value's share of the range. */
function ProgressCircleIndicator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <circle
      data-slot="progress-circle-indicator"
      pathLength="100"
      {...rest}
      {...styleProps(props.class, progressCircleParts.indicator, props.sx)}
    />
  )
}

/** The value, written (a percentage of the range by default), for the middle of the ring. */
function ProgressCircleLabel(props: Styled<ValueProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <ProgressPrimitive.Value
      data-slot="progress-circle-label"
      {...rest}
      {...styleProps(props.class, progressCircleParts.label, props.sx)}
    />
  )
}

/** A progress ring: draws its track and its arc, and `children` in the middle. */
function ProgressCircle(
  props: Styled<Omit<RootProps, "style">> & ProgressCircleVariants
) {
  const rest = omit(props, "class", "sx", "size", "children")
  const size = () => props.size ?? "default"
  const share = () => shareOf(props.value, props.min, props.max)
  const own = () =>
    styleProps(
      props.class,
      progressCircleParts.scope,
      progressCircle({ size: size() }),
      props.sx
    )
  return (
    <ProgressPrimitive.Root
      data-slot="progress-circle"
      data-size={size()}
      {...rest}
      class={own().class}
      // The value's share of the range, which the arc is drawn from.
      style={
        share() === undefined
          ? own().style
          : { ...own().style, "--progress-circle-value": String(share()) }
      }
    >
      <svg
        data-slot="progress-circle-svg"
        aria-hidden="true"
        sx={progressCircleParts.svg}
      >
        <ProgressCircleTrack />
        <ProgressCircleIndicator />
      </svg>
      {props.children}
    </ProgressPrimitive.Root>
  )
}

export {
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleIndicator,
  ProgressCircleLabel,
  progressCircle as progressCircleVariants,
}
export type { ProgressCircleVariants }
