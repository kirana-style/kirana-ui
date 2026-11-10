<script setup lang="ts">
import { css } from "@kirana-style/core"
import { duration, easing, space } from "../../../../core/scales"
import { chart } from "../../../../styles/chart.styles"

const styles = {
  // `transition-all ease-in-out hover:-translate-y-0.5`, over the Chart's tooltip.
  tooltip: css({
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration[150],
    translate: { ":hover": `0 calc(${space["0.5"]} * -1)` },
  }),
}

const {
  indicator = "dot",
  label,
  payload,
  hideLabel,
  hideIndicator,
} = defineProps<{
  indicator?: "line" | "dot" | "dashed"
  label: string
  payload: { name: string; value: number; fill: string }[]
  hideLabel?: boolean
  hideIndicator?: boolean
}>()
const nestLabel = payload.length === 1 && indicator !== "dot"
</script>

<template>
  <template v-if="!!payload.length">
    <div :sx="[chart.tooltip, styles.tooltip]">
      <div v-if="!nestLabel && !hideLabel" :sx="chart.tooltipLabel">
        {{ label }}
      </div>
      <div :sx="chart.tooltipRows">
        <div
          v-for="item in payload"
          :key="item.name"
          :sx="[chart.tooltipRow, indicator === 'dot' && chart.tooltipRowDot]"
        >
          <div
            v-if="!hideIndicator"
            :sx="[
              chart.indicator,
              indicator === 'dot' && chart.indicatorDot,
              indicator === 'line' && chart.indicatorLine,
              indicator === 'dashed' && chart.indicatorDashed,
              nestLabel && indicator === 'dashed' && chart.indicatorNested,
            ]"
            :style="{
              '--color-bg': item.fill,
              '--color-border': item.fill,
            }"
          ></div>
          <div
            :sx="[
              chart.tooltipBody,
              nestLabel ? chart.tooltipBodyNested : chart.tooltipBodyFlat,
            ]"
          >
            <div :sx="chart.tooltipNames">
              <div v-if="nestLabel && !hideLabel" :sx="chart.tooltipLabel">
                {{ label }}
              </div>
              <span :sx="chart.tooltipName">
                {{ item.name }}
              </span>
            </div>
            <span :sx="chart.tooltipValue">
              {{ item.value.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
