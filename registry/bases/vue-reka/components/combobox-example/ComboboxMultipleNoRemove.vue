<script setup lang="ts">
import { Example } from "../../components/example"
import { example } from "../../../../styles/example.styles"
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
} from "../../ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const
</script>

<template>
  <Example title="Combobox Multiple (No Remove)">
    <Combobox
      multiple
      auto-highlight
      :items="frameworks"
      :default-value="[frameworks[0], frameworks[1]]"
    >
      <ComboboxChips :sx="example.row">
        <ComboboxValue v-slot="values">
          <ComboboxChip
            v-for="value in values"
            :key="value"
            :value="value"
            :show-remove="false"
          >
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
  </Example>
</template>
