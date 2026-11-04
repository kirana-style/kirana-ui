import { splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { NavigationMenuLink } from "../../ui/navigation-menu"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { axes } from "../../../../core/axes"
import { theme } from "../../../../core/tokens"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function ListItem(props: {
  title: string
  href: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "title",
    "href",
    "class",
    "sx",
    "children",
  ])
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

  return (
    <li {...rest} {...styleProps(local.class, local.sx)}>
      <NavigationMenuLink
        asChild={(childProps) => (
          <a {...childProps()} href={local.href}>
            <div sx={styles.listItem}>
              <div sx={styles.title}>{local.title}</div>
              <div sx={styles.description}>{local.children}</div>
            </div>
          </a>
        )}
      />
    </li>
  )
}
