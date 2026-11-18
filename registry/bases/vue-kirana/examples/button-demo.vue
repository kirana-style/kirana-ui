<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    flexDirection: { [breakpoint.md]: "row" },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <IconPlaceholder
          lucide="ArrowUpIcon"
          tabler="IconArrowUp"
          hugeicons="ArrowUp02Icon"
          phosphor="ArrowUpIcon"
          remixicon="RiArrowUpLine"
        />
      </Button>
    </div>
  </div>
</template>
