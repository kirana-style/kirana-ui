import { splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
import type { Sx } from "@kirana-style/core"

export function SubagentLine(props: {
  done: boolean
  running: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["done", "running", "sx", "class"])
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    subagentRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  return (
    <TraceLine
      status={local.done ? undefined : local.running ? "running" : "error"}
    >
      <TraceIcon>
        {local.done ? (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        ) : (
          <>
            {local.running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.subagentRowIconPlaceholder)}
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
          </>
        )}
      </TraceIcon>
      <TraceTitle>
        {local.done ? "Ran" : local.running ? "Running" : "Failed to run"} the
        research subagent
      </TraceTitle>
    </TraceLine>
  )
}
