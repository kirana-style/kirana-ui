<script setup lang="ts">
import { LocaleProvider } from "@ark-ui/vue"
import { css } from "@kirana-style/core"
import { previews } from "@workspace/registry/bases/vue-ark/previews.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { computed } from "vue"

import { design } from "./design"

/** One page per item, as `/preview/vue/ark/<item>`; anything else lists them. */
const item = location.pathname.match(/\/ark\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]
const current =
  item && item in previews ? previews[item as keyof typeof previews] : undefined
const locale = computed(() => (design.value.options.rtl ? "ar" : "en-US"))

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})
</script>

<template>
  <LocaleProvider :locale="locale">
    <component :is="current" v-if="current" />
    <nav v-else :sx="list">
      <a
        v-for="(_, name) in previews"
        :key="name"
        :href="`/preview/vue/ark/${name}`"
      >
        {{ name }}
      </a>
    </nav>
  </LocaleProvider>
</template>
