<!-- Tour's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import TourDemo from "./tour-demo.svelte"
  import TourControlled from "./tour-controlled.svelte"
  import TourPlacement from "./tour-placement.svelte"
</script>

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
