<!-- Progress Circle's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import ProgressCircleDemo from "./progress-circle-demo.svelte"
  import ProgressCircleAnimated from "./progress-circle-animated.svelte"
  import ProgressCircleIndeterminate from "./progress-circle-indeterminate.svelte"
  import ProgressCircleSizes from "./progress-circle-sizes.svelte"
</script>

<ExampleWrapper>
  <Example title="Default" data-showcase>
    <ProgressCircleDemo />
  </Example>
  <Example title="Animated" data-showcase>
    <ProgressCircleAnimated />
  </Example>
  <Example title="Indeterminate" data-showcase>
    <ProgressCircleIndeterminate />
  </Example>
  <Example title="Sizes" data-showcase>
    <ProgressCircleSizes />
  </Example>
</ExampleWrapper>
