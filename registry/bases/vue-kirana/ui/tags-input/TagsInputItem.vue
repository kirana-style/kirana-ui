<script setup lang="ts">
import type { TagsInputEntry } from "@kirana-ui/vue"
import { TagsInput } from "@kirana-ui/vue/tags-input"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import { tagsInput } from "../../../../styles/tags-input.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

/**
 * A tag: its text (its slot, given one), the input it is edited in, and its remove button.
 */
const { entry, showRemove = true } = defineProps<{
  entry: TagsInputEntry
  showRemove?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <TagsInput.Item
    data-slot="tags-input-item"
    :entry="entry"
    v-bind="attrs"
    :sx="[combobox.chip, tagsInput.item, sx]"
  >
    <!-- Given no slot, the primitive writes the tag's text. -->
    <TagsInput.ItemText v-if="$slots.default" data-slot="tags-input-item-text">
      <slot />
    </TagsInput.ItemText>
    <TagsInput.ItemText v-else data-slot="tags-input-item-text" />
    <TagsInput.ItemInput
      data-slot="tags-input-item-input"
      :sx="tagsInput.itemInput"
    />
    <TagsInput.ItemRemove
      v-if="showRemove"
      data-slot="tags-input-item-remove"
      as-child
    >
      <Button
        variant="ghost"
        size="icon-xs"
        :sx="[combobox.chipRemove, tagsInput.itemRemove]"
      >
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      </Button>
    </TagsInput.ItemRemove>
  </TagsInput.Item>
</template>
