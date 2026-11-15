<script setup lang="ts">
import { NavigationMenuLink } from "../../ui/navigation-menu"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"

const styles = {
  listItemDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  listItemDiv2: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  listItemDiv3: css({
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
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
        <div :sx="styles.listItemDiv">
          <div :sx="styles.listItemDiv2">
            {{ title }}
          </div>
          <div :sx="styles.listItemDiv3">
            <slot />
          </div>
        </div>
      </a>
    </NavigationMenuLink>
  </li>
</template>
