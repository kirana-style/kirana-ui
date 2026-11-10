<script setup lang="ts">
import { SelectGroup } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <SelectGroup data-slot="select-group" v-bind="attrs" :sx="[select.group, sx]">
    <slot />
  </SelectGroup>
</template>
