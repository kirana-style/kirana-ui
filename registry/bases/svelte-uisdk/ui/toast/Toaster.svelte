<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastRegion,
    ToastTitle,
  } from "@ui-sdk/svelte/toast"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"
  import { toast as styles } from "../../../../styles/toast.styles"
  import { Button } from "../button"
  import { toaster } from "./toast"

  let {
    limit = 3,
    class: className,
    ...rest
  }: {
    limit?: number
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  /** The types that draw an icon, as React's `ToastIcon`. */
  const TYPES = ["success", "info", "warning", "error", "loading"]

  /**
   * ui-sdk measures the stack under its own names (`--toast-offset`, its front height, its swipe),
   * which the styles read by Base UI's: each toast hands them on.
   */
  const STACK =
    "--toast-offset-y: var(--toast-offset, 0px); --toast-frontmost-height: var(--toast-front-height); --toast-swipe-movement-x: var(--toast-swipe-x, 0px); --toast-swipe-movement-y: var(--toast-swipe-y, 0px)"
</script>

<!-- ui-sdk's region is Base UI's viewport, at the bottom's end; each toast Base UI's content inside it. -->
<UisdkPart
  part={ToastRegion}
  slotName="toast-viewport"
  tag="section"
  {toaster}
  side="bottom"
  align="end"
  maxVisible={limit}
  container={popupContainer()}
  {...rest}
  sx={[styles.viewport, className as Sx]}
>
  {#snippet children(toast: { type?: string; action?: { label: string } })}
    <UisdkPart part={Toast} slotName="toast" tag="li" style={STACK} sx={styles.root}>
      {#snippet children(state: { front: boolean; expanded: boolean })}
        <!-- Base UI's attributes on its content: behind the front toast, and the stack expanded. -->
        <div
          data-slot="toast-content"
          data-behind={state.front ? undefined : ""}
          data-expanded={state.expanded ? "" : undefined}
          sx={styles.content}
        >
          {#if toast.type && TYPES.includes(toast.type)}
            <span data-slot="toast-icon" sx={styles.icon}>
        {#if toast.type === "success"}
          <IconPlaceholder
          lucide="CircleCheckIcon"
          tabler="IconCircleCheck"
          hugeicons="CheckmarkCircle02Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleLine"
          sx={styles.iconSuccess}
          aria-hidden="true"
          />
        {:else if toast.type === "info"}
          <IconPlaceholder
          lucide="InfoIcon"
          tabler="IconInfoCircle"
          hugeicons="InformationCircleIcon"
          phosphor="InfoIcon"
          remixicon="RiInformationLine"
          sx={styles.iconInfo}
          aria-hidden="true"
          />
        {:else if toast.type === "warning"}
          <IconPlaceholder
          lucide="TriangleAlertIcon"
          tabler="IconAlertTriangle"
          hugeicons="Alert02Icon"
          phosphor="WarningIcon"
          remixicon="RiErrorWarningLine"
          sx={styles.iconWarning}
          aria-hidden="true"
          />
        {:else if toast.type === "error"}
          <IconPlaceholder
          lucide="OctagonXIcon"
          tabler="IconAlertOctagon"
          hugeicons="MultiplicationSignCircleIcon"
          phosphor="XCircleIcon"
          remixicon="RiCloseCircleLine"
          sx={styles.iconError}
          aria-hidden="true"
          />
        {:else if toast.type === "loading"}
          <IconPlaceholder
          lucide="Loader2Icon"
          tabler="IconLoader"
          hugeicons="Loading03Icon"
          phosphor="SpinnerIcon"
          remixicon="RiLoaderLine"
          sx={styles.iconLoading}
          aria-hidden="true"
          />
        {/if}
            </span>
          {/if}
          <div sx={styles.body}>
            <UisdkPart part={ToastTitle} slotName="toast-title" sx={styles.title} />
            <UisdkPart part={ToastDescription} slotName="toast-description" sx={styles.description} />
          </div>
          {#if toast.action}
            <UisdkPart part={ToastAction} slotName="toast-action" tag="button">
              {#snippet asChild(props)}
                <Button {...props()} variant="outline" size="sm" sx={styles.action}>
                  {toast.action?.label}
                </Button>
              {/snippet}
            </UisdkPart>
          {/if}
          <UisdkPart part={ToastClose} slotName="toast-close" tag="button" aria-label="Close toast">
            {#snippet asChild(props)}
              <Button {...props()} variant="ghost" size="icon-sm" sx={styles.close}>
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                  aria-hidden="true"
                />
              </Button>
            {/snippet}
          </UisdkPart>
        </div>
      {/snippet}
    </UisdkPart>
  {/snippet}
</UisdkPart>
