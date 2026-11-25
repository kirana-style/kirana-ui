<script setup lang="ts">
import { TagsInput } from "@kirana-ui/vue/tags-input"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { tagsInput } from "../../../../styles/tags-input.styles"
import TagsInputInput from "./TagsInputInput.vue"
import TagsInputItem from "./TagsInputItem.vue"

defineOptions({ inheritAttrs: false })

/**
 * The field: its tags, one `TagsInputItem` for each, then its slot (the input, and a clear button
 * where there is one). With nothing in its slot, a bare input. The tags bind with `v-model:value`.
 */
const { sx, attrs } = useSx()
</script>

<template>
  <TagsInput.Root
    data-slot="tags-input"
    v-bind="attrs"
    :sx="[combobox.chips, tagsInput.root, sx]"
  >
    <TagsInput.List data-slot="tags-input-list" :sx="combobox.contents">
      <TagsInput.Items v-slot="{ entry }">
        <TagsInputItem :key="entry.key" :entry="entry" />
      </TagsInput.Items>
    </TagsInput.List>
    <slot>
      <TagsInputInput />
    </slot>
  </TagsInput.Root>
</template>
