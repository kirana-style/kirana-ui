<!-- Timeline's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import TimelineDemo from "./timeline-demo.svelte"
  import TimelineActivity from "./timeline-activity.svelte"
  import TimelineAlternate from "./timeline-alternate.svelte"
  import TimelineHorizontal from "./timeline-horizontal.svelte"
  import TimelineIcons from "./timeline-icons.svelte"
</script>

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
  <Example title="Horizontal" data-showcase>
    <TimelineHorizontal />
  </Example>
  <Example title="Icons" data-showcase>
    <TimelineIcons />
  </Example>
</ExampleWrapper>
