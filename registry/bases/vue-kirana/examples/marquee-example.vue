<!-- Marquee's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import MarqueeDemo from "./marquee-demo.vue"
import MarqueeFade from "./marquee-fade.vue"
import MarqueePause from "./marquee-pause.vue"
import MarqueeReverse from "./marquee-reverse.vue"
import MarqueeVertical from "./marquee-vertical.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <MarqueeDemo />
    </Example>
    <Example title="Fade" data-showcase>
      <MarqueeFade />
    </Example>
    <Example title="Pause" data-showcase>
      <MarqueePause />
    </Example>
    <Example title="Reverse" data-showcase>
      <MarqueeReverse />
    </Example>
    <Example title="Vertical" data-showcase>
      <MarqueeVertical />
    </Example>
  </ExampleWrapper>
</template>
