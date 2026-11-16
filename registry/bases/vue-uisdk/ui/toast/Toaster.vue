<script setup lang="ts">
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRegion,
  ToastTitle,
} from "@ui-sdk/vue/toast"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { popupContainer, UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { toast as styles } from "../../../../styles/toast.styles"
import { Button } from "../button"
import { toaster } from "./toast"

defineOptions({ inheritAttrs: false })

const { limit = 3 } = defineProps<{ limit?: number }>()
const { sx, attrs } = useSx()

/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]

/**
 * ui-sdk measures the stack under its own names (`--toast-offset`, its front height, its swipe),
 * which the styles read by Base UI's: each toast hands them on.
 */
const STACK = {
  "--toast-offset-y": "var(--toast-offset, 0px)",
  "--toast-frontmost-height": "var(--toast-front-height)",
  "--toast-swipe-movement-x": "var(--toast-swipe-x, 0px)",
  "--toast-swipe-movement-y": "var(--toast-swipe-y, 0px)",
}
</script>

<template>
  <!-- ui-sdk's region is Base UI's viewport, at the bottom's end; each toast Base UI's content inside it. -->
  <UisdkPart
    :part="ToastRegion"
    slot-name="toast-viewport"
    tag="section"
    :toaster="toaster"
    side="bottom"
    align="end"
    :max-visible="limit"
    :container="popupContainer()"
    v-bind="attrs"
    :sx="[styles.viewport, sx]"
  >
    <template #default="{ toast }">
      <UisdkPart
        :part="Toast"
        slot-name="toast"
        tag="li"
        :style="STACK"
        :sx="styles.root"
      >
        <template #default="{ state }">
          <!-- Base UI's attributes on its content: behind the front toast, and the stack expanded. -->
          <div
            data-slot="toast-content"
            :data-behind="state.front ? undefined : ''"
            :data-expanded="state.expanded ? '' : undefined"
            :sx="styles.content"
          >
            <span
              v-if="toast.type && TYPES.includes(toast.type)"
              data-slot="toast-icon"
              :sx="styles.icon"
            >
              <IconPlaceholder
                v-if="toast.type === 'success'"
                lucide="CircleCheckIcon"
                tabler="IconCircleCheck"
                hugeicons="CheckmarkCircle02Icon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleLine"
                :sx="styles.iconSuccess"
                aria-hidden="true"
              />
              <IconPlaceholder
                v-else-if="toast.type === 'info'"
                lucide="InfoIcon"
                tabler="IconInfoCircle"
                hugeicons="InformationCircleIcon"
                phosphor="InfoIcon"
                remixicon="RiInformationLine"
                :sx="styles.iconInfo"
                aria-hidden="true"
              />
              <IconPlaceholder
                v-else-if="toast.type === 'warning'"
                lucide="TriangleAlertIcon"
                tabler="IconAlertTriangle"
                hugeicons="Alert02Icon"
                phosphor="WarningIcon"
                remixicon="RiErrorWarningLine"
                :sx="styles.iconWarning"
                aria-hidden="true"
              />
              <IconPlaceholder
                v-else-if="toast.type === 'error'"
                lucide="OctagonXIcon"
                tabler="IconAlertOctagon"
                hugeicons="MultiplicationSignCircleIcon"
                phosphor="XCircleIcon"
                remixicon="RiCloseCircleLine"
                :sx="styles.iconError"
                aria-hidden="true"
              />
              <IconPlaceholder
                v-else-if="toast.type === 'loading'"
                lucide="Loader2Icon"
                tabler="IconLoader"
                hugeicons="Loading03Icon"
                phosphor="SpinnerIcon"
                remixicon="RiLoaderLine"
                :sx="styles.iconLoading"
                aria-hidden="true"
              />
            </span>
            <div :sx="styles.body">
              <UisdkPart
                :part="ToastTitle"
                slot-name="toast-title"
                tag="div"
                :sx="styles.title"
              />
              <UisdkPart
                :part="ToastDescription"
                slot-name="toast-description"
                tag="div"
                :sx="styles.description"
              />
            </div>
            <UisdkPart
              v-if="toast.action"
              :part="ToastAction"
              slot-name="toast-action"
              tag="button"
              as-child
            >
              <Button variant="outline" size="sm" :sx="styles.action">
                {{ toast.action.label }}
              </Button>
            </UisdkPart>
            <UisdkPart
              :part="ToastClose"
              slot-name="toast-close"
              tag="button"
              aria-label="Close toast"
              as-child
            >
              <Button variant="ghost" size="icon-sm" :sx="styles.close">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                  aria-hidden="true"
                />
              </Button>
            </UisdkPart>
          </div>
        </template>
      </UisdkPart>
    </template>
  </UisdkPart>
</template>
