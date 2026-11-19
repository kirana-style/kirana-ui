import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function InputGroupDemo() {
  const styles = {
    maxWXs: css({ maxWidth: containerSize.xs }),
  }

  return (
    <div sx={page.example}>
      <InputGroup sx={styles.maxWXs}>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  )
}
