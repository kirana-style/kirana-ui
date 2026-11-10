<script setup lang="ts">
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { CardFooter } from "../../ui/card"

const styles = {
  trendRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  noteRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    color: theme.mutedForeground,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({ lineHeight: "1", color: theme.mutedForeground }),
  // `flex-col gap-2`, centred by the footer's own `items-center`.
  polarFooter: css({ flexDirection: "column", gap: space[2] }),
}

const { note, row } = defineProps<{
  note: string
  row?: boolean
}>()
</script>

<template>
  <CardFooter :sx="styles.polarFooter">
    <div :sx="styles.trendRow">
      Trending up by 5.2% this month{{ " " }}
      <IconPlaceholder
        lucide="TrendingUpIcon"
        tabler="IconTrendingUp"
        hugeicons="ChartUpIcon"
        phosphor="TrendUpIcon"
        remixicon="RiLineChartLine"
        :sx="styles.icon"
      />
    </div>
    <div :sx="row ? styles.noteRow : styles.note">
      {{ note }}
    </div>
  </CardFooter>
</template>
