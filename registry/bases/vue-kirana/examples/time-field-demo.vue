<script setup lang="ts">
import { ref } from "vue"

import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"
import { page } from "../../../styles/page.styles"

const start = ref<string | null>("09:30")
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel id="time-field-demo-label">Meeting starts at</FieldLabel>
      <TimeField
        aria-labelledby="time-field-demo-label"
        locale="en-US"
        v-model:value="start"
      />
    </Field>
  </div>
</template>
