<script setup lang="ts">
import {
  injectToastProviderContext,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
} from "reka-ui"
import type { ToastObject } from "reka-ui"
import { computed, onMounted, ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { toast as styles } from "../../../../styles/toast.styles"
import { Button } from "../button"

const { item, index } = defineProps<{ item: ToastObject; index: number }>()

/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]

const provider = injectToastProviderContext()
const expanded = computed(() => provider.expanded.value)

// Base UI's first frame, which its styles enter from (`data-starting-style`): Reka has none.
const starting = ref(true)
onMounted(() =>
  requestAnimationFrame(() =>
    requestAnimationFrame(() => (starting.value = false))
  )
)

// Reka's measures under Base UI's names, which the toast's styles read.
const bridge = {
  "--toast-index": "var(--reka-toast-index)",
  "--toast-offset-y": "var(--reka-toast-offset-y)",
  "--toast-height": "var(--reka-toast-height)",
  "--toast-swipe-movement-x":
    "var(--reka-toast-swipe-move-x, var(--reka-toast-swipe-end-x, 0px))",
  "--toast-swipe-movement-y":
    "var(--reka-toast-swipe-move-y, var(--reka-toast-swipe-end-y, 0px))",
}
</script>

<template>
  <!-- A `div`, as Base UI's toast; Base UI's content inside it, which hides behind the front one. -->
  <ToastRoot
    as="div"
    data-slot="toast"
    :toast="item"
    :data-starting-style="starting ? '' : undefined"
    :style="bridge"
    :sx="[styles.root, styles.rootReka]"
  >
    <div
      data-slot="toast-content"
      :data-behind="index > 0 ? '' : undefined"
      :data-expanded="expanded ? '' : undefined"
      :sx="styles.content"
    >
      <span
        v-if="item.status && TYPES.includes(item.status)"
        data-slot="toast-icon"
        :sx="styles.icon"
      >
        <IconPlaceholder
          v-if="item.status === 'success'"
          lucide="CircleCheckIcon"
          tabler="IconCircleCheck"
          hugeicons="CheckmarkCircle02Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleLine"
          :sx="styles.iconSuccess"
          aria-hidden="true"
        />
        <IconPlaceholder
          v-else-if="item.status === 'info'"
          lucide="InfoIcon"
          tabler="IconInfoCircle"
          hugeicons="InformationCircleIcon"
          phosphor="InfoIcon"
          remixicon="RiInformationLine"
          :sx="styles.iconInfo"
          aria-hidden="true"
        />
        <IconPlaceholder
          v-else-if="item.status === 'warning'"
          lucide="TriangleAlertIcon"
          tabler="IconAlertTriangle"
          hugeicons="Alert02Icon"
          phosphor="WarningIcon"
          remixicon="RiErrorWarningLine"
          :sx="styles.iconWarning"
          aria-hidden="true"
        />
        <IconPlaceholder
          v-else-if="item.status === 'error'"
          lucide="OctagonXIcon"
          tabler="IconAlertOctagon"
          hugeicons="MultiplicationSignCircleIcon"
          phosphor="XCircleIcon"
          remixicon="RiCloseCircleLine"
          :sx="styles.iconError"
          aria-hidden="true"
        />
        <IconPlaceholder
          v-else-if="item.status === 'loading'"
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
        <ToastTitle
          v-if="item.title"
          data-slot="toast-title"
          :sx="styles.title"
        >
          {{ item.title }}
        </ToastTitle>
        <ToastDescription
          v-if="item.description"
          data-slot="toast-description"
          :sx="styles.description"
        >
          {{ item.description }}
        </ToastDescription>
      </div>
      <ToastAction v-if="item.actionProps" data-slot="toast-action" as-child>
        <Button variant="outline" size="sm" :sx="styles.action">
          {{ item.actionProps.label }}
        </Button>
      </ToastAction>
      <ToastClose data-slot="toast-close" aria-label="Close toast" as-child>
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
      </ToastClose>
    </div>
  </ToastRoot>
</template>
