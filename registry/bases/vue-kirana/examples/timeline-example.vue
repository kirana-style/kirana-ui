<!-- Timeline's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import { example } from "../../../styles/example.styles"
import TimelineDemo from "./timeline-demo.vue"
import TimelineActivity from "./timeline-activity.vue"
import TimelineAlternate from "./timeline-alternate.vue"
import TimelineHorizontal from "./timeline-horizontal.vue"
import TimelineIcons from "./timeline-icons.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <TimelineDemo />
    </Example>
    <Example title="Activity" data-showcase>
      <TimelineActivity />
    </Example>
    <Example title="Alternate" data-showcase>
      <TimelineAlternate />
    </Example>
    <Example title="Horizontal" :container-sx="example.fullRow" data-showcase>
      <TimelineHorizontal />
    </Example>
    <Example title="Icons" data-showcase>
      <TimelineIcons />
    </Example>
  </ExampleWrapper>
</template>
