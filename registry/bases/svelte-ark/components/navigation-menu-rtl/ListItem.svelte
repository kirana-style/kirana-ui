<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { NavigationMenuLink } from "../../ui/navigation-menu"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../../core/tokens"
  import {
    fontSize,
    fontWeight,
    lineHeight,
    space,
  } from "../../../../core/scales"

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
</script>

<li {...rest} sx={[className as Sx]}>
  <NavigationMenuLink>
    {#snippet asChild(props)}
      <a {...props()} href={href}>
        <div sx={styles.listItemDiv}>
          <div sx={styles.listItemDiv2}>
            {title}
          </div>
          <div sx={styles.listItemDiv3}>
            {@render children?.()}
          </div>
        </div>
      </a>
    {/snippet}
  </NavigationMenuLink>
</li>
