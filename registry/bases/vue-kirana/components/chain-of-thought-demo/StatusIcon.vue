<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
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

defineProps<{ status?: Status }>()
</script>

<template>
  <IconPlaceholder
    v-if="status === 'running'"
    lucide="LoaderCircleIcon"
    tabler="IconLoader2"
    hugeicons="Loading03Icon"
    phosphor="CircleNotchIcon"
    remixicon="RiLoader4Line"
    :sx="styles.statusIconIconPlaceholder"
  />
  <IconPlaceholder
    v-else-if="status === 'error'"
    lucide="CircleAlertIcon"
    tabler="IconExclamationCircle"
    hugeicons="AlertCircleIcon"
    phosphor="WarningCircleIcon"
    remixicon="RiErrorWarningLine"
  />
  <IconPlaceholder
    v-else
    lucide="CircleCheckIcon"
    tabler="IconCircleCheckFilled"
    hugeicons="CheckmarkCircle01Icon"
    phosphor="CheckCircleIcon"
    remixicon="RiCheckboxCircleFill"
  />
</template>
