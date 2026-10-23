<script setup lang="ts">
import { css } from "@kirana-style/core"
import { space } from "@workspace/registry/core/scales.ts"
import type { Component } from "vue"

import ButtonItem from "./items/button.vue"
import DialogItem from "./items/dialog.vue"
import DropdownMenuItem from "./items/dropdown-menu.vue"
import SelectItem from "./items/select.vue"

/** One page per item, as `/preview/vue/ark/<item>`; anything else lists them. */
const ITEMS: Record<string, Component> = {
  button: ButtonItem,
  dialog: DialogItem,
  "dropdown-menu": DropdownMenuItem,
  select: SelectItem,
}

const item = location.pathname.match(/\/ark\/([a-z-]+)\/?$/)?.[1]
const current = item ? ITEMS[item] : undefined

const styles = {
  page: css({ padding: space[6] }),
  list: css({ display: "flex", flexDirection: "column", gap: space[2] }),
}
</script>

<template>
  <main :sx="styles.page">
    <component :is="current" v-if="current" />
    <nav v-else :sx="styles.list">
      <a
        v-for="(_, name) in ITEMS"
        :key="name"
        :href="`/preview/vue/ark/${name}`"
      >
        {{ name }}
      </a>
    </nav>
  </main>
</template>
