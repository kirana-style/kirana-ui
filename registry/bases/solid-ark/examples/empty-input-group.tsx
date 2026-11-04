import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"
import { page } from "../../../styles/page.styles"
import { breakpoint } from "../../../core/scales"

export default function EmptyInputGroup() {
  const styles = {
    smW34: css({ width: { [breakpoint.sm]: "75%" } }),
  }

  return (
    <div sx={page.example}>
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for doesn't exist. Try searching for what
            you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup sx={styles.smW34}>
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <IconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  )
}
