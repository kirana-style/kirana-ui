<script setup lang="ts">
import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel id="time-field-24-hour-label">Departure</FieldLabel>
      <TimeField
        aria-labelledby="time-field-24-hour-label"
        locale="en-US"
        :hour-cycle="24"
        default-value="17:45"
      />
    </Field>
  </div>
</template>
