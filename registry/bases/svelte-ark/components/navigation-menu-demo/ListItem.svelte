<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { css } from "@kirana-style/core"
  import { NavigationMenuLink } from "../../ui/navigation-menu"
  import {
    fontSize,
    fontWeight,
    lineHeight,
    space,
  } from "../../../../core/scales"
  import { theme } from "../../../../core/tokens"

  let {
    title, href,
    class: className,
    children,
    ...rest
  }: {
    title: string
    href: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

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
</script>

<li {...rest} class={className}>
  <NavigationMenuLink>
    {#snippet asChild(props)}
      <a {...props()} href={href}>
        <div sx={styles.listItem}>
          <div sx={styles.title}>
            {title}
          </div>
          <div sx={styles.description}>
            {@render children?.()}
          </div>
        </div>
      </a>
    {/snippet}
  </NavigationMenuLink>
</li>
