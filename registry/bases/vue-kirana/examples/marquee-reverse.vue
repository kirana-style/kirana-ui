<script setup lang="ts">
import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { Marquee, MarqueeItem } from "../ui/marquee"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  rows: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    width: "100%",
    maxWidth: containerSize.lg,
  }),
}

const FIRST = ["Design", "Engineering", "Research", "Marketing", "Sales"]
const SECOND = ["Support", "Finance", "Legal", "Operations", "People"]
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.rows">
      <Marquee speed="30s" fade>
        <MarqueeItem v-for="team in FIRST" :key="team">
          <Badge variant="outline">{{ team }}</Badge>
        </MarqueeItem>
      </Marquee>
      <Marquee speed="30s" fade reverse>
        <MarqueeItem v-for="team in SECOND" :key="team">
          <Badge variant="outline">{{ team }}</Badge>
        </MarqueeItem>
      </Marquee>
    </div>
  </div>
</template>
