import { StepRow } from "./step-row"
import { SubagentLine } from "./subagent-line"
import { For, Show, createMemo } from "solid-js"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { AgentPart } from "./types"

export function SubagentRow(props: {
  part: AgentPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const local = props
  const styles = {
    subagentRowTraceCollapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[3] },
    }),
  }

  const done = createMemo(() => local.part.state === "complete")
  const running = createMemo(
    () => !done() && local.part.state !== "error" && local.streaming
  )
  const steps = createMemo(() => local.part.output?.steps ?? [])
  const report = createMemo(() => local.part.output?.report ?? "")

  return (
    <>
      {steps().length === 0 ? (
        <SubagentLine done={done()} running={running()} />
      ) : (
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <SubagentLine done={done()} running={running()} />
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent
            keepMounted
            sx={styles.subagentRowTraceCollapsibleContent}
          >
            <Trace>
              <For each={steps()}>{(step) => <StepRow step={step} />}</For>
            </Trace>
            <Show when={report()}>
              <p>{report()}</p>
            </Show>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
    </>
  )
}
