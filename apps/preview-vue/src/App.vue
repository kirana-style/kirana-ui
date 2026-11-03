<script setup lang="ts">
import { LocaleProvider } from "@ark-ui/vue"
import { css } from "@kirana-style/core"
import { LANGUAGE } from "@workspace/registry/bases/vue-ark/components/language-selector/index.ts"
import { previews } from "@workspace/registry/bases/vue-ark/previews.ts"
import { LANGUAGES } from "@workspace/registry/core/language.ts"
import { previewDirection } from "@workspace/registry/core/preview.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { computed, defineAsyncComponent, onMounted, provide, ref } from "vue"

import { design } from "./design"
import Charts from "./Charts.vue"
import Showcase from "./Showcase.vue"

/**
 * One page per item, as `/preview/vue/ark/<item>`, the showcase and `/create`'s charts; anything
 * else lists them.
 */
const item = location.pathname.match(/\/ark\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]
const load = item ? previews[item] : undefined
const current = load ? defineAsyncComponent(load) : undefined
const locale = computed(() => {
  const { language } = design.value.options
  if (language) return LANGUAGES[language].locale
  return previewDirection(design.value.options) === "rtl" ? "ar" : "en-US"
})
// A right-to-left demo's language; one that the URL does not name is the demo's own.
provide(
  LANGUAGE,
  computed(() => design.value.options.language)
)

/**
 * Sonner's toaster, as upstream's site mounts it on every page (`top-center`): loaded after the
 * page, since only the items that call `toast()` need it.
 */
const SonnerToaster = defineAsyncComponent(
  () => import("@workspace/registry/bases/vue-ark/ui/sonner/Toaster.vue")
)
/** The toast's toaster (Ark UI's), as React's preview mounts Base UI's beside every item. */
const ToastToaster = defineAsyncComponent(
  () => import("@workspace/registry/bases/vue-ark/ui/toast/Toaster.vue")
)
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})
</script>

<template>
  <LocaleProvider :locale="locale">
    <Showcase v-if="item === 'showcase'" />
    <Charts v-else-if="item === 'charts'" />
    <component :is="current" v-else-if="current" />
    <nav v-else :sx="list">
      <a
        v-for="(_, name) in previews"
        :key="name"
        :href="`/preview/vue/ark/${name}`"
      >
        {{ name }}
      </a>
      <a href="/preview/vue/ark/showcase">showcase</a>
    </nav>
    <SonnerToaster v-if="mounted && current" position="top-center" />
    <ToastToaster v-if="mounted && current" />
  </LocaleProvider>
</template>
