<script setup lang="ts">
import { TagsInput } from "@kirana-ui/vue/tags-input"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { tagsInput } from "../../../../styles/tags-input.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Takes every tag away: a ghost `icon-xs` Button, hidden by the primitive while there is none. -->
  <TagsInput.Clear data-slot="tags-input-clear" v-bind="attrs" as-child>
    <Button variant="ghost" size="icon-xs" :sx="[tagsInput.clear, sx]">
      <slot>
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      </slot>
    </Button>
  </TagsInput.Clear>
</template>
