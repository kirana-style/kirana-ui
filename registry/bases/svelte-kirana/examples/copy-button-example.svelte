<!-- Copy Button's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import CopyButtonDemo from "./copy-button-demo.svelte"
  import CopyButtonInput from "./copy-button-input.svelte"
  import CopyButtonText from "./copy-button-text.svelte"
  import CopyButtonVariants from "./copy-button-variants.svelte"
</script>

<ExampleWrapper>
  <Example title="Default" data-showcase>
    <CopyButtonDemo />
  </Example>
  <Example title="Input" data-showcase>
    <CopyButtonInput />
  </Example>
  <Example title="Text" data-showcase>
    <CopyButtonText />
  </Example>
  <Example title="Variants" data-showcase>
    <CopyButtonVariants />
  </Example>
</ExampleWrapper>
