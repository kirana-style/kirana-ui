<script setup lang="ts">
import { css, keyframes } from "@kirana-style/core"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { radius, theme } from "../../../../../core/tokens"
import { duration, easing, space } from "../../../../../core/scales"
import {
  useBarAnimator,
  useFakeVolume,
  useMultibandVolume,
} from "./bar-visualizer"
import type { AgentState } from "./bar-visualizer"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    state?: AgentState
    barCount?: number
    mediaStream?: MediaStream | null
    minHeight?: number
    maxHeight?: number
    demo?: boolean
    centerAlign?: boolean
  }>(),
  {
    barCount: 15,
    minHeight: 20,
    maxHeight: 100,
    demo: false,
    centerAlign: false,
  }
)
const { sx, attrs } = useSx()

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

const realVolumeBands = useMultibandVolume(() => props.mediaStream, {
  bands: props.barCount,
  loPass: 100,
  hiPass: 200,
})
const fakeVolumeBands = useFakeVolume(
  () => props.demo,
  () => props.state,
  () => props.barCount
)
const volumeBands = computed(() =>
  props.demo ? fakeVolumeBands.value : realVolumeBands.value
)

const highlighted = useBarAnimator(
  () => props.state,
  () => props.barCount,
  () =>
    props.state === "connecting"
      ? 2000 / props.barCount
      : props.state === "thinking"
        ? 150
        : props.state === "listening"
          ? 500
          : 1000
)

const heightOf = (volume: number) =>
  Math.min(props.maxHeight, Math.max(props.minHeight, volume * 100 + 5))
</script>

<template>
  <div
    :data-state="state"
    v-bind="attrs"
    :sx="[
      styles.root,
      centerAlign ? styles.center : styles.end,
      styles.box,
      sx,
    ]"
  >
    <div
      v-for="(volume, index) in volumeBands"
      :key="index"
      :data-highlighted="highlighted.includes(index)"
      :sx="[
        styles.bar,
        state === 'speaking' && styles.speaking,
        state === 'thinking' && highlighted.includes(index) && styles.thinking,
      ]"
      :style="{
        height: `${heightOf(volume)}%`,
        animationDuration: state === 'thinking' ? '300ms' : undefined,
      }"
    />
  </div>
</template>
