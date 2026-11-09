import { createMemo, splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
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
import { space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { SubagentPart } from "./types"

export function StepRow(props: {
  part: Extract<SubagentPart, { type: "tool-runCommand" }>
  running: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "running", "sx", "class"])
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

  const command = createMemo(() => local.part.input?.command)

  return (
    <>
      {local.part.state === "output-available" ? (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CircleCheckIcon"
                  tabler="IconCircleCheckFilled"
                  hugeicons="CheckmarkCircle01Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleFill"
                />
              </TraceIcon>
              <TraceTitle>Ran {command()}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                {local.part.output.stdout}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine status={local.running ? "running" : "error"}>
          <TraceIcon>
            {local.running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.stepRowIconPlaceholder)}
              />
            ) : (
              <IconPlaceholder
                lucide="CircleAlertIcon"
                tabler="IconExclamationCircle"
                hugeicons="AlertCircleIcon"
                phosphor="WarningCircleIcon"
                remixicon="RiErrorWarningLine"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {local.running ? "Running" : "Failed to run"} {command()}
          </TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
