<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWXsFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexWFullMaxWXsFlexColGa">
      <InputGroup>
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
        <InputGroupAddon align="inline-end">
          <Kbd> ⌘ </Kbd>
          <Kbd> K </Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>
