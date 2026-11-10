<script setup lang="ts">
import { css } from "@kirana-style/core"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "../ui/combobox"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWXs: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
  }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const
</script>

<template>
  <div :sx="page.example">
    <Combobox
      multiple
      auto-highlight
      :items="frameworks"
      :default-value="[frameworks[0]]"
    >
      <ComboboxChips :sx="styles.wFullMaxWXs">
        <ComboboxValue v-slot="values">
          <ComboboxChip v-for="value in values" :key="value" :value="value">
            {{ value }}
          </ComboboxChip>
          <ComboboxChipsInput />
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty> No items found. </ComboboxEmpty>
        <ComboboxList v-slot="{ item }">
          <ComboboxItem :key="item" :value="item">
            {{ item }}
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
