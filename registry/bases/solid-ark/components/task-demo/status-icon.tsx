import { splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import type { Sx } from "@kirana-style/core"
import type { Status } from "./types"

export function StatusIcon(props: { status: Status; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["status", "sx", "class"])
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    statusIconIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  return (
    <>
      {local.status === "running" ? (
        <IconPlaceholder
          lucide="LoaderCircleIcon"
          tabler="IconLoader2"
          hugeicons="Loading03Icon"
          phosphor="CircleNotchIcon"
          remixicon="RiLoader4Line"
          {...styleProps(styles.statusIconIconPlaceholder)}
        />
      ) : (
        <>
          {local.status === "error" ? (
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
        </>
      )}
    </>
  )
}
