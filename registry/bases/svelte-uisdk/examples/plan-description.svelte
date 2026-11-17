<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
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
</script>

<div sx={page.example}>
  <Trace sx={styles.trace}>
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="RouteIcon" tabler="IconRoute" hugeicons="Route01Icon" phosphor="PathIcon" remixicon="RiRouteLine" />
          </TraceIcon>
          <TraceTitle>
            Plan: add dark mode
          </TraceTitle>
          <TraceDescription>
            1 of {steps.length} done
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.traceCollapsibleContent}>
        <p>
          Store the theme in a cookie so the server renders the right one and the page does not flash on load.
        </p>
        <Trace>
          {#each steps as step, index (step)}
            <TraceLine status={index > 0 ? 'pending' : undefined}>
              <TraceIcon>
                {#if index === 0}
                  <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
                {:else}
                  <IconPlaceholder lucide="CircleIcon" tabler="IconCircle" hugeicons="CircleIcon" phosphor="CircleIcon" remixicon="RiCheckboxBlankCircleLine" />
                {/if}
              </TraceIcon>
              <TraceTitle>
                {step}
              </TraceTitle>
            </TraceLine>
          {/each}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</div>
