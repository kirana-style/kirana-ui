<!-- Editable's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import EditableDemo from "./editable-demo.svelte"
  import EditableDisabled from "./editable-disabled.svelte"
  import EditableDoubleClick from "./editable-double-click.svelte"
  import EditableTriggers from "./editable-triggers.svelte"
</script>

<ExampleWrapper>
  <Example title="Default" data-showcase>
    <EditableDemo />
  </Example>
  <Example title="Disabled" data-showcase>
    <EditableDisabled />
  </Example>
  <Example title="Double Click" data-showcase>
    <EditableDoubleClick />
  </Example>
  <Example title="Triggers" data-showcase>
    <EditableTriggers />
  </Example>
</ExampleWrapper>
