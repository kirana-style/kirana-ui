<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { spinner } from "../../../../styles/spinner.styles"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <IconPlaceholder
    data-slot="spinner"
    lucide="Loader2Icon"
    tabler="IconLoader"
    hugeicons="Loading03Icon"
    phosphor="SpinnerIcon"
    remixicon="RiLoaderLine"
    role="status"
    aria-label="Loading"
    v-bind="attrs"
    :sx="[spinner, sx]"
  />
</template>
