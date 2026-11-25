<script setup lang="ts">
import { css } from "@kirana-style/core"

import { CopyButton } from "../ui/copy-button"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  rows: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
}

const VALUE = "pk_live_4eC39HqLyjWDarjtT1zdp7dc"
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.rows">
      <div :sx="styles.row">
        <CopyButton :value="VALUE" variant="outline" />
        <CopyButton :value="VALUE" variant="secondary" />
        <CopyButton :value="VALUE" variant="ghost" />
      </div>
      <div :sx="styles.row">
        <CopyButton :value="VALUE" variant="outline" size="icon-xs" />
        <CopyButton :value="VALUE" variant="outline" size="icon-sm" />
        <CopyButton :value="VALUE" variant="outline" size="icon" />
        <CopyButton :value="VALUE" variant="outline" size="icon-lg" />
      </div>
    </div>
  </div>
</template>
