import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Badge } from "../ui/badge"
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
import { containerSize, fontFamily, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  traceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),
  badge: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
}

export default function SubagentDetails() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
        <TraceCollapsible defaultOpen>
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
              <TraceTitle>Ran the research agent</TraceTitle>
              <TraceDescription>48s</TraceDescription>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent
            keepMounted
            sx={styles.traceCollapsibleContent}
          >
            <div sx={styles.div}>
              <Badge variant="secondary">anthropic/claude-sonnet-4.5</Badge>
              <Badge variant="outline" sx={styles.badge}>
                runCommand
              </Badge>
            </div>
            <p>Find out why image optimization reruns on every deploy.</p>
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
                <TraceTitle>
                  Ran sed -n 13,15p scripts/optimize-images.ts
                </TraceTitle>
              </TraceLine>
            </Trace>
            <p>The cache is keyed on the commit SHA.</p>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
