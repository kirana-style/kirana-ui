import { StepRow } from "./step-row"
import { SubagentLine } from "./subagent-line"
import { For, Show, createMemo, splitProps } from "solid-js"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { Part } from "./types"

export function SubagentRow(props: {
  part: Extract<Part, { type: "tool-researchAgent" }>
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "streaming", "sx", "class"])
  const styles = {
    subagentRowTraceCollapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[3] },
    }),
  }

  const done = createMemo(
    () => local.part.state === "output-available" && !local.part.preliminary
  )
  const running = createMemo(
    () => !done() && local.part.state !== "output-error" && local.streaming
  )
  const parts = createMemo(() =>
    local.part.state === "output-available" ? local.part.output.parts : []
  )
  const report = createMemo(() =>
    parts()
      .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
      .join("")
  )

  return (
    <>
      {parts().length === 0 ? (
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
              <For each={parts()}>
                {(agentPart) => (
                  <Show
                    when={agentPart.type === "tool-runCommand" && agentPart}
                  >
                    {(step) => <StepRow part={step()} running={running()} />}
                  </Show>
                )}
              </For>
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
