/**
 * Svelte's chart config and the keys its parts read; the helpers that need no framework are
 * `lib/chart.ts`, re-exported here.
 */
import type { ChartPoint } from "@tanstack/charts"
import type { Component } from "svelte"

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

/** The chart's config, which its tooltip and legend read: a getter, so they follow it. */
export const CHART = Symbol("chart")
export type ChartContext = { readonly config: ChartConfig }
/** The focused points the tooltip body shows, set by `ChartContainer` for each focus. */
export const POINTS = Symbol("chart-points")
export type PointsContext = { readonly points: readonly ChartPoint[] }
