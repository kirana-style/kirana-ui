<!-- Tour's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import TourDemo from "./tour-demo.vue"
import TourControlled from "./tour-controlled.vue"
import TourPlacement from "./tour-placement.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <TourDemo />
    </Example>
    <Example title="Controlled" data-showcase>
      <TourControlled />
    </Example>
    <Example title="Placement" data-showcase>
      <TourPlacement />
    </Example>
  </ExampleWrapper>
</template>
