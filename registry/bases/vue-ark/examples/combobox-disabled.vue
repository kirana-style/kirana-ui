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
    <Combobox :items="frameworks">
      <ComboboxInput placeholder="Select a framework" disabled />
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
