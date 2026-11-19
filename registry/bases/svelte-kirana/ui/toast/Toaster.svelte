<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Toast } from "@kirana-ui/svelte/toast"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
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
</script>

<!-- Kirana UI's viewport, always in the page, writing Base UI's stack variables on each toast. -->
<Toast.Viewport data-slot="toast-viewport" {toaster} {...rest} sx={[styles.viewport, className as Sx]}>
  <Toast.List>
    {#snippet children(toast)}
      <Toast.Root {toast} data-slot="toast" sx={styles.root}>
        <Toast.Content data-slot="toast-content" sx={styles.content}>
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
            {#if toast.title !== undefined}
              <Toast.Title data-slot="toast-title" sx={styles.title} />
            {/if}
            {#if toast.description !== undefined}
              <Toast.Description data-slot="toast-description" sx={styles.description} />
            {/if}
          </div>
          {#if toast.action}
            <Toast.Action data-slot="toast-action">
              {#snippet child({ props })}
                <Button {...props} variant="outline" size="sm" sx={styles.action}>
                  {String(toast.action?.label ?? "")}
                </Button>
              {/snippet}
            </Toast.Action>
          {/if}
          <Toast.Close data-slot="toast-close" aria-label="Close toast">
            {#snippet child({ props })}
              <Button {...props} variant="ghost" size="icon-sm" sx={styles.close}>
                <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" aria-hidden="true" />
              </Button>
            {/snippet}
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    {/snippet}
  </Toast.List>
</Toast.Viewport>
