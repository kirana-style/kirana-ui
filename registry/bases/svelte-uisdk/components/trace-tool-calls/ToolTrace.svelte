<script lang="ts">
  import type { DynamicToolUIPart } from "ai"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { space } from "../../../../core/scales"
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

  let { part, live }: {
    part: DynamicToolUIPart; live: boolean
  } = $props()

  const styles = {
    codeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = $derived.by(
    () => (part.input as { command?: string } | undefined)?.command
  )
  const done = $derived.by(
    () =>
      part.state === "output-available" ||
      part.state === "output-error"
  )
  const failed = $derived.by(() => part.state === "output-error")
  const output = $derived.by(() => part.state === "output-error"
      ? part.errorText
      : part.state === "output-available"
        ? (part.output as { stdout: string }).stdout
        : ""
  )
</script>

{#if done}
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine status={failed ? 'error' : undefined}>
        <TraceIcon>
          <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
        </TraceIcon>
        <TraceTitle>
          {failed ? "Failed to run" : "Ran"} {command}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.codeBlockContent}>{output}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else if part.state === 'output-denied'}
  <TraceLine>
    <TraceIcon>
      <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
    </TraceIcon>
    <TraceTitle>
      Denied {command}
    </TraceTitle>
  </TraceLine>
{:else}
  <TraceLine status={live ? 'running' : 'error'}>
    <TraceIcon>
      <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
    </TraceIcon>
    <TraceTitle>
      {live ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{/if}
