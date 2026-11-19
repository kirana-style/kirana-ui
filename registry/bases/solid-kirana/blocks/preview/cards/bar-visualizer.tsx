import { For, createMemo, mergeProps, splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { duration, easing, space } from "../../../../../core/scales"
import {
  useBarAnimator,
  useFakeVolume,
  useMultibandVolume,
} from "./use-bar-visualizer"
import type { Sx } from "@kirana-style/core"
import type { AgentState } from "./use-bar-visualizer"

export function BarVisualizer(props: {
  state?: AgentState
  barCount?: number
  mediaStream?: MediaStream | null
  minHeight?: number
  maxHeight?: number
  demo?: boolean
  centerAlign?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        barCount: 15,
        minHeight: 20,
        maxHeight: 100,
        demo: false,
        centerAlign: false,
      } as const,
      props
    ),
    [
      "state",
      "barCount",
      "mediaStream",
      "minHeight",
      "maxHeight",
      "demo",
      "centerAlign",
      "class",
      "sx",
    ]
  )
  /** Tailwind's `animate-pulse`. */
  const pulse = keyframes({ "50%": { opacity: 0.5 } })

  const styles = {
    bar: css({
      maxWidth: "12px",
      minWidth: "8px",
      flex: "1 1 0%",
      transitionDuration: duration[150],
      transitionProperty: "all",
      transitionTimingFunction: easing.inOut,
      borderRadius: radius.full,
      backgroundColor: {
        base: theme.border,
        '[data-highlighted="true"]': theme.chart3,
      },
    }),
    speaking: css({ backgroundColor: theme.chart3 }),
    thinking: css({
      animationDuration: "2s",
      animationIterationCount: "infinite",
      animationName: pulse,
      animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    }),
    root: css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      gap: space["1.5"],
    }),
    center: css({ alignItems: "center" }),
    end: css({ alignItems: "flex-end" }),
    box: css({
      height: space[32],
      width: "100%",
      overflow: "hidden",
      borderRadius: radius.lg,
      backgroundColor: theme.muted,
      padding: space[4],
    }),
  }

  const realVolumeBands = useMultibandVolume(() => local.mediaStream, {
    bands: local.barCount,
    loPass: 100,
    hiPass: 200,
  })
  const fakeVolumeBands = useFakeVolume(
    () => local.demo,
    () => local.state,
    () => local.barCount
  )
  const volumeBands = createMemo(() =>
    local.demo ? fakeVolumeBands() : realVolumeBands()
  )

  const highlighted = useBarAnimator(
    () => local.state,
    () => local.barCount,
    () =>
      local.state === "connecting"
        ? 2000 / local.barCount
        : local.state === "thinking"
          ? 150
          : local.state === "listening"
            ? 500
            : 1000
  )

  const heightOf = (volume: number) =>
    Math.min(local.maxHeight, Math.max(local.minHeight, volume * 100 + 5))

  return (
    <div
      data-state={local.state}
      {...rest}
      {...styleProps(
        local.class,
        styles.root,
        local.centerAlign ? styles.center : styles.end,
        styles.box,
        local.sx
      )}
    >
      <For each={volumeBands()}>
        {(volume, index) => (
          <>
            <div
              data-highlighted={highlighted().includes(index())}
              sx={[
                styles.bar,
                local.state === "speaking" && styles.speaking,
                local.state === "thinking" &&
                  highlighted().includes(index()) &&
                  styles.thinking,
              ]}
              style={{
                height: `${heightOf(volume)}%`,
                "animation-duration":
                  local.state === "thinking" ? "300ms" : undefined,
              }}
            />
          </>
        )}
      </For>
    </div>
  )
}
