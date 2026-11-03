<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { Input } from "../ui/input"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Field>
    <FieldLabel for="picture">
      Picture
    </FieldLabel>
    <Input id="picture" type="file" />
    <FieldDescription>
      Select a picture to upload.
    </FieldDescription>
  </Field>
</div>
