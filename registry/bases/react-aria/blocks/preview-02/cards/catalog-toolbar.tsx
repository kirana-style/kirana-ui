"use client"

import { Button } from "../../../ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
  }),
  inputGroup: css({
    flex: "1 1 0%",
  }),
}

export function CatalogToolbar() {
  return (
    <div sx={styles.div}>
      <InputGroup sx={styles.inputGroup}>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search releases or catalog..." />
      </InputGroup>
      <Button>
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="Add01Icon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
        />
        Upload New Release
      </Button>
      <ToggleGroup defaultSelectedKeys={["releases"]} variant="outline">
        <ToggleGroupItem id="all-tracks">All Tracks</ToggleGroupItem>
        <ToggleGroupItem id="releases">Releases</ToggleGroupItem>
        <ToggleGroupItem id="top-earners">Top Earners</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
