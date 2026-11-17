import { css, keyframes, props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  animateSpin: css({
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
}

export default function TraceStatus() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
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
          <TraceTitle>Ran pnpm install</TraceTitle>
        </TraceLine>
        <TraceLine status="error">
          <TraceIcon>
            <IconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            />
          </TraceIcon>
          <TraceTitle>Failed to run pnpm lint</TraceTitle>
        </TraceLine>
        <TraceLine status="running">
          <TraceIcon>
            <IconPlaceholder
              lucide="LoaderCircleIcon"
              tabler="IconLoader2"
              hugeicons="Loading03Icon"
              phosphor="CircleNotchIcon"
              remixicon="RiLoader4Line"
              {...styleProps(styles.animateSpin)}
            />
          </TraceIcon>
          <TraceTitle>Running pnpm build</TraceTitle>
        </TraceLine>
        <TraceLine status="pending">
          <TraceIcon>
            <IconPlaceholder
              lucide="CircleIcon"
              tabler="IconCircle"
              hugeicons="CircleIcon"
              phosphor="CircleIcon"
              remixicon="RiCheckboxBlankCircleLine"
            />
          </TraceIcon>
          <TraceTitle>Run pnpm test</TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  )
}
