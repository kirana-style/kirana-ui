<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css, keyframes } from "@kirana-style/core"

  import { radius, theme } from "../../../../../core/tokens"
  import { duration, easing, space } from "../../../../../core/scales"
  import {
    useBarAnimator,
    useFakeVolume,
    useMultibandVolume,
  } from "./bar-visualizer.svelte"
  import type { AgentState } from "./bar-visualizer.svelte"

  let {
    state,
    barCount = 15,
    mediaStream,
    minHeight = 20,
    maxHeight = 100,
    demo = false,
    centerAlign = false,
    class: className,
    ...rest
  }: {
    state?: AgentState
    barCount?: number
    mediaStream?: MediaStream | null
    minHeight?: number
    maxHeight?: number
    demo?: boolean
    centerAlign?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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

  const realVolumeBands = useMultibandVolume(() => mediaStream, {
    // svelte-ignore state_referenced_locally
    bands: barCount,
    loPass: 100,
    hiPass: 200,
  })
  const fakeVolumeBands = useFakeVolume(
    () => demo,
    () => state,
    () => barCount
  )
  const volumeBands = $derived(demo ? fakeVolumeBands.current : realVolumeBands.current)

  const highlighted = useBarAnimator(
    () => state,
    () => barCount,
    () =>
      state === "connecting"
        ? 2000 / barCount
        : state === "thinking"
          ? 150
          : state === "listening"
            ? 500
            : 1000
  )

  const heightOf = (volume: number) =>
    Math.min(maxHeight, Math.max(minHeight, volume * 100 + 5))
</script>

<div data-state={state} {...rest} sx={[styles.root, centerAlign ? styles.center : styles.end, styles.box, className as Sx]}>
  {#each volumeBands as volume, index (index)}
    <div data-highlighted={highlighted.current.includes(index)} sx={[
        styles.bar,
        state === 'speaking' && styles.speaking,
        state === 'thinking' && highlighted.current.includes(index) && styles.thinking,
      ]} style:height={`${heightOf(volume)}%`} style:animation-duration={state === 'thinking' ? '300ms' : undefined}></div>
  {/each}
</div>
