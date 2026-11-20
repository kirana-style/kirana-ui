<script lang="ts">
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import { css } from "@kirana-style/core"
  import { space } from "../../../../core/scales"
  import type { Test } from "./types"

  const styles = {
    testRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  let { test }: { test: Test } = $props()
</script>

{#if test.status === 'failed'}
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
        </TraceIcon>
        <TraceTitle>
          {test.name}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.testRowCodeBlockContent}>{test.error}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine>
    <TraceIcon>
      {#if test.status === 'skipped'}
        <IconPlaceholder lucide="CircleDashedIcon" tabler="IconCircleDashed" hugeicons="DashedLineCircleIcon" phosphor="CircleDashedIcon" remixicon="RiLoaderLine" />
      {:else}
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      {/if}
    </TraceIcon>
    <TraceTitle>
      {test.status === "skipped" ? `Skipped ${test.name}` : test.name}
    </TraceTitle>
  </TraceLine>
{/if}
