<script setup lang="ts">
import { css } from "@kirana-style/core"
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
import { Field, FieldDescription, FieldError, FieldLabel } from "../../ui/field"
import { space } from "../../../../core/scales"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
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
  <Example title="Combobox Multiple Invalid">
    <div :sx="[styles.flexCol4, example.row]">
      <Combobox
        multiple
        auto-highlight
        :items="frameworks"
        :default-value="[frameworks[0], frameworks[1]]"
      >
        <ComboboxChips>
          <ComboboxValue v-slot="values">
            <ComboboxChip v-for="value in values" :key="value" :value="value">
              {{ value }}
            </ComboboxChip>
            <ComboboxChipsInput aria-invalid="true" />
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
      <Field data-invalid="true">
        <FieldLabel for="combobox-multiple-invalid"> Frameworks </FieldLabel>
        <Combobox
          multiple
          auto-highlight
          :items="frameworks"
          :default-value="[frameworks[0], frameworks[1], frameworks[2]]"
        >
          <ComboboxChips>
            <ComboboxValue v-slot="values">
              <ComboboxChip v-for="value in values" :key="value" :value="value">
                {{ value }}
              </ComboboxChip>
              <ComboboxChipsInput
                id="combobox-multiple-invalid"
                aria-invalid="true"
              />
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
        <FieldDescription>
          Please select at least one framework.
        </FieldDescription>
        <FieldError :errors="[{ message: 'This field is required.' }]" />
      </Field>
    </div>
  </Example>
</template>
