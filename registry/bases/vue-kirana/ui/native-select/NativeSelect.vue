<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { nativeSelect } from "../../../../styles/native-select.styles"

defineOptions({ inheritAttrs: false })

// `v-model` on the select, as on a native one.
const model = defineModel<string>()
const { size = "default" } = defineProps<{ size?: "sm" | "default" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="native-select-wrapper"
    :data-size="size"
    :sx="[nativeSelect.wrapper, sx]"
  >
    <!-- The value only when the caller keeps one: Vue's `v-model` on a select with none clears it,
         where a select shows its first option. -->
    <select
      data-slot="native-select"
      :data-size="size"
      v-bind="model === undefined ? attrs : { ...attrs, value: model }"
      :sx="nativeSelect.select"
      @change="model = ($event.target as HTMLSelectElement).value"
    >
      <slot />
    </select>
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconSelector"
      hugeicons="UnfoldMoreIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      aria-hidden="true"
      data-slot="native-select-icon"
      :sx="nativeSelect.icon"
    />
  </div>
</template>
