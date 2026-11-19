import { splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { NavigationMenuLink } from "../../ui/navigation-menu"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
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
