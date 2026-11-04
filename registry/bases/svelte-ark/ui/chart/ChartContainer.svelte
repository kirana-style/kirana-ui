<script lang="ts">
  /**
   * The chart, its series colours and its tooltip, in a `16 / 9` box as upstream's `aspect-video`,
   * on TanStack Charts' Svelte `Chart`. Size it as TanStack Charts does: `initialWidth` with
   * `aspectRatio` (by default the box's) or `height`. The tooltip body is the `tooltip` snippet (a
   * `ChartTooltipContent`), the legend under the chart the `legend` snippet.
   */
  import type { DomChartDefinition } from "@tanstack/charts"
  import { Chart } from "@tanstack/charts/svelte"
  import { props as styleProps } from "@kirana-style/core"
  import type { Sx } from "@kirana-style/core"
  import { onMount, setContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { chart as styles } from "../../../../styles/chart.styles"
  import { CHART, seriesColors } from "./chart"
  import type { ChartConfig, ChartContext } from "./chart"
  import ChartPoints from "./ChartPoints.svelte"

  let {
    config,
    definition,
    aspectRatio = 16 / 9,
    height,
    initialWidth,
    ariaLabel,
    tooltip,
    legend,
    class: className,
    ...rest
  }: {
    config: ChartConfig
    // `any`: a caller's definition is of its own data, which `unknown` would refuse.
    // oxlint-disable-next-line no-explicit-any
    definition: DomChartDefinition<any, any, any>
    aspectRatio?: number
    height?: number
    initialWidth?: number
    ariaLabel: string
    /** The tooltip's body: a `ChartTooltipContent`. */
    tooltip?: Snippet
    /** The legend under the chart: a `ChartLegendContent`. */
    legend?: Snippet
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  setContext<ChartContext>(CHART, {
    get config() {
      return config
    },
  })

  /** A style object as the attribute Svelte's `Chart` takes. */
  const css = (style: Record<string, string> | undefined) =>
    Object.entries(style ?? {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ")

  // With a legend and no height, the chart fills what the legend leaves of the box.
  const fill = $derived(!!legend && height === undefined)
  // Drawn at `initialWidth` first; once mounted, and once the page's fonts have come, at the box's
  // width (the marks wait meanwhile: `data-entering`, `chart.container`).
  let box = $state<HTMLDivElement>()
  let width = $state<number>()
  onMount(() => {
    void document.fonts.ready.then(() => {
      width = box?.getBoundingClientRect().width || undefined
    })
  })
  const plot = $derived(styleProps(styles.plot, fill && styles.plotWithLegend))
  const colors = $derived(css(seriesColors(config) as Record<string, string>))
</script>

{#snippet body({ points }: { points: readonly import("@tanstack/charts").ChartPoint[] })}
  <ChartPoints {points}>{@render tooltip?.()}</ChartPoints>
{/snippet}

<div
  bind:this={box}
  data-slot="chart"
  data-entering={width === undefined ? "" : undefined}
  {...rest}
  sx={[styles.container, className as Sx]}
  style={colors}
>
  {#if legend}
    <div sx={styles.withLegend}>
      {#key width}
        <Chart
          {definition}
          {ariaLabel}
          {height}
          initialWidth={width ?? initialWidth}
          aspectRatio={height === undefined && !fill ? aspectRatio : undefined}
          class={plot.className}
          style={fill ? `${css(plot.style)}; height: auto` : css(plot.style)}
          tooltipBody={tooltip ? body : undefined}
        />
      {/key}
      {@render legend()}
    </div>
  {:else}
    {#key width}
      <Chart
        {definition}
        {ariaLabel}
        {height}
        initialWidth={width ?? initialWidth}
        aspectRatio={height === undefined ? aspectRatio : undefined}
        class={plot.className}
        style={css(plot.style)}
        tooltipBody={tooltip ? body : undefined}
      />
    {/key}
  {/if}
</div>
