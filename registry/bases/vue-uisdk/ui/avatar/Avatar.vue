<script setup lang="ts">
import { Avatar } from "@ui-sdk/vue/avatar"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "default" | "sm" | "lg" }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Avatar"
    name="avatar"
    tag="span"
    :data-size="size"
    v-bind="attrs"
    :sx="[avatar.root, sx]"
  >
    <slot />
  </UisdkPart>
</template>
