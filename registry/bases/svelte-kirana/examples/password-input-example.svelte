<!-- Password Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import PasswordInputDemo from "./password-input-demo.svelte"
  import PasswordInputControlled from "./password-input-controlled.svelte"
  import PasswordInputDisabled from "./password-input-disabled.svelte"
  import PasswordInputForm from "./password-input-form.svelte"
  import PasswordInputLabels from "./password-input-labels.svelte"
</script>

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
