<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import { css, keyframes } from "@kirana-style/core"
  import type { Part } from "./types"

  let {
    sources,
    running,
    class: className,
    ...rest
  }: {
    sources: Extract<Part, { type: "source-url" }>[]
    running: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // Tailwind's `spin`.
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const hostname = (url: string) => new URL(url).hostname

  const styles = {
    sourcesRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
    sourcesRowSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
  }
</script>

<TraceCollapsible {...rest} sx={[className as Sx]}>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? 'running' : undefined}>
      <TraceIcon>
        {#if running}
          <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.sourcesRowIconPlaceholder} />
        {:else}
          <IconPlaceholder lucide="GlobeIcon" tabler="IconGlobe" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobeLine" />
        {/if}
      </TraceIcon>
      <TraceTitle>
        {running ? "Using" : "Used"} {sources.length} sources
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>
      {#each sources as source (source.url)}
        <a href={source.url} target="_blank" rel="noreferrer">
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="GlobeIcon" tabler="IconGlobe" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobeLine" />
            </TraceIcon>
            <TraceTitle>
              {source.title ?? hostname(source.url)}
              <span sx={styles.sourcesRowSpan}>
                (opens in a new tab)
              </span>
            </TraceTitle>
            <TraceIcon>
              <IconPlaceholder lucide="ArrowUpRightIcon" tabler="IconArrowUpRight" hugeicons="ArrowUpRightIcon" phosphor="ArrowUpRightIcon" remixicon="RiArrowRightUpLine" />
            </TraceIcon>
          </TraceLine>
        </a>
      {/each}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
