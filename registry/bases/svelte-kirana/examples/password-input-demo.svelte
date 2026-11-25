<script lang="ts">
  import { Field, FieldLabel } from "../ui/field"
  import { PasswordInput } from "../ui/password-input"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel for="password-input-demo">Password</FieldLabel>
    <PasswordInput id="password-input-demo" autocomplete="current-password" placeholder="Enter your password" />
  </Field>
</div>
