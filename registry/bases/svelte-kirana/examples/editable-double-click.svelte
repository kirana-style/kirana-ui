<script lang="ts">
  import {
    Editable,
    EditableEditTrigger,
    EditableInput,
    EditablePreview,
  } from "../ui/editable"
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel for="editable-double-click-title">
      Board title
    </FieldLabel>
    <Editable activation="dblclick" defaultValue="Spring launch" placeholder="Untitled board">
      <EditablePreview />
      <EditableInput id="editable-double-click-title" />
      <EditableEditTrigger />
    </Editable>
    <FieldDescription>
      Double-click the title, or press the pencil, to rename the board.
    </FieldDescription>
  </Field>
</div>
