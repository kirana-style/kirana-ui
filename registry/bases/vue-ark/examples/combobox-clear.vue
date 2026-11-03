<script setup lang="ts">
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
import { page } from "../../../styles/page.styles"

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
    <Combobox :items="frameworks" :default-value="frameworks[0]">
      <ComboboxInput placeholder="Select a framework" show-clear />
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
