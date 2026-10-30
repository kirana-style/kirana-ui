/**
 * The site's header, as the Kirana site's: the petal K and the wordmark ("kirana ui", where Kirana
 * writes "kirana style"), the links and menus (`header/`: Components, Blocks, Charts and Typeset of their
 * own, Docs (the colours with it) and Community as mega menus), then the docs' search, the GitHub mark, the sponsor
 * heart and Create, the pill in the place of Kirana's Quick start. Frosted, so the page shows
 * through. The colour mode is in the footer, as on the Kirana site, and `D` steps it on every page.
 * The bar stands in the page's rail (`page/rail.tsx`), its rules running on down the page; on
 * `/create` and `/typeset` (`designer`) it spans the page, as the editors do, and on `/create`
 * Create is left out, since that is where it leads. Below `lg` the links and menus are a sheet.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { Link } from "@tanstack/react-router"
import { FavouriteIcon, PlusSignIcon } from "@hugeicons/core-free-icons"

import { CreateCta } from "@/components/cta"
import { DocsLink } from "@/components/docs-link"
import { SiteDocsProvider } from "@/components/docs-config"
import { KiranaMark, Wordmark } from "@/components/header/brand"
import { Rail } from "@/components/page/rail"
import { REPOSITORY, SPONSOR } from "@/components/header/nav"
import { DesktopNav, MobileNav } from "@/components/header/site-nav"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import githubDark from "@workspace/docs-ui/brands/github_dark.svg?url"
import githubLight from "@workspace/docs-ui/brands/github_light.svg?url"
import { DocsSearch } from "@workspace/docs-ui/search.tsx"
import { useThemeHotkey } from "@workspace/docs-ui/theme-toggle.tsx"
import { Icon } from "@workspace/shell/icon"

export { REPOSITORY }

/** The heart's rose, as the Kirana site's: deep on paper, light on the night. */
const HEART = "light-dark(oklch(0.58 0.16 8), oklch(0.8 0.11 8))"

const GITHUB = {
  title: "GitHub",
  url: REPOSITORY,
  route: { light: githubLight, dark: githubDark },
}

/** Create in the phone's sheet, beside the links and menus. */
export const CREATE = {
  title: "Create",
  description: "Start a project in your design",
  href: "/create",
  icon: PlusSignIcon,
  scene: "heritage-street" as const,
}

const styles = {
  // Frosted: the page shows through, blurred. The blur is on a `::before` layer, not the header:
  // `backdrop-filter` on the header would make it the containing block of the menus inside it.
  header: css({
    position: "sticky",
    top: 0,
    zIndex: 40,
    isolation: "isolate",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
    "::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      zIndex: -1,
      backgroundColor: `color-mix(in oklab, ${theme.background} 72%, transparent)`,
      backdropFilter: "blur(14px) saturate(1.5)",
    },
  }),
  bar: css({
    display: "flex",
    alignItems: "center",
    gap: space[6],
    height: space[16],
    paddingInline: { base: space[4], [breakpoint.md]: space[6] },
  }),
  brand: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    textDecorationLine: "none",
    color: theme.foreground,
  }),
  actions: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
    marginInlineStart: "auto",
  }),
  github: css({ display: { base: "none", [breakpoint.sm]: "inline-flex" } }),
  // The heart drawn in a soft rose, on no ground of its own, deepening on hover.
  sponsor: css({
    display: { base: "none", [breakpoint.lg]: "inline-flex" },
    backgroundColor: { "*": null, base: "transparent" },
    color: {
      "*": null,
      base: `color-mix(in oklab, ${HEART} 85%, transparent)`,
      ":hover": HEART,
    },
    transitionProperty: "color",
    transitionDuration: "200ms",
  }),
  create: css({ marginInlineStart: space[1] }),
}

/** The mark and the wordmark, linking home. */
export function Brand() {
  return (
    <Link to="/" aria-label="kirana ui, home" {...styleProps(styles.brand)}>
      <KiranaMark />
      <Wordmark />
    </Link>
  )
}

/** The bar's end, here and in the docs: GitHub, the heart, and Create unless on `/create`. */
export function HeaderActions({ create = true }: { create?: boolean }) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        nativeButton={false}
        aria-label="kirana/ui on GitHub"
        title="kirana/ui on GitHub"
        sx={styles.github}
        render={<a href={REPOSITORY} target="_blank" rel="noreferrer" />}
      >
        <BrandIcon icon={GITHUB} size="1rem" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        nativeButton={false}
        aria-label="Sponsor Kirana and kirana/ui"
        title="Sponsor"
        sx={styles.sponsor}
        render={<DocsLink href={SPONSOR.href} />}
      >
        <Icon icon={FavouriteIcon} />
      </Button>
      {create ? <CreateCta size="sm" hideOnPhone sx={styles.create} /> : null}
    </>
  )
}

export function SiteHeader({
  designer = false,
  create = !designer,
}: {
  designer?: boolean
  /** Create at the bar's end: left out on `/create`, kept on the typeset builder. */
  create?: boolean
}) {
  useThemeHotkey()
  const bar = (
    <>
      <Brand />
      <DesktopNav />
      <div sx={styles.actions}>
        <DocsSearch variant="icon" />
        <HeaderActions create={create} />
        <MobileNav extra={create ? [CREATE] : []} />
      </div>
    </>
  )
  return (
    <SiteDocsProvider>
      <header sx={styles.header}>
        {designer ? (
          <div sx={styles.bar}>{bar}</div>
        ) : (
          <Rail sx={styles.bar}>{bar}</Rail>
        )}
      </header>
    </SiteDocsProvider>
  )
}
