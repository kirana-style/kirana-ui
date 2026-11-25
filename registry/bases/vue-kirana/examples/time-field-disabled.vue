<script setup lang="ts">
import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow" data-disabled="true">
      <FieldLabel id="time-field-disabled-label">Check-in from</FieldLabel>
      <TimeField
        aria-labelledby="time-field-disabled-label"
        locale="en-US"
        default-value="15:00"
        disabled
      />
    </Field>
  </div>
</template>
