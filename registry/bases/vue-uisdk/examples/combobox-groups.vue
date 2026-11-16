<script setup lang="ts">
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "../ui/combobox"
import { page } from "../../../styles/page.styles"

const timezones = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
] as const
</script>

<template>
  <div :sx="page.example">
    <Combobox :items="timezones">
      <ComboboxInput placeholder="Select a timezone" />
      <ComboboxContent>
        <ComboboxEmpty> No timezones found. </ComboboxEmpty>
        <ComboboxList v-slot="{ item: group, index }">
          <ComboboxGroup :key="group.value" :items="group.items">
            <ComboboxLabel>
              {{ group.value }}
            </ComboboxLabel>
            <ComboboxCollection v-slot="{ item }">
              <ComboboxItem :key="item" :value="item">
                {{ item }}
              </ComboboxItem>
            </ComboboxCollection>
            <ComboboxSeparator v-if="index < timezones.length - 1" />
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
