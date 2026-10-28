/**
 * The site's footer, as the Kirana site's: the mark and the wordmark, a line on what kirana/ui is,
 * the licence and the colour mode (`D` steps it), the link groups (`header/nav.ts`'s `FOOTER`), and
 * the page's scene in pixels dissolving up into them, all in the page's rail.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { Link } from "@tanstack/react-router"

import { DocsLink } from "@/components/docs-link"
import { KiranaMark, Wordmark } from "@/components/header/brand"
import { FOOTER } from "@/components/header/nav"
import { SERIF } from "@/components/kirana-type"
import { Rail } from "@/components/page/rail"
import { useScene } from "@/components/page/scene-context"
import { ScenePixels } from "@/components/scenery/scene-pixels"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { ThemeToggle } from "@workspace/docs-ui/theme-toggle.tsx"

const styles = {
  // Ruled across the page, as every section is: the grid's last line.
  footer: css({
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
  }),
  inner: css({
    display: "grid",
    gap: { base: space[12], [breakpoint.lg]: space[10] },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.lg]: "minmax(0, 1fr) minmax(0, 2fr)",
    },
    paddingInline: { base: space[5], [breakpoint.md]: space[10] },
    paddingBlock: { base: space[14], [breakpoint.md]: space[16] },
  }),
  identity: css({ display: "grid", gap: space[4], alignContent: "start" }),
  brand: css({
    display: "inline-flex",
    alignItems: "center",
    gap: space[2],
    justifySelf: "start",
    color: theme.foreground,
    textDecorationLine: "none",
  }),
  line: css({
    maxWidth: "24rem",
    // Kirana's display face, as its footer sets its line.
    fontFamily: SERIF,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight["2xl"],
    letterSpacing: letterSpacing.tight,
    color: theme.foreground,
    textWrap: "balance",
  }),
  note: css({
    maxWidth: "22rem",
    fontSize: fontSize.sm,
    lineHeight: "1.6",
    color: theme.mutedForeground,
  }),
  theme: css({ justifySelf: "start" }),
  groups: css({
    display: "grid",
    gap: space[8],
    gridTemplateColumns: {
      base: "repeat(2, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(3, minmax(0, 1fr))",
    },
  }),
  group: css({ display: "grid", gap: space["2.5"], alignContent: "start" }),
  groupTitle: css({
    marginBlockEnd: space[1],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  }),
  link: css({
    justifySelf: "start",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textDecorationLine: "none",
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
  }),
  // The scene: the rail's width, dissolving up into the links.
  scene: css({
    position: "relative",
    height: { base: "9rem", [breakpoint.md]: "13rem" },
  }),
}

export function SiteFooter() {
  const scene = useScene()
  return (
    <footer sx={styles.footer}>
      <Rail sx={styles.inner}>
        <div sx={styles.identity}>
          <Link
            to="/"
            aria-label="kirana ui, home"
            {...styleProps(styles.brand)}
          >
            <KiranaMark />
            <Wordmark />
          </Link>
          <p sx={styles.line}>
            shadcn/ui&apos;s components, compiled into one stylesheet.
          </p>
          <p sx={styles.note}>Built in the open, MIT licensed.</p>
          {/* The header listens for `D`; the chip only says so. */}
          <ThemeToggle hotkey={false} keycap sx={styles.theme} />
        </div>
        <nav sx={styles.groups} aria-label="Footer">
          {FOOTER.map((group) => (
            <div key={group.title} sx={styles.group}>
              <p sx={styles.groupTitle}>{group.title}</p>
              {group.links.map((link) => (
                <DocsLink key={link.href} href={link.href} sx={styles.link}>
                  {link.label}
                </DocsLink>
              ))}
            </div>
          ))}
        </nav>
      </Rail>
      <Rail sx={styles.scene}>
        <ScenePixels scene={scene} dissolve="up" fade={0.85} />
      </Rail>
    </footer>
  )
}
