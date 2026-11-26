<!-- Tree's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import TreeDemo from "./tree-demo.svelte"
  import TreeControlled from "./tree-controlled.svelte"
  import TreeDisabled from "./tree-disabled.svelte"
  import TreeMultiple from "./tree-multiple.svelte"
</script>

<ExampleWrapper>
  <Example title="Default" data-showcase>
    <TreeDemo />
  </Example>
  <Example title="Controlled" data-showcase>
    <TreeControlled />
  </Example>
  <Example title="Disabled" data-showcase>
    <TreeDisabled />
  </Example>
  <Example title="Multiple" data-showcase>
    <TreeMultiple />
  </Example>
</ExampleWrapper>
