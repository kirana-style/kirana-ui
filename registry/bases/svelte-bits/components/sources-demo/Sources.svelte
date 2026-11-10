<script lang="ts" module>
  export type SourcePart = Extract<
    UIMessage["parts"][number],
    { type: "source-url" }
  >
</script>

<script lang="ts">

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import type { UIMessage } from "ai"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import { css } from "@kirana-style/core"


  const styles = {
    sourcesSpan: css({
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


  let { sources }: { sources: SourcePart[] } = $props()

  const hostname = (url: string) => new URL(url).hostname
</script>

<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="GlobeIcon" tabler="IconGlobe" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobeLine" />
        </TraceIcon>
        <TraceTitle>
          Used {sources.length} sources
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        {#each sources as source (source.url)}
          <a href={source.url} target="_blank" rel="noreferrer">
            <TraceLine>
              <TraceTitle>
                {source.title ?? hostname(source.url)}
                <span sx={styles.sourcesSpan}>
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
</Trace>
