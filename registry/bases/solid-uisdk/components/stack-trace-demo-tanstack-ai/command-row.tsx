import { StackTrace } from "./stack-trace"
import { createMemo } from "solid-js"
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
import type { ToolPart, ToolResultPart } from "./types"

export function CommandRow(props: {
  part: ToolPart
  result?: ToolResultPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const local = props
  const styles = {
    commandRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = createMemo(() => local.part.input?.command)
  // The message of the `tool-result` part, the same string on every update.
  const stack = createMemo(() => local.result?.error ?? "")

  return (
    <>
      {local.part.state === "error" ? (
        <StackTrace stack={stack()} />
      ) : (
        <>
          {local.part.state === "complete" ? (
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
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
                  <TraceTitle>Ran {command()}</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <CodeBlock size="sm">
                  <CodeBlockContent wrap sx={styles.commandRowCodeBlockContent}>
                    {local.part.output?.stdout}
                  </CodeBlockContent>
                </CodeBlock>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          ) : (
            <TraceLine status={local.streaming ? "running" : "error"}>
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
                {local.streaming ? "Running" : "Failed to run"} {command()}
              </TraceTitle>
            </TraceLine>
          )}
        </>
      )}
    </>
  )
}
