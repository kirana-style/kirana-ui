import { createMemo, splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
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
import type { Sx } from "@kirana-style/core"
import type { Part } from "./types"

export function ToolRow(props: {
  part: Extract<Part, { type: "tool-runCommand" }>
  streaming: boolean
  defaultOpen?: boolean

  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "part",
    "streaming",
    "defaultOpen",
    "sx",
    "class",
  ])
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

  const command = createMemo(() => local.part.input?.command)
  const done = createMemo(
    () =>
      local.part.state === "output-available" ||
      local.part.state === "output-error"
  )
  const failed = createMemo(() => local.part.state === "output-error")
  const errorText = createMemo(() =>
    local.part.state === "output-error" ? local.part.errorText : ""
  )
  const stdout = createMemo(() =>
    local.part.state === "output-available" ? local.part.output.stdout : ""
  )

  return (
    <>
      {done() ? (
        <TraceCollapsible defaultOpen={local.defaultOpen}>
          <TraceCollapsibleTrigger>
            <TraceLine status={failed() ? "error" : undefined}>
              <TraceIcon>
                {failed() ? (
                  <IconPlaceholder
                    lucide="CircleAlertIcon"
                    tabler="IconExclamationCircle"
                    hugeicons="AlertCircleIcon"
                    phosphor="WarningCircleIcon"
                    remixicon="RiErrorWarningLine"
                  />
                ) : (
                  <IconPlaceholder
                    lucide="CircleCheckIcon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle01Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleFill"
                  />
                )}
              </TraceIcon>
              <TraceTitle>
                {failed() ? "Failed to run" : "Ran"} {command()}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            {failed() ? (
              <CodeBlock size="sm" variant="destructive">
                <CodeBlockContent wrap sx={styles.codeBlockContent}>
                  {errorText()}
                </CodeBlockContent>
              </CodeBlock>
            ) : (
              <CodeBlock size="sm">
                <CodeBlockContent wrap sx={styles.codeBlockContent}>
                  {stdout()}
                </CodeBlockContent>
              </CodeBlock>
            )}
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine status={local.streaming ? "running" : "error"}>
          <TraceIcon>
            {local.streaming ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.spin)}
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
            {local.streaming ? "Running" : "Failed to run"} {command()}
          </TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
