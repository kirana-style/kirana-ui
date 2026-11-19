<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import { css } from "@kirana-style/core"
  import { duration, easing, space } from "../../../../core/scales"
  import { chart } from "../../../../styles/chart.styles"

  let {
    indicator = "dot",
    label,
    payload,
    hideLabel,
    hideIndicator,
    class: className
  }: {
    indicator?: "line" | "dot" | "dashed"
    label: string
    payload: { name: string; value: number; fill: string }[]
    hideLabel?: boolean
    hideIndicator?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    // `transition-all ease-in-out hover:-translate-y-0.5`, over the Chart's tooltip.
    tooltip: css({
      transitionProperty: "all",
      transitionTimingFunction: easing.inOut,
      transitionDuration: duration[150],
      translate: { ":hover": `0 calc(${space["0.5"]} * -1)` },
    }),
  }

  const nestLabel = $derived(payload.length === 1 && indicator !== "dot")
</script>

{#if !!payload.length}
  <div class={className} sx={[chart.tooltip, styles.tooltip]}>
    {#if !nestLabel && !hideLabel}
      <div sx={chart.tooltipLabel}>
        {label}
      </div>
    {/if}
    <div sx={chart.tooltipRows}>
      {#each payload as item (item.name)}
        <div sx={[chart.tooltipRow, indicator === 'dot' && chart.tooltipRowDot]}>
          {#if !hideIndicator}
            <div sx={[
              chart.indicator,
              indicator === 'dot' && chart.indicatorDot,
              indicator === 'line' && chart.indicatorLine,
              indicator === 'dashed' && chart.indicatorDashed,
              nestLabel && indicator === 'dashed' && chart.indicatorNested,
            ]} style:--color-bg={item.fill} style:--color-border={item.fill}></div>
          {/if}
          <div sx={[
              chart.tooltipBody,
              nestLabel ? chart.tooltipBodyNested : chart.tooltipBodyFlat,
            ]}>
            <div sx={chart.tooltipNames}>
              {#if nestLabel && !hideLabel}
                <div sx={chart.tooltipLabel}>
                  {label}
                </div>
              {/if}
              <span sx={chart.tooltipName}>
                {item.name}
              </span>
            </div>
            <span sx={chart.tooltipValue}>
              {item.value.toLocaleString()}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
