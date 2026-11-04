<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
  import { Kbd } from "../ui/kbd"
  import { containerSize } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ maxWidth: containerSize.sm }),
    textMutedForeground: css({ color: theme.mutedForeground }),
  }
</script>

<div sx={page.example}>
  <InputGroup sx={styles.narrow}>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" sx={styles.textMutedForeground} />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <Kbd>
        ⌘K
      </Kbd>
    </InputGroupAddon>
  </InputGroup>
</div>
