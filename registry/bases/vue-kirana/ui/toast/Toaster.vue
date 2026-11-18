<script setup lang="ts">
import { Toast } from "@kirana-ui/vue/toast"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { toast as styles } from "../../../../styles/toast.styles"
import { Button } from "../button"
import { toaster } from "./toast"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]
</script>

<template>
  <!-- Kirana UI's viewport, always in the page, writing Base UI's stack variables on each toast. -->
  <Toast.Viewport
    data-slot="toast-viewport"
    :toaster="toaster"
    v-bind="attrs"
    :sx="[styles.viewport, sx]"
  >
    <Toast.List v-slot="{ toast }">
      <Toast.Root
        :key="toast.id"
        :toast="toast"
        data-slot="toast"
        :sx="styles.root"
      >
        <Toast.Content data-slot="toast-content" :sx="styles.content">
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
            <Toast.Title
              v-if="toast.title !== undefined"
              data-slot="toast-title"
              :sx="styles.title"
            />
            <Toast.Description
              v-if="toast.description !== undefined"
              data-slot="toast-description"
              :sx="styles.description"
            />
          </div>
          <Toast.Action v-if="toast.action" data-slot="toast-action" as-child>
            <Button variant="outline" size="sm" :sx="styles.action">
              {{ toast.action.label }}
            </Button>
          </Toast.Action>
          <Toast.Close
            data-slot="toast-close"
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
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    </Toast.List>
  </Toast.Viewport>
</template>
