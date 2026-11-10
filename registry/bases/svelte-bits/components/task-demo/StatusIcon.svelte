<script lang="ts">
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { css, keyframes } from "@kirana-style/core"

  import type { Status } from "./types"

  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    statusIconIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  let { status }: { status: Status } = $props()
</script>

{#if status === 'running'}
  <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.statusIconIconPlaceholder} />
{:else if status === 'error'}
  <IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" />
{:else}
  <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
{/if}
