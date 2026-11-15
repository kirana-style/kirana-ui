import { css, props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

export default function InputGroupKbd() {
  return (
    <div sx={page.example}>
      <InputGroup sx={styles.narrow}>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            {...styleProps(styles.textMutedForeground)}
          />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
