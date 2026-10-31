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
import { containerSize, space } from "../../../core/scales"
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
}

const steps = [
  "Add a dark variant to the theme tokens",
  "Read the theme from a cookie on the server",
  "Add a toggle to the settings page",
  "Check contrast on the charts",
]

export default function PlanDescription() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
        <TraceCollapsible defaultExpanded>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="RouteIcon"
                  tabler="IconRoute"
                  hugeicons="Route01Icon"
                  phosphor="PathIcon"
                  remixicon="RiRouteLine"
                />
              </TraceIcon>
              <TraceTitle>Plan: add dark mode</TraceTitle>
              <TraceDescription>1 of {steps.length} done</TraceDescription>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent sx={styles.traceCollapsibleContent}>
            <p>
              Store the theme in a cookie so the server renders the right one
              and the page does not flash on load.
            </p>
            <Trace>
              {steps.map((step, index) => (
                <TraceLine
                  key={step}
                  status={index > 0 ? "pending" : undefined}
                >
                  <TraceIcon>
                    {index === 0 ? (
                      <IconPlaceholder
                        lucide="CircleCheckIcon"
                        tabler="IconCircleCheckFilled"
                        hugeicons="CheckmarkCircle01Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleFill"
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
                  </TraceIcon>
                  <TraceTitle>{step}</TraceTitle>
                </TraceLine>
              ))}
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
