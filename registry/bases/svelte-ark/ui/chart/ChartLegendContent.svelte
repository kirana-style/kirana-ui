<script lang="ts">
  import { getContext } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { chart as styles } from "../../../../styles/chart.styles"
  import { CHART } from "./chart"
  import type { ChartContext } from "./chart"

  let {
    hideIcon = false,
    verticalAlign = "bottom",
    keys,
    class: className,
    ...rest
  }: {
    hideIcon?: boolean
    verticalAlign?: "top" | "bottom"
    /** The series to list, in order; by default every config entry with a colour. */
    keys?: readonly string[]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const chart = getContext<ChartContext | undefined>(CHART)
  const config = $derived.by(() => chart?.config ?? {})
  const entries = $derived.by(() => (keys ?? Object.keys(config)).filter(
      (key) => config[key]?.color || config[key]?.theme
    )
  )
</script>

{#if entries.length}
  <div {...rest} sx={[styles.legend, verticalAlign === 'top' ? styles.legendTop : styles.legendBottom, className as Sx]}>
    {#each entries as key (key)}
      <div sx={styles.legendItem}>
        {#if config[key]!.icon && !hideIcon}
          {@const Icon = config[key]!.icon}
          <Icon />
        {:else}
          <div sx={styles.legendSwatch} style:--color-bg={`var(--color-${key})`}></div>
        {/if}
        {config[key]!.label}
      </div>
    {/each}
  </div>
{/if}
