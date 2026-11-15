import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  traceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

export default function ReasoningDuration() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
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
              <TraceTitle>Thought</TraceTitle>
              <TraceDescription>12s</TraceDescription>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent sx={styles.traceCollapsibleContent}>
            The build log shows install and compile finish in under a minute.
            Image optimization takes almost four, and it reruns on every deploy
            because the cache key includes the commit hash.
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
