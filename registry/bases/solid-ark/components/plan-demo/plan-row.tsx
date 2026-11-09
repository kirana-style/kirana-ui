import { For, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { Sx } from "@kirana-style/core"

export type Plan = {
  title: string
  steps: { title: string; status: "done" | "running" | "pending" }[]
}

export function PlanRow(props: {
  plan: Plan
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["plan", "streaming", "sx", "class"])
  const done = createMemo(
    () => local.plan.steps.filter((step) => step.status === "done").length
  )
  const running = createMemo(
    () => local.streaming && done() < local.plan.steps.length
  )

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine status={running() ? "running" : undefined}>
          <TraceIcon>
            <IconPlaceholder
              lucide="RouteIcon"
              tabler="IconRoute"
              hugeicons="Route01Icon"
              phosphor="PathIcon"
              remixicon="RiRouteLine"
            />
          </TraceIcon>
          <TraceTitle>{local.plan.title}</TraceTitle>
          <TraceDescription>
            {done()} of {local.plan.steps.length} done
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <For each={local.plan.steps}>
            {(step) => (
              <>
                <TraceLine
                  status={
                    step.status === "pending"
                      ? "pending"
                      : local.streaming && step.status === "running"
                        ? "running"
                        : undefined
                  }
                >
                  <TraceIcon>
                    {step.status === "done" ? (
                      <IconPlaceholder
                        lucide="CircleCheckIcon"
                        tabler="IconCircleCheckFilled"
                        hugeicons="CheckmarkCircle01Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleFill"
                      />
                    ) : (
                      <>
                        {step.status === "running" ? (
                          <IconPlaceholder
                            lucide="CircleDotIcon"
                            tabler="IconCircleDot"
                            hugeicons="RecordIcon"
                            phosphor="RecordIcon"
                            remixicon="RiRecordCircleLine"
                          />
                        ) : (
                          <IconPlaceholder
                            lucide="CircleIcon"
                            tabler="IconCircle"
                            hugeicons="CircleIcon"
                            phosphor="CircleIcon"
                            remixicon="RiCheckboxBlankCircleLine"
                          />
                        )}
                      </>
                    )}
                  </TraceIcon>
                  <TraceTitle>{step.title}</TraceTitle>
                </TraceLine>
              </>
            )}
          </For>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
