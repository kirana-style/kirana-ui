/**
 * The header menus' contents, loaded when a menu first opens (and fetched ahead as the pointer
 * reaches the menus): each panel's featured destinations on their landscapes with their
 * illustrations, its links with their glyphs, and the phone sheet's groups. The triggers and the
 * menu itself are in `site-nav.tsx`, on every page from the first paint.
 */
import { css } from "@kirana-style/core"

import { DocsLink } from "@/components/docs-link"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import { NavigationMenuLink } from "@workspace/ui/components/navigation-menu"

import { IconTile } from "./icon-tile"
import { MenuArt } from "./menu-art"
import { LINKS, MENUS, SCENES, sceneImage } from "./nav"
import type { Featured, Menu, NavLinkItem } from "./nav"

const LIFT =
  "0 1px 2px light-dark(rgb(0 0 0 / 0.04), rgb(0 0 0 / 0.4)), 0 12px 32px -12px light-dark(rgb(0 0 0 / 0.18), rgb(0 0 0 / 0.75))"
const REST = "0 0 0 0 transparent"

const styles = {
  panel: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    width: "56rem",
    padding: space[2],
    gap: space[2],
    borderRadius: "0.875rem",
    backgroundColor: theme.popover,
    boxShadow: `0 0 0 1px ${alpha.foreground10}`,
  }),
  panelNarrow: css({ width: "44rem" }),
  featured: css({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    padding: space[2],
    backgroundColor: {
      base: theme.card,
      ":hover": theme.card,
      ":focus": theme.card,
      "[data-active]": theme.card,
    },
    textDecorationLine: "none",
    color: theme.foreground,
    outlineStyle: "none",
    transitionProperty: "box-shadow",
    transitionDuration: duration[200],
    boxShadow: {
      base: REST,
      ":hover": LIFT,
      ":focus-visible": `0 0 0 3px ${alpha.ring50}`,
    },
  }),
  art: css({
    position: "relative",
    isolation: "isolate",
    display: "grid",
    placeItems: "center",
    height: "9rem",
    overflow: "hidden",
    borderRadius: `calc(${radius["2xl"]} - ${space[2]})`,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  artPhoto: css({
    position: "absolute",
    inset: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "saturate(0.9)",
    scale: { base: "1.02", ":is([data-featured]:hover *)": "1.06" },
    transitionProperty: "scale",
    transitionDuration: duration[300],
    transitionTimingFunction: easing.inOut,
  }),
  artVeil: css({
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, ${theme.background} 10%, transparent), color-mix(in oklab, ${theme.background} 38%, transparent))`,
  }),
  artScene: css({
    translate: { base: "0 0", ":is([data-featured]:hover *)": "0 -3px" },
    transitionProperty: "translate",
    transitionDuration: duration[300],
    transitionTimingFunction: easing.inOut,
  }),
  featuredCopy: css({
    display: "grid",
    alignContent: "start",
    gap: space[1],
    padding: space[3],
  }),
  featuredTitle: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
  featuredText: css({
    fontSize: fontSize.xs,
    lineHeight: "1.55",
    color: theme.mutedForeground,
  }),
  column: css({ display: "grid", alignContent: "start", gap: space["0.5"] }),
  columnTitle: css({
    paddingInline: space[3],
    paddingBlock: space[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  row: css({
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "center",
    gap: space[3],
    borderRadius: radius.lg,
    padding: space[2],
    paddingInlineEnd: space[3],
    textDecorationLine: "none",
    color: theme.foreground,
    backgroundColor: { base: "transparent", ":hover": alpha.muted50 },
    transitionProperty: "background-color",
    transitionDuration: duration[150],
  }),
  rowText: css({ display: "grid", minWidth: 0 }),
  rowTitle: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  rowDescription: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  rowDescriptionWrap: css({
    overflow: "visible",
    whiteSpace: "normal",
    textWrap: "pretty",
  }),
  mobileGroups: css({
    display: "grid",
    gap: space[6],
    paddingInline: space[4],
    paddingBlockEnd: space[8],
  }),
  mobileGroup: css({ display: "grid", gap: space[1] }),
}

function Row({ link }: { link: NavLinkItem }) {
  return (
    <NavigationMenuLink render={<DocsLink href={link.href} />} sx={styles.row}>
      <IconTile icon={link.icon} />
      <span sx={styles.rowText}>
        <span sx={styles.rowTitle}>{link.title}</span>
        <span sx={styles.rowDescription}>{link.description}</span>
      </span>
    </NavigationMenuLink>
  )
}

function FeaturedCard({ item }: { item: Featured }) {
  return (
    <NavigationMenuLink
      render={<DocsLink href={item.href} />}
      sx={styles.featured}
      data-featured=""
    >
      <span sx={styles.art} aria-hidden="true">
        <img
          src={sceneImage(item.scene)}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: SCENES[item.scene].position }}
          sx={styles.artPhoto}
        />
        <span sx={styles.artVeil} />
        <span sx={styles.artScene}>
          <MenuArt kind={item.art} />
        </span>
      </span>
      <span sx={styles.featuredCopy}>
        <span sx={styles.featuredTitle}>{item.title}</span>
        <span sx={styles.featuredText}>{item.description}</span>
      </span>
    </NavigationMenuLink>
  )
}

export default function Panel({ menu }: { menu: Menu }) {
  // The featured cards beside a column, or columns of links alone, narrower.
  return (
    <div sx={[styles.panel, menu.featured.length === 0 && styles.panelNarrow]}>
      {menu.featured.map((item) => (
        <FeaturedCard key={item.title} item={item} />
      ))}
      {menu.columns.map((column, index) => (
        <div key={column.title ?? index} sx={styles.column}>
          {column.title ? (
            <span sx={styles.columnTitle}>{column.title}</span>
          ) : null}
          {column.links.map((link) => (
            <Row key={link.href} link={link} />
          ))}
        </div>
      ))}
    </div>
  )
}

/** The phone sheet's groups: every menu's links, its featured destinations after them, and `extra`. */
export function MobileGroups({
  extra,
  onNavigate,
}: {
  extra?: readonly NavLinkItem[]
  onNavigate: () => void
}) {
  return (
    <nav sx={styles.mobileGroups} onClick={onNavigate}>
      <div sx={styles.mobileGroup}>
        {LINKS.map((link) => (
          <MobileRow key={link.href} link={link} />
        ))}
      </div>
      {MENUS.map((menu) => (
        <div key={menu.title} sx={styles.mobileGroup}>
          <span sx={styles.columnTitle}>{menu.title}</span>
          {[
            ...menu.featured,
            ...menu.columns.flatMap((column) => column.links),
          ].map((link) => (
            <MobileRow key={link.href} link={link} />
          ))}
        </div>
      ))}
      {extra?.length ? (
        <div sx={styles.mobileGroup}>
          {extra.map((link) => (
            <MobileRow key={link.href} link={link} />
          ))}
        </div>
      ) : null}
    </nav>
  )
}

function MobileRow({ link }: { link: NavLinkItem }) {
  return (
    <DocsLink href={link.href} sx={styles.row}>
      <IconTile icon={link.icon} />
      <span sx={styles.rowText}>
        <span sx={styles.rowTitle}>{link.title}</span>
        <span sx={[styles.rowDescription, styles.rowDescriptionWrap]}>
          {link.description}
        </span>
      </span>
    </DocsLink>
  )
}
