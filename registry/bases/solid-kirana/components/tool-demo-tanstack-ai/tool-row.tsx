import { createMemo, splitProps } from "solid-js"
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

export function ToolRow(props: {
  part: ToolPart
  result?: ToolResultPart
  streaming: boolean
  defaultOpen?: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "part",
    "result",
    "streaming",
    "defaultOpen",
    "sx",
    "class",
  ])
  const styles = {
    toolRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = createMemo(() => local.part.input?.command)

  return (
    <>
      {local.part.state === "complete" || local.part.state === "error" ? (
        <TraceCollapsible defaultOpen={local.defaultOpen}>
          <TraceCollapsibleTrigger>
            <TraceLine
              status={local.part.state === "error" ? "error" : undefined}
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
              <TraceTitle>
                {local.part.state === "error" ? "Failed to run" : "Ran"}{" "}
                {command()}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent}>
                {local.part.state === "error"
                  ? local.result?.error
                  : local.part.output?.stdout}
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
  )
}
