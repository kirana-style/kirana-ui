<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Toaster as Sonner } from "svelte-sonner"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { theme } from "../../../../core/tokens"
  import { sonner } from "../../../../styles/sonner.styles"

  let {
    theme: mode = "system",
    class: className,
    ...rest
  }: {
    theme?: "light" | "dark" | "system"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  /**
   * Pass `theme` from your colour mode (Sonner's `light`, `dark` or `system`, the default here);
   * upstream reads it from `next-themes`.
   */
</script>

<Sonner theme={mode} sx={[sonner.toaster, className as Sx]} style={`--normal-bg: ${theme.popover}; --normal-text: ${theme.popoverForeground}; --normal-border: ${theme.border}; --border-radius: ${'var(--sonner-radius)'}`} {...rest}>
  {#snippet successIcon()}
    <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheck" hugeicons="CheckmarkCircle02Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleLine" sx={sonner.icon} />
  {/snippet}
  {#snippet infoIcon()}
    <IconPlaceholder lucide="InfoIcon" tabler="IconInfoCircle" hugeicons="InformationCircleIcon" phosphor="InfoIcon" remixicon="RiInformationLine" sx={sonner.icon} />
  {/snippet}
  {#snippet warningIcon()}
    <IconPlaceholder lucide="TriangleAlertIcon" tabler="IconAlertTriangle" hugeicons="Alert02Icon" phosphor="WarningIcon" remixicon="RiErrorWarningLine" sx={sonner.icon} />
  {/snippet}
  {#snippet errorIcon()}
    <IconPlaceholder lucide="OctagonXIcon" tabler="IconAlertOctagon" hugeicons="MultiplicationSignCircleIcon" phosphor="XCircleIcon" remixicon="RiCloseCircleLine" sx={sonner.icon} />
  {/snippet}
  {#snippet loadingIcon()}
    <IconPlaceholder lucide="Loader2Icon" tabler="IconLoader" hugeicons="Loading03Icon" phosphor="SpinnerIcon" remixicon="RiLoaderLine" sx={sonner.loading} />
  {/snippet}
</Sonner>
