<script setup lang="ts">
import { css } from "@kirana-style/core"
import { duration, easing } from "../../../../../core/scales"

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

const { percentage } = defineProps<{
  percentage: number
}>()
const normalizedPercentage = Math.min(Math.max(percentage, 0), 100)
const circumference = 2 * Math.PI * 42.5
const strokePercent = (normalizedPercentage / 100) * circumference
</script>

<template>
  <svg
    aria-hidden="true"
    fill="none"
    height="16"
    width="16"
    stroke-width="2"
    viewBox="0 0 100 100"
    :sx="styles.circularGaugeSvg"
  >
    <circle
      cx="50"
      cy="50"
      r="42.5"
      stroke-width="12"
      stroke-dashoffset="0"
      stroke-linecap="round"
      stroke-linejoin="round"
      :sx="styles.circularGaugeCircle"
      stroke="currentColor"
      :style="{
        strokeDasharray: `${circumference} ${circumference}`,
      }"
    ></circle>
    <circle
      cx="50"
      cy="50"
      r="42.5"
      stroke-width="12"
      stroke-dashoffset="0"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="currentColor"
      :sx="styles.circularGaugeCircle2"
      :style="{
        strokeDasharray: `${strokePercent} ${circumference}`,
      }"
    ></circle>
  </svg>
</template>
