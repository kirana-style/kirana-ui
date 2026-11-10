<script setup lang="ts">
import { LocaleProvider } from "@ark-ui/vue"
import { ConfigProvider } from "reka-ui"
import { css } from "@kirana-style/core"
import { LANGUAGE } from "@workspace/registry/bases/vue-ark/components/language-selector/index.ts"
import { previews as arkPreviews } from "@workspace/registry/bases/vue-ark/previews.ts"
import { previews as rekaPreviews } from "@workspace/registry/bases/vue-reka/previews.ts"
import { LANGUAGES } from "@workspace/registry/core/language.ts"
import { previewDirection } from "@workspace/registry/core/preview.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { computed, defineAsyncComponent, onMounted, provide, ref } from "vue"

import { design } from "./design"
import Charts from "./Charts.vue"
import Showcase from "./Showcase.vue"

/**
 * One page per item, as `/preview/vue/<base>/<item>` (Ark UI's, `ark`, or Reka UI's, `reka`), the
 * showcase and `/create`'s charts; anything else lists them.
 */
const [, base = "ark", item] =
  location.pathname.match(/\/(ark|reka)\/([a-z0-9-]+?)(?:\.html)?\/?$/) ??
  location.pathname.match(/\/(ark|reka)\/?$/) ??
  []
const previews = base === "reka" ? rekaPreviews : arkPreviews
const load = item ? previews[item] : undefined
const current = load ? defineAsyncComponent(load) : undefined
const locale = computed(() => {
  const { language } = design.value.options
  if (language) return LANGUAGES[language].locale
  return previewDirection(design.value.options) === "rtl" ? "ar" : "en-US"
})
const direction = computed(() => previewDirection(design.value.options))
// A right-to-left demo's language; one that the URL does not name is the demo's own.
provide(
  LANGUAGE,
  computed(() => design.value.options.language)
)

/**
 * Sonner's toaster, as upstream's site mounts it on every page (`top-center`): loaded after the
 * page, since only the items that call `toast()` need it.
 */
const SonnerToaster = defineAsyncComponent(() =>
  base === "reka"
    ? import("@workspace/registry/bases/vue-reka/ui/sonner/Toaster.vue")
    : import("@workspace/registry/bases/vue-ark/ui/sonner/Toaster.vue")
)
/** The toast's toaster, the base's own, as React's preview mounts Base UI's beside every item. */
const ToastToaster = defineAsyncComponent(() =>
  base === "reka"
    ? import("@workspace/registry/bases/vue-reka/ui/toast/Toaster.vue")
    : import("@workspace/registry/bases/vue-ark/ui/toast/Toaster.vue")
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
  <!-- Each base's own direction and locale: Ark UI's provider, or Reka UI's. -->
  <component
    :is="base === 'reka' ? ConfigProvider : LocaleProvider"
    v-bind="base === 'reka' ? { dir: direction, locale } : { locale }"
  >
    <Showcase v-if="item === 'showcase'" />
    <Charts v-else-if="item === 'charts'" />
    <component :is="current" v-else-if="current" />
    <nav v-else :sx="list">
      <a
        v-for="(_, name) in previews"
        :key="name"
        :href="`/preview/vue/${base}/${name}`"
      >
        {{ name }}
      </a>
      <a :href="`/preview/vue/${base}/showcase`">showcase</a>
    </nav>
    <SonnerToaster v-if="mounted && current" position="top-center" />
    <ToastToaster v-if="mounted && current" />
  </component>
</template>
