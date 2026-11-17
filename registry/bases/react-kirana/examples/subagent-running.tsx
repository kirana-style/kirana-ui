import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  iconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  iconPlaceholder2: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

export default function SubagentRunning() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="running">
              <TraceIcon>
                <IconPlaceholder
                  lucide="LoaderCircleIcon"
                  tabler="IconLoader2"
                  hugeicons="Loading03Icon"
                  phosphor="CircleNotchIcon"
                  remixicon="RiLoader4Line"
                  {...styleProps(styles.iconPlaceholder)}
                />
              </TraceIcon>
              <TraceTitle>Running the research agent</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
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
                <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
              </TraceLine>
              <TraceLine status="running">
                <TraceIcon>
                  <IconPlaceholder
                    lucide="LoaderCircleIcon"
                    tabler="IconLoader2"
                    hugeicons="Loading03Icon"
                    phosphor="CircleNotchIcon"
                    remixicon="RiLoader4Line"
                    {...styleProps(styles.iconPlaceholder2)}
                  />
                </TraceIcon>
                <TraceTitle>
                  Running sed -n 13,15p scripts/optimize-images.ts
                </TraceTitle>
              </TraceLine>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
