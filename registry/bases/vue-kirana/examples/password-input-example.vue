<!-- Password Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import PasswordInputDemo from "./password-input-demo.vue"
import PasswordInputControlled from "./password-input-controlled.vue"
import PasswordInputDisabled from "./password-input-disabled.vue"
import PasswordInputForm from "./password-input-form.vue"
import PasswordInputLabels from "./password-input-labels.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <PasswordInputDemo />
    </Example>
    <Example title="Controlled" data-showcase>
      <PasswordInputControlled />
    </Example>
    <Example title="Disabled" data-showcase>
      <PasswordInputDisabled />
    </Example>
    <Example title="Form" data-showcase>
      <PasswordInputForm />
    </Example>
    <Example title="Labels" data-showcase>
      <PasswordInputLabels />
    </Example>
  </ExampleWrapper>
</template>
