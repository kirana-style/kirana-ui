<script setup lang="ts">
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel id="time-field-seconds-label">Lap time</FieldLabel>
      <TimeField
        aria-labelledby="time-field-seconds-label"
        aria-describedby="time-field-seconds-description"
        locale="en-US"
        :hour-cycle="24"
        granularity="second"
        default-value="00:04:37"
      />
      <FieldDescription id="time-field-seconds-description">
        Hours, minutes and seconds.
      </FieldDescription>
    </Field>
  </div>
</template>
