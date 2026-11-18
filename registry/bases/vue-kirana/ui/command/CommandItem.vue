<script setup lang="ts">
import { Command } from "@kirana-ui/vue/command"
import { useSx } from "@kirana-style/core/vue"
import { computed, onUnmounted, useSlots } from "vue"
import type { VNode } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { command } from "../../../../styles/command.styles"
import { useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const {
  value,
  keywords = [],
  disabled = false,
} = defineProps<{
  /** What it is matched by and known as; its text, as cmdk's, when not given. */
  value?: string
  keywords?: string[]
  disabled?: boolean
}>()
const emit = defineEmits<{ select: [value: string] }>()
const { sx, attrs } = useSx()
const slots = useSlots()
const textOf = (nodes: VNode[] = []): string =>
  nodes
    .map((node) =>
      typeof node.children === "string"
        ? node.children
        : Array.isArray(node.children)
          ? textOf(node.children as VNode[])
          : ""
    )
    .join("")
    .trim()
const own = computed(() => value ?? textOf(slots.default?.()))
onUnmounted(
  useCommand().register(
    () => own.value,
    () => emit("select", own.value)
  )
)
</script>

<template>
  <Command.Item
    data-slot="command-item"
    cmdk-item
    :value="own"
    :keywords="keywords"
    :disabled="disabled"
    v-bind="attrs"
    :sx="[command.item, sx]"
  >
    <slot />
    <IconPlaceholder
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
      :sx="command.itemIndicator"
    />
  </Command.Item>
</template>
