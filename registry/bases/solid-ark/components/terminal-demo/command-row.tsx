import { createMemo, createSignal, splitProps, untrack } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
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
import type { Sx } from "@kirana-style/core"
import type { ToolPart } from "./types"

export function CommandRow(props: {
  part: ToolPart
  output: string
  streaming: boolean
  defaultOpen?: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "part",
    "output",
    "streaming",
    "defaultOpen",
    "sx",
    "class",
  ])
  const styles = {
    commandRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  function getTitle(part: ToolPart, running: boolean) {
    const command = part.input?.command

    if (part.state === "output-available") {
      return part.output.exitCode === 0
        ? `Ran ${command}`
        : `${command} exited with code ${part.output.exitCode}`
    }

    return running ? `Running ${command}` : `Failed to run ${command}`
  }

  const [open, setOpen] = createSignal(untrack(() => local.defaultOpen))
  const running = createMemo(
    () =>
      local.streaming &&
      (local.part.state === "input-streaming" ||
        local.part.state === "input-available")
  )
  const failed = createMemo(
    () =>
      !running() &&
      (local.part.state !== "output-available" ||
        local.part.output.exitCode !== 0)
  )

  return (
    <TraceCollapsible
      open={open() ?? (running() && local.output.length > 0)}
      onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
    >
      <TraceCollapsibleTrigger>
        <TraceLine
          status={running() ? "running" : failed() ? "error" : undefined}
        >
          <TraceIcon>
            <IconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>{getTitle(local.part, running())}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap sx={styles.commandRowCodeBlockContent}>
            {local.part.state === "output-error"
              ? local.part.errorText
              : local.output}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
