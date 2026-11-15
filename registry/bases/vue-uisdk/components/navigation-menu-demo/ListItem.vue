<script setup lang="ts">
import { css } from "@kirana-style/core"
import { NavigationMenuLink } from "../../ui/navigation-menu"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { theme } from "../../../../core/tokens"

const styles = {
  listItem: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
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
