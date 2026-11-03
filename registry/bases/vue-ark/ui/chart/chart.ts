/**
 * Vue's chart config and the keys its parts read; the helpers that need no framework are
 * `lib/chart.ts`, re-exported here.
 */
import type { ChartPoint } from "@tanstack/charts"
import type { Component, InjectionKey, Ref } from "vue"

export * from "../../../../lib/chart"

const THEMES = ["light", "dark"] as const

export type ChartConfig = Record<
  string,
  {
    label?: string
    icon?: Component
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<(typeof THEMES)[number], string> }
  )
>

/** The chart's config, which its tooltip and legend read. */
export const CHART: InjectionKey<{ config: ChartConfig }> = Symbol("chart")
/** The focused points the tooltip body shows, set by `ChartContainer` for each focus. */
export const POINTS: InjectionKey<Ref<readonly ChartPoint[]>> =
  Symbol("chart-points")
