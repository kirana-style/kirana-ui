<!-- Editable's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import EditableDemo from "./editable-demo.vue"
import EditableDisabled from "./editable-disabled.vue"
import EditableDoubleClick from "./editable-double-click.vue"
import EditableTriggers from "./editable-triggers.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <EditableDemo />
    </Example>
    <Example title="Disabled" data-showcase>
      <EditableDisabled />
    </Example>
    <Example title="Double Click" data-showcase>
      <EditableDoubleClick />
    </Example>
    <Example title="Triggers" data-showcase>
      <EditableTriggers />
    </Example>
  </ExampleWrapper>
</template>
