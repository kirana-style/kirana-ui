import { Step } from "./step"
import { For, Show, createMemo } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { Badge } from "../../ui/badge"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
import { css } from "@kirana-style/core"
import { fontFamily, space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { Status, StepPart, ToolResultPart } from "./types"

export function StepRow(props: {
  part: StepPart
  result?: ToolResultPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const local = props
  const styles = {
    stepRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
    stepRowCodeBlockContent2: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowDiv: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space["1.5"],
    }),
    stepRowBadge: css({
      fontFamily: { "*": null, base: fontFamily.mono },
    }),
  }

  const status = createMemo<Status>(() =>
    local.part.state === "complete"
      ? undefined
      : local.part.state === "error" || !local.streaming
        ? "error"
        : "running"
  )
  const verb = (running: string, done: string, failed: string) =>
    status() === "running" ? running : status() === "error" ? failed : done
  const content = createMemo(
    () => local.part.state === "error" || local.part.state === "complete"
  )

  return (
    <>
      {local.part.name === "searchWeb" ? (
        <Step
          status={status()}
          content={content()}
          title={`${verb("Searching", "Searched", "Failed to search")} the web for ${local.part.input?.query}`}
        >
          {local.part.state === "error" ? (
            <CodeBlock size="sm" variant="destructive">
              <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                {local.result?.error}
              </CodeBlockContent>
            </CodeBlock>
          ) : (
            <Show when={local.part.state === "complete"}>
              <Trace>
                <For each={local.part.output?.results}>
                  {(result) => (
                    <a href={result.url} target="_blank" rel="noreferrer">
                      <TraceLine>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="GlobeIcon"
                            tabler="IconGlobe"
                            hugeicons="Globe02Icon"
                            phosphor="GlobeIcon"
                            remixicon="RiGlobeLine"
                          />
                        </TraceIcon>
                        <TraceTitle>
                          {result.title}{" "}
                          <span sx={styles.stepRowSpan}>
                            (opens in a new tab)
                          </span>
                        </TraceTitle>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="ArrowUpRightIcon"
                            tabler="IconArrowUpRight"
                            hugeicons="ArrowUpRightIcon"
                            phosphor="ArrowUpRightIcon"
                            remixicon="RiArrowRightUpLine"
                          />
                        </TraceIcon>
                      </TraceLine>
                    </a>
                  )}
                </For>
              </Trace>
            </Show>
          )}
        </Step>
      ) : (
        <>
          {local.part.name === "readBuildLog" ? (
            <Step
              status={status()}
              content={content()}
              defaultOpen
              title={`${verb("Reading", "Read", "Failed to read")} the build log for ${local.part.input?.deployment}`}
            >
              {local.part.state === "error" ? (
                <CodeBlock size="sm" variant="destructive">
                  <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                    {local.result?.error}
                  </CodeBlockContent>
                </CodeBlock>
              ) : (
                <Show when={local.part.state === "complete"}>
                  <CodeBlock size="sm">
                    <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent2}>
                      {local.part.output?.log}
                    </CodeBlockContent>
                  </CodeBlock>
                </Show>
              )}
            </Step>
          ) : (
            <Step
              status={status()}
              content={content()}
              title={`${verb("Searching", "Searched", "Failed to search")} the code for ${local.part.input?.query}`}
            >
              {local.part.state === "error" ? (
                <CodeBlock size="sm" variant="destructive">
                  <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                    {local.result?.error}
                  </CodeBlockContent>
                </CodeBlock>
              ) : (
                <Show when={local.part.state === "complete"}>
                  <div sx={styles.stepRowDiv}>
                    <For each={local.part.output?.files}>
                      {(file) => (
                        <Badge variant="secondary" sx={styles.stepRowBadge}>
                          {file}
                        </Badge>
                      )}
                    </For>
                  </div>
                </Show>
              )}
            </Step>
          )}
        </>
      )}
    </>
  )
}
