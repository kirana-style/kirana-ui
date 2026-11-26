<!-- Marquee's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import MarqueeDemo from "./marquee-demo.svelte"
  import MarqueeFade from "./marquee-fade.svelte"
  import MarqueePause from "./marquee-pause.svelte"
  import MarqueeReverse from "./marquee-reverse.svelte"
  import MarqueeVertical from "./marquee-vertical.svelte"
</script>

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
