<!-- Segmented Control's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import SegmentedControlDemo from "./segmented-control-demo.vue"
import SegmentedControlDisabled from "./segmented-control-disabled.vue"
import SegmentedControlForm from "./segmented-control-form.vue"
import SegmentedControlIcons from "./segmented-control-icons.vue"
import SegmentedControlSizes from "./segmented-control-sizes.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <SegmentedControlDemo />
    </Example>
    <Example title="Disabled" data-showcase>
      <SegmentedControlDisabled />
    </Example>
    <Example title="Form" data-showcase>
      <SegmentedControlForm />
    </Example>
    <Example title="Icons" data-showcase>
      <SegmentedControlIcons />
    </Example>
    <Example title="Sizes" data-showcase>
      <SegmentedControlSizes />
    </Example>
  </ExampleWrapper>
</template>
