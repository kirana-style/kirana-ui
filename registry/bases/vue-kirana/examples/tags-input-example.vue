<!-- Tags Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import TagsInputDemo from "./tags-input-demo.vue"
import TagsInputClear from "./tags-input-clear.vue"
import TagsInputDisabled from "./tags-input-disabled.vue"
import TagsInputForm from "./tags-input-form.vue"
import TagsInputMax from "./tags-input-max.vue"
</script>

<template>
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
</template>
