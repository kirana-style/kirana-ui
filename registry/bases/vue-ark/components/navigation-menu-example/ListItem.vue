<script setup lang="ts">
import { css } from "@kirana-style/core"
import { NavigationMenuLink } from "../../ui/navigation-menu"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { axes } from "../../../../core/axes"
import { theme } from "../../../../core/tokens"

const styles = {
  listItem: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: {
      [axes.style.nova]: fontSize.sm,
      [axes.style.vega]: fontSize.sm,
      [axes.style.lyra]: fontSize.xs,
      [axes.style.maia]: fontSize.sm,
      [axes.style.mira]: fontSize.xs,
      [axes.style.luma]: fontSize.sm,
    },
    lineHeight: {
      [axes.style.nova]: lineHeight.sm,
      [axes.style.vega]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.maia]: lineHeight.sm,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.sm,
    },
  }),
  title: css({ lineHeight: "1", fontWeight: fontWeight.medium }),
  description: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    color: theme.mutedForeground,
  }),
}

const { title, href } = defineProps<{
  title: string
  href: string
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a :href="href">
        <div :sx="styles.listItem">
          <div :sx="styles.title">
            {{ title }}
          </div>
          <div :sx="styles.description">
            <slot />
          </div>
        </div>
      </a>
    </NavigationMenuLink>
  </li>
</template>
