<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Field, FieldLabel } from "../ui/field"
  import { TagsInput, TagsInputInput, TagsInputClear } from "../ui/tags-input"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  }
</script>

<div sx={page.example}>
  <Field sx={styles.narrow}>
    <FieldLabel for="tags-input-filters">Filters</FieldLabel>
    <TagsInput defaultValue={["Open", "Assigned to me", "This week"]}>
      <TagsInputInput id="tags-input-filters" placeholder="Add a filter" />
      <TagsInputClear />
    </TagsInput>
  </Field>
</div>
