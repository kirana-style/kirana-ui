import { createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
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
import type { Sx } from "@kirana-style/core"
import type { ToolCallPart, ToolResultPart } from "@tanstack/ai-client"

export function ToolTrace(props: {
  part: ToolCallPart
  result?: ToolResultPart
  live: boolean

  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "result", "live", "sx", "class"])
  const styles = {
    codeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = createMemo(
    () => (local.part.input as { command?: string } | undefined)?.command
  )
  const done = createMemo(
    () => local.part.state === "complete" || local.part.state === "error"
  )
  const failed = createMemo(() => local.part.state === "error")
  const output = createMemo(() =>
    local.part.state === "error"
      ? (local.result?.error ?? "")
      : local.part.state === "complete"
        ? (local.part.output as { stdout: string }).stdout
        : ""
  )

  return (
    <>
      {done() ? (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status={failed() ? "error" : undefined}>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>
                {failed() ? "Failed to run" : "Ran"} {command()}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.codeBlockContent}>
                {output()}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <>
          {local.part.approval?.approved === false ? (
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>Denied {command()}</TraceTitle>
            </TraceLine>
          ) : (
            <TraceLine status={local.live ? "running" : "error"}>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>
                {local.live ? "Running" : "Failed to run"} {command()}
              </TraceTitle>
            </TraceLine>
          )}
        </>
      )}
    </>
  )
}
