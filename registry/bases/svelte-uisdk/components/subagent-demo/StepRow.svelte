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
  import { css, keyframes } from "@kirana-style/core"
  import { space } from "../../../../core/scales"
  import type { SubagentPart } from "./types"

  let { part, running }: {
    part: Extract<SubagentPart, { type: "tool-runCommand" }>
    running: boolean
  } = $props()

  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    stepRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  const command = $derived.by(() => part.input?.command)
</script>

{#if part.state === 'output-available'}
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
        </TraceIcon>
        <TraceTitle>
          Ran {command}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.output.stdout}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={running ? 'running' : 'error'}>
    <TraceIcon>
      {#if running}
        <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.stepRowIconPlaceholder} />
      {:else}
        <IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" />
      {/if}
    </TraceIcon>
    <TraceTitle>
      {running ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{/if}
