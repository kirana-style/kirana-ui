<!-- Tree's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import TreeDemo from "./tree-demo.vue"
import TreeControlled from "./tree-controlled.vue"
import TreeDisabled from "./tree-disabled.vue"
import TreeMultiple from "./tree-multiple.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <TreeDemo />
    </Example>
    <Example title="Controlled" data-showcase>
      <TreeControlled />
    </Example>
    <Example title="Disabled" data-showcase>
      <TreeDisabled />
    </Example>
    <Example title="Multiple" data-showcase>
      <TreeMultiple />
    </Example>
  </ExampleWrapper>
</template>
