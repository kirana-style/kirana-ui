<!-- Time Field's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import TimeFieldDemo from "./time-field-demo.vue"
import TimeField24Hour from "./time-field-24-hour.vue"
import TimeFieldDisabled from "./time-field-disabled.vue"
import TimeFieldForm from "./time-field-form.vue"
import TimeFieldSeconds from "./time-field-seconds.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <TimeFieldDemo />
    </Example>
    <Example title="24 Hour" data-showcase>
      <TimeField24Hour />
    </Example>
    <Example title="Disabled" data-showcase>
      <TimeFieldDisabled />
    </Example>
    <Example title="Form" data-showcase>
      <TimeFieldForm />
    </Example>
    <Example title="Seconds" data-showcase>
      <TimeFieldSeconds />
    </Example>
  </ExampleWrapper>
</template>
