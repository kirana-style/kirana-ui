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
  import type { ToolPart } from "./types"

  let { part, streaming, defaultOpen }: {
    part: ToolPart
    streaming: boolean
    defaultOpen?: boolean
  } = $props()

  const styles = {
    toolRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = $derived.by(() => part.input?.command)
</script>

{#if part.state === 'output-available' || part.state === 'output-error'}
  <TraceCollapsible defaultOpen={defaultOpen}>
    <TraceCollapsibleTrigger>
      <TraceLine status={part.state === 'output-error' ? 'error' : undefined}>
        <TraceIcon>
          <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
        </TraceIcon>
        <TraceTitle>
          {part.state === "output-error" ? "Failed to run" : "Ran"} {command}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent}>{part.state === "output-error" ? part.errorText : part.output.stdout}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={streaming ? 'running' : 'error'}>
    <TraceIcon>
      <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
    </TraceIcon>
    <TraceTitle>
      {streaming ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{/if}
