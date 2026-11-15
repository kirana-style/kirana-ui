"use client"

import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../../../ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../ui/input-group"
import { Kbd } from "../../../ui/kbd"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  empty: css({
    height: { "*": null, base: space[72] },
  }),
  inputGroup: css({
    width: { "*": null, base: "calc(3/4 * 100%)" },
  }),
}

export function NotFound() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyTitle>404 - Not Found</EmptyTitle>
            <EmptyDescription>
              The page you&apos;re looking for doesn&apos;t exist. Try searching
              for what you need below.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <InputGroup sx={styles.inputGroup}>
              <InputGroupInput placeholder="Try searching for pages..." />
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="Search01Icon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <Button variant="link">Go to homepage</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
