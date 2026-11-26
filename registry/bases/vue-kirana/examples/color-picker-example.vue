<!-- Color Picker's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import ColorPickerDemo from "./color-picker-demo.vue"
import ColorPickerAlpha from "./color-picker-alpha.vue"
import ColorPickerForm from "./color-picker-form.vue"
import ColorPickerInline from "./color-picker-inline.vue"
import ColorPickerSwatches from "./color-picker-swatches.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <ColorPickerDemo />
    </Example>
    <Example title="Alpha" data-showcase>
      <ColorPickerAlpha />
    </Example>
    <Example title="Form" data-showcase>
      <ColorPickerForm />
    </Example>
    <Example title="Inline" data-showcase>
      <ColorPickerInline />
    </Example>
    <Example title="Swatches" data-showcase>
      <ColorPickerSwatches />
    </Example>
  </ExampleWrapper>
</template>
