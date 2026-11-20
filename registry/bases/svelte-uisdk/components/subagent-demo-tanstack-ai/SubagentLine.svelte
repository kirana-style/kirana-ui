<script lang="ts">

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
  import { css, keyframes } from "@kirana-style/core"


  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    subagentRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  let { done, running }: { done: boolean; running: boolean } = $props()
</script>

<TraceLine status={done ? undefined : running ? 'running' : 'error'}>
  <TraceIcon>
    {#if done}
      <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
    {:else if running}
      <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.subagentRowIconPlaceholder} />
    {:else}
      <IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" />
    {/if}
  </TraceIcon>
  <TraceTitle>
    {done ? "Ran" : running ? "Running" : "Failed to run"} the research subagent
  </TraceTitle>
</TraceLine>
