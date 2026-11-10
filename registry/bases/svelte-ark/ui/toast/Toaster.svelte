<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import {
    Toaster,
    ToastActionTrigger,
    ToastCloseTrigger,
    ToastDescription,
    ToastRoot,
    ToastTitle,
  } from "@ark-ui/svelte"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { zIndex } from "../../../../core/scales"
  import { toast as styles } from "../../../../styles/toast.styles"
  import { Button } from "../button"
  import { toaster } from "./toast"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  /** The types that draw an icon, as React's `ToastIcon`. */
  const TYPES = ["success", "info", "warning", "error", "loading"]

  // Zag writes the group's flex column and the highest `z-index` inline; Base UI's viewport is a
  // block at the overlays' layer. Given here, after Zag's, they win (each toast is placed alone).
  const groupStyle = `display: block; flex-direction: initial; align-items: initial; z-index: ${zIndex.overlay}`
</script>

<!-- Ark's toaster is the viewport; each toast its root, Base UI's content inside it. -->
<Toaster {toaster} data-slot="toast-viewport" style={groupStyle} {...rest} sx={[styles.viewport, className as Sx]}>
  {#snippet children(item)}
    {@const type = (item().meta as { type?: string } | undefined)?.type}
    <ToastRoot data-slot="toast" sx={[styles.root, styles.rootArk]}>
      <div data-slot="toast-content" sx={styles.content}>
        {#if type && TYPES.includes(type)}
          <span data-slot="toast-icon" sx={styles.icon}>
            {#if type === "success"}
              <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheck" hugeicons="CheckmarkCircle02Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleLine" sx={styles.iconSuccess} aria-hidden="true" />
            {:else if type === "info"}
              <IconPlaceholder lucide="InfoIcon" tabler="IconInfoCircle" hugeicons="InformationCircleIcon" phosphor="InfoIcon" remixicon="RiInformationLine" sx={styles.iconInfo} aria-hidden="true" />
            {:else if type === "warning"}
              <IconPlaceholder lucide="TriangleAlertIcon" tabler="IconAlertTriangle" hugeicons="Alert02Icon" phosphor="WarningIcon" remixicon="RiErrorWarningLine" sx={styles.iconWarning} aria-hidden="true" />
            {:else if type === "error"}
              <IconPlaceholder lucide="OctagonXIcon" tabler="IconAlertOctagon" hugeicons="MultiplicationSignCircleIcon" phosphor="XCircleIcon" remixicon="RiCloseCircleLine" sx={styles.iconError} aria-hidden="true" />
            {:else if type === "loading"}
              <IconPlaceholder lucide="Loader2Icon" tabler="IconLoader" hugeicons="Loading03Icon" phosphor="SpinnerIcon" remixicon="RiLoaderLine" sx={styles.iconLoading} aria-hidden="true" />
            {/if}
          </span>
        {/if}
        <div sx={styles.body}>
          {#if item().title}
            <ToastTitle data-slot="toast-title" sx={styles.title}>{item().title}</ToastTitle>
          {/if}
          {#if item().description}
            <ToastDescription data-slot="toast-description" sx={styles.description}>{item().description}</ToastDescription>
          {/if}
        </div>
        {#if item().action}
          <ToastActionTrigger data-slot="toast-action">
            {#snippet asChild(props)}
              <Button {...props()} class={props().class} style={props().style} variant="outline" size="sm" sx={styles.action}>{item().action?.label}</Button>
            {/snippet}
          </ToastActionTrigger>
        {/if}
        <ToastCloseTrigger data-slot="toast-close" aria-label="Close toast">
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="ghost" size="icon-sm" sx={styles.close}>
              <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" aria-hidden="true" />
            </Button>
          {/snippet}
        </ToastCloseTrigger>
      </div>
    </ToastRoot>
  {/snippet}
</Toaster>
