<script setup lang="ts">
import { MenuGroup } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuGroup"
    name="dropdown-menu-group"
    tag="div"
    v-bind="attrs"
    :sx="sx"
  >
    <slot />
  </UisdkPart>
</template>
