import { splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { NavigationMenuLink } from "../../ui/navigation-menu"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
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

  return (
    <li {...rest} {...styleProps(local.class, local.sx)}>
      <NavigationMenuLink
        asChild={(childProps) => (
          <a {...childProps()} href={local.href}>
            <div sx={styles.listItemDiv}>
              <div sx={styles.listItemDiv2}>{local.title}</div>
              <div sx={styles.listItemDiv3}>{local.children}</div>
            </div>
          </a>
        )}
      />
    </li>
  )
}
