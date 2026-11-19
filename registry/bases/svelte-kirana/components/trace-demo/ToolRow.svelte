<script lang="ts">
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
  import { css, keyframes } from "@kirana-style/core"
  import type { Part } from "./types"

  let { part, streaming, defaultOpen }: {
    part: Extract<Part, { type: "tool-runCommand" }>
    streaming: boolean
    defaultOpen?: boolean
  } = $props()

  // Tailwind's `spin`.
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    codeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    spin: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  const command = $derived.by(() => part.input?.command)
  const done = $derived.by(
    () =>
      part.state === "output-available" ||
      part.state === "output-error"
  )
  const failed = $derived.by(() => part.state === "output-error")
  const errorText = $derived.by(() => part.state === "output-error" ? part.errorText : ""
  )
  const stdout = $derived.by(() => part.state === "output-available" ? part.output.stdout : ""
  )
</script>

{#if done}
  <TraceCollapsible defaultOpen={defaultOpen}>
    <TraceCollapsibleTrigger>
      <TraceLine status={failed ? 'error' : undefined}>
        <TraceIcon>
          {#if failed}
            <IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" />
          {:else}
            <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
          {/if}
        </TraceIcon>
        <TraceTitle>
          {failed ? "Failed to run" : "Ran"} {command}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      {#if failed}
        <CodeBlock size="sm" variant="destructive">
          <CodeBlockContent wrap sx={styles.codeBlockContent}>{errorText}</CodeBlockContent>
        </CodeBlock>
      {:else}
        <CodeBlock size="sm">
          <CodeBlockContent wrap sx={styles.codeBlockContent}>{stdout}</CodeBlockContent>
        </CodeBlock>
      {/if}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={streaming ? 'running' : 'error'}>
    <TraceIcon>
      {#if streaming}
        <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.spin} />
      {:else}
        <IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" />
      {/if}
    </TraceIcon>
    <TraceTitle>
      {streaming ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{/if}
