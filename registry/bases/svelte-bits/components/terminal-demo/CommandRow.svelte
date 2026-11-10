<script lang="ts">
  import { untrack } from "svelte"

  import type { ToolPart } from "./types"
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

  let {
    part, output, streaming, defaultOpen }: {
    part: ToolPart
    output: string
    streaming: boolean
    defaultOpen?: boolean
  } = $props()

  const styles = {
    commandRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  function getTitle(tool: ToolPart, live: boolean) {
    const command = tool.input?.command

    if (tool.state === "output-available") {
      return tool.output.exitCode === 0
        ? `Ran ${command}`
        : `${command} exited with code ${tool.output.exitCode}`
    }

    return live ? `Running ${command}` : `Failed to run ${command}`
  }

  let open = $state(untrack(() => defaultOpen))
  const running = $derived.by(
    () =>
      streaming &&
      (part.state === "input-streaming" || part.state === "input-available")
  )
  const failed = $derived.by(
    () =>
      !running &&
      (part.state !== "output-available" || part.output.exitCode !== 0)
  )
</script>

<TraceCollapsible open={open ?? (running && output.length > 0)} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? 'running' : failed ? 'error' : undefined}>
      <TraceIcon>
        <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
      </TraceIcon>
      <TraceTitle>
        {getTitle(part, running)}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <CodeBlock size="sm">
      <CodeBlockContent wrap sx={styles.commandRowCodeBlockContent}>{part.state === "output-error" ? part.errorText : output}</CodeBlockContent>
    </CodeBlock>
  </TraceCollapsibleContent>
</TraceCollapsible>
