<script setup lang="ts">
import { ToastProvider } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import ToastList from "./ToastList.vue"
import { toaster } from "./toast"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Base UI's: three at most, each gone after five seconds; swiped right to close. -->
  <ToastProvider
    :toast-manager="toaster"
    :limit="3"
    :duration="5000"
    v-bind="attrs"
  >
    <ToastList :sx="sx" />
  </ToastProvider>
</template>
