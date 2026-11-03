<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { Toaster as Sonner } from "vue-sonner"
import "vue-sonner/style.css"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { theme } from "../../../../core/tokens"
import { sonner } from "../../../../styles/sonner.styles"

defineOptions({ inheritAttrs: false })

/**
 * Pass `theme` from your colour mode (Sonner's `light`, `dark` or `system`, the default here);
 * upstream reads it from `next-themes`.
 */
const { theme: mode = "system" } = defineProps<{
  theme?: "light" | "dark" | "system"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Sonner
    :theme="mode"
    :sx="[sonner.toaster, sx]"
    :style="{
      '--normal-bg': theme.popover,
      '--normal-text': theme.popoverForeground,
      '--normal-border': theme.border,
      '--border-radius': 'var(--sonner-radius)',
    }"
    v-bind="attrs"
  >
    <template #success-icon>
      <IconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheck"
        hugeicons="CheckmarkCircle02Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleLine"
        :sx="sonner.icon"
      />
    </template>
    <template #info-icon>
      <IconPlaceholder
        lucide="InfoIcon"
        tabler="IconInfoCircle"
        hugeicons="InformationCircleIcon"
        phosphor="InfoIcon"
        remixicon="RiInformationLine"
        :sx="sonner.icon"
      />
    </template>
    <template #warning-icon>
      <IconPlaceholder
        lucide="TriangleAlertIcon"
        tabler="IconAlertTriangle"
        hugeicons="Alert02Icon"
        phosphor="WarningIcon"
        remixicon="RiErrorWarningLine"
        :sx="sonner.icon"
      />
    </template>
    <template #error-icon>
      <IconPlaceholder
        lucide="OctagonXIcon"
        tabler="IconAlertOctagon"
        hugeicons="MultiplicationSignCircleIcon"
        phosphor="XCircleIcon"
        remixicon="RiCloseCircleLine"
        :sx="sonner.icon"
      />
    </template>
    <template #loading-icon>
      <IconPlaceholder
        lucide="Loader2Icon"
        tabler="IconLoader"
        hugeicons="Loading03Icon"
        phosphor="SpinnerIcon"
        remixicon="RiLoaderLine"
        :sx="sonner.loading"
      />
    </template>
  </Sonner>
</template>
