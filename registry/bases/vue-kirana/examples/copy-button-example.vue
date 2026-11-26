<!-- Copy Button's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import CopyButtonDemo from "./copy-button-demo.vue"
import CopyButtonInput from "./copy-button-input.vue"
import CopyButtonText from "./copy-button-text.vue"
import CopyButtonVariants from "./copy-button-variants.vue"
</script>

<template>
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
</template>
