<script setup lang="ts">
import { TagsInput } from "@kirana-ui/vue/tags-input"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { tagsInput } from "../../../../styles/tags-input.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <TagsInput.Input
    data-slot="tags-input-input"
    v-bind="attrs"
    :sx="[combobox.chipInput, tagsInput.input, sx]"
  />
</template>
