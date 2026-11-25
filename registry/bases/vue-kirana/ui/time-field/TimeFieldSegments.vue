<script setup lang="ts">
import { TimeField } from "@kirana-ui/vue/time-field"

import TimeFieldSegment from "./TimeFieldSegment.vue"
</script>

<template>
  <!-- The time's segments, in the locale's order: each drawn as a `TimeFieldSegment` unless the
       slot draws it (`v-slot="{ segment }"`). -->
  <TimeField.Segments v-slot="{ segment }">
    <slot :segment="segment">
      <TimeFieldSegment :segment="segment" />
    </slot>
  </TimeField.Segments>
</template>
