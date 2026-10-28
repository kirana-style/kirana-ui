<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Skeleton } from "../ui/skeleton"
import { space } from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[4] }),
  lines: css({ display: "flex", flexDirection: "column", gap: space[2] }),
  avatar: css({
    width: space[12],
    height: space[12],
    borderRadius: radius.full,
  }),
  wide: css({ height: space[4], width: "250px" }),
  narrow: css({ height: space[4], width: "200px" }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.row">
      <Skeleton :sx="styles.avatar" />
      <div :sx="styles.lines">
        <Skeleton :sx="styles.wide" />
        <Skeleton :sx="styles.narrow" />
      </div>
    </div>
  </div>
</template>
