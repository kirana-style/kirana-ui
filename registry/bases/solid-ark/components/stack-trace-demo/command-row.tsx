import { StackTrace } from "./stack-trace"
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
import type { ToolPart } from "./types"

export function CommandRow(props: {
  part: ToolPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "streaming", "sx", "class"])
  const styles = {
    commandRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = createMemo(() => local.part.input?.command)

  return (
    <>
      {local.part.state === "output-error" ? (
        <StackTrace stack={local.part.errorText} />
      ) : (
        <>
          {local.part.state === "output-available" ? (
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
                    {local.part.output.stdout}
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
