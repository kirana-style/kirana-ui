<script setup lang="ts">
import {
  Toaster,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastRoot,
  ToastTitle,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { zIndex } from "../../../../core/scales"
import { toast as styles } from "../../../../styles/toast.styles"
import { Button } from "../button"
import { toaster } from "./toast"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()

/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]

// Zag writes the group's flex column and the highest `z-index` inline; Base UI's viewport is a
// block at the overlays' layer. Given here, after Zag's, they win (each toast is placed alone).
const groupStyle = {
  display: "block",
  flexDirection: "initial",
  alignItems: "initial",
  zIndex: zIndex.overlay,
}
</script>

<template>
  <!-- Ark's toaster is the viewport; each toast its root, Base UI's content inside it. -->
  <Toaster
    v-slot="item"
    :toaster="toaster"
    data-slot="toast-viewport"
    :style="groupStyle"
    v-bind="attrs"
    :sx="[styles.viewport, sx]"
  >
    <ToastRoot data-slot="toast" :sx="[styles.root, styles.rootArk]">
      <div data-slot="toast-content" :sx="styles.content">
        <span
          v-if="item.meta?.type && TYPES.includes(item.meta.type)"
          data-slot="toast-icon"
          :sx="styles.icon"
        >
          <IconPlaceholder
            v-if="item.meta.type === 'success'"
            lucide="CircleCheckIcon"
            tabler="IconCircleCheck"
            hugeicons="CheckmarkCircle02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            :sx="styles.iconSuccess"
            aria-hidden="true"
          />
          <IconPlaceholder
            v-else-if="item.meta.type === 'info'"
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="InformationCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
            :sx="styles.iconInfo"
            aria-hidden="true"
          />
          <IconPlaceholder
            v-else-if="item.meta.type === 'warning'"
            lucide="TriangleAlertIcon"
            tabler="IconAlertTriangle"
            hugeicons="Alert02Icon"
            phosphor="WarningIcon"
            remixicon="RiErrorWarningLine"
            :sx="styles.iconWarning"
            aria-hidden="true"
          />
          <IconPlaceholder
            v-else-if="item.meta.type === 'error'"
            lucide="OctagonXIcon"
            tabler="IconAlertOctagon"
            hugeicons="MultiplicationSignCircleIcon"
            phosphor="XCircleIcon"
            remixicon="RiCloseCircleLine"
            :sx="styles.iconError"
            aria-hidden="true"
          />
          <IconPlaceholder
            v-else-if="item.meta.type === 'loading'"
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
        <ToastActionTrigger
          v-if="item.action"
          data-slot="toast-action"
          as-child
        >
          <Button variant="outline" size="sm" :sx="styles.action">
            {{ item.action.label }}
          </Button>
        </ToastActionTrigger>
        <ToastCloseTrigger
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
        </ToastCloseTrigger>
      </div>
    </ToastRoot>
  </Toaster>
</template>
