<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
  import { containerSize } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ maxWidth: containerSize.sm }),
    textMutedForeground: css({ color: theme.mutedForeground }),
  }
</script>

<div sx={page.example}>
  <Field sx={styles.narrow}>
    <FieldLabel for="inline-start-input">
      Input
    </FieldLabel>
    <InputGroup>
      <InputGroupInput id="inline-start-input" placeholder="Search..." />
      <InputGroupAddon align="inline-start">
        <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" sx={styles.textMutedForeground} />
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription>
      Icon positioned at the start.
    </FieldDescription>
  </Field>
</div>
