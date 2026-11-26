<!-- Steps's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import StepsDemo from "./steps-demo.svelte"
  import StepsIcons from "./steps-icons.svelte"
  import StepsLinear from "./steps-linear.svelte"
  import StepsVertical from "./steps-vertical.svelte"
</script>

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
