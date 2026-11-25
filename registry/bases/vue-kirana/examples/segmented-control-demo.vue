<script setup lang="ts">
import { ref } from "vue"

import { Field, FieldLabel } from "../ui/field"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"
import { page } from "../../../styles/page.styles"

const view = ref("list")
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel id="segmented-control-demo-label">View</FieldLabel>
      <SegmentedControl
        aria-labelledby="segmented-control-demo-label"
        v-model:value="view"
      >
        <SegmentedControlItem value="list">List</SegmentedControlItem>
        <SegmentedControlItem value="board">Board</SegmentedControlItem>
        <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
      </SegmentedControl>
    </Field>
  </div>
</template>
