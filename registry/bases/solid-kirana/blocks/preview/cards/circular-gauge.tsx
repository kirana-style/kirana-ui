import { createMemo, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { duration, easing } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function CircularGauge(props: {
  percentage: number
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["percentage", "sx", "class"])
  const styles = {
    circularGaugeSvg: css({
      rotate: "calc(90deg * -1)",
    }),
    circularGaugeCircle: css({
      opacity: "20%",
    }),
    circularGaugeCircle2: css({
      transitionDuration: duration[300],
      transitionProperty: "all",
      transitionTimingFunction: easing.inOut,
    }),
  }

  const normalizedPercentage = createMemo(() =>
    Math.min(Math.max(local.percentage, 0), 100)
  )
  const circumference = 2 * Math.PI * 42.5
  const strokePercent = createMemo(
    () => (normalizedPercentage() / 100) * circumference
  )

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      width="16"
      stroke-width="2"
      viewBox="0 0 100 100"
      sx={styles.circularGaugeSvg}
    >
      <circle
        cx="50"
        cy="50"
        r="42.5"
        stroke-width="12"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        sx={styles.circularGaugeCircle}
        stroke="currentColor"
        style={{ "stroke-dasharray": `${circumference} ${circumference}` }}
      />
      <circle
        cx="50"
        cy="50"
        r="42.5"
        stroke-width="12"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
        sx={styles.circularGaugeCircle2}
        style={{ "stroke-dasharray": `${strokePercent()} ${circumference}` }}
      />
    </svg>
  )
}
