<!-- Steps's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import StepsDemo from "./steps-demo.vue"
import StepsIcons from "./steps-icons.vue"
import StepsLinear from "./steps-linear.vue"
import StepsVertical from "./steps-vertical.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <StepsDemo />
    </Example>
    <Example title="Icons" data-showcase>
      <StepsIcons />
    </Example>
    <Example title="Linear" data-showcase>
      <StepsLinear />
    </Example>
    <Example title="Vertical" data-showcase>
      <StepsVertical />
    </Example>
  </ExampleWrapper>
</template>
