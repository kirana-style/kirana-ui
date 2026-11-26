<!-- Tags Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import TagsInputDemo from "./tags-input-demo.svelte"
  import TagsInputClear from "./tags-input-clear.svelte"
  import TagsInputDisabled from "./tags-input-disabled.svelte"
  import TagsInputForm from "./tags-input-form.svelte"
  import TagsInputMax from "./tags-input-max.svelte"
</script>

<ExampleWrapper>
  <Example title="Default" data-showcase>
    <TagsInputDemo />
  </Example>
  <Example title="Clear" data-showcase>
    <TagsInputClear />
  </Example>
  <Example title="Disabled" data-showcase>
    <TagsInputDisabled />
  </Example>
  <Example title="Form" data-showcase>
    <TagsInputForm />
  </Example>
  <Example title="Max" data-showcase>
    <TagsInputMax />
  </Example>
</ExampleWrapper>
