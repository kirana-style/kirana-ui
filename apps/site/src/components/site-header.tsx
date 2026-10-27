/**
 * The site's header, built from the registry's own components (Base UI's), so it takes the design
 * the reader chose, like every page of the site. Kirana's brand stays fixed: the name and the link
 * to GitHub. Its sections are the docs' tabs (`TABS`), in their order and with their icons, so the
 * header reads the same on every page, docs or not; Blocks and New (`SITE_LINKS`) are sections after the
 * last one, as they are in the docs. On `/create` (`designer`) the bar spans the page, as the editor does, and New
 * is left out, since that is where it leads. Below `md` the sections are in a menu, and the GitHub
 * link shows from `sm`, so the bar fits a phone. The docs' search is in it on every page (⌘K), so a
 * reader finds a page from the home page or `/create` as from the docs.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { Link } from "@tanstack/react-router"
import {
  ComputerIcon,
  Menu01Icon,
  PlusSignIcon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons"

import { SITE_LINKS, SiteDocsProvider, TABS } from "@/components/docs-config"
import {
  breakpoint,
  fontSize,
  fontWeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/react-base/ui/dropdown-menu"
import { DocsSearch } from "@workspace/docs-ui/search.tsx"
import { useThemeHotkey } from "@workspace/shell/theme-toggle"
import { Icon } from "@workspace/ui/primitives/icon"
import type { IconProps } from "@workspace/ui/primitives/icon"
import { schemeMarker } from "@workspace/ui/theme/scheme-marker"
import { useTheme } from "@workspace/ui/theme/theme-provider"

export const REPOSITORY = "https://github.com/kirana-style/kirana-ui"

/** The site's links after the tabs; on `/create`, New is where the reader is. */
const links = (designer: boolean) =>
  SITE_LINKS.filter((link) => !designer || link.href !== "/create")

/** A docs tab's link, as the router names it. */
const tabLink = (href: string) =>
  href === "/docs"
    ? ({ to: "/docs" } as const)
    : ({
        to: "/docs/$",
        params: { _splat: href.replace(/^\/docs\//, "") },
      } as const)

const styles = {
  header: css({
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: theme.background,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  }),
  bar: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    height: space[14],
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: { base: space[4], [breakpoint.md]: space[6] },
  }),
  // `/create`'s bar spans the page, its edges on the editor's.
  full: css({ maxWidth: "none" }),
  brand: css({
    marginInlineEnd: space[4],
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    textDecorationLine: "none",
  }),
  nav: css({
    display: { base: "none", [breakpoint.md]: "flex" },
    alignItems: "center",
    gap: space[1],
  }),
  menu: css({ display: { base: "inline-flex", [breakpoint.md]: "none" } }),
  github: css({ display: { base: "none", [breakpoint.sm]: "inline-flex" } }),
  // The docs' search, as upstream's header has its command menu: a field from md, an icon below.
  // Wrappers take the display, which on the controls would replace their own.
  searchField: css({
    display: { base: "none", [breakpoint.md]: "block" },
    width: "15rem",
  }),
  searchIcon: css({ display: { base: "block", [breakpoint.md]: "none" } }),
  end: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
    marginInlineStart: "auto",
  }),
  // One icon per mode; the one `<html data-mode>` names shows, as the shell's controls do.
  mode: css({ display: "none" }),
  light: css({
    display: { [schemeMarker.within('[data-mode="light"]')]: "inline-flex" },
  }),
  dark: css({
    display: { [schemeMarker.within('[data-mode="dark"]')]: "inline-flex" },
  }),
  system: css({
    display: { [schemeMarker.within('[data-mode="system"]')]: "inline-flex" },
  }),
}

const MODES = [
  { icon: ComputerIcon, sx: styles.system },
  { icon: Sun03Icon, sx: styles.light },
  { icon: Moon02Icon, sx: styles.dark },
]

/** Steps through System, Light and Dark, as `D` does. */
function ModeButton() {
  const { cycleMode } = useTheme()
  useThemeHotkey()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleMode}
      aria-label="Theme: change between system, light and dark"
      title="Change the theme (D)"
    >
      {MODES.map((mode, index) => (
        <span key={index} sx={[styles.mode, mode.sx]}>
          <Icon icon={mode.icon} />
        </span>
      ))}
    </Button>
  )
}

/** shadcn/ui's "New" in the header: the editor, where a project starts. */
export function NewButton() {
  return (
    <Button size="sm" render={<Link to="/create" />} nativeButton={false}>
      <Icon icon={PlusSignIcon} />
      New
    </Button>
  )
}

export function SiteHeader({ designer = false }: { designer?: boolean }) {
  return (
    <SiteDocsProvider>
      <Header designer={designer} />
    </SiteDocsProvider>
  )
}

function Header({ designer }: { designer: boolean }) {
  return (
    <header sx={styles.header}>
      <div sx={[styles.bar, designer && styles.full]}>
        <Link to="/" {...styleProps(styles.brand)}>
          kirana/ui
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" sx={styles.menu} />}
            aria-label="Sections"
          >
            <Icon icon={Menu01Icon} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              {TABS.map((tab) => (
                <DropdownMenuItem
                  key={tab.id}
                  render={<Link {...tabLink(tab.href)} />}
                >
                  {tab.icon ? (
                    <Icon icon={tab.icon as IconProps["icon"]} />
                  ) : null}
                  {tab.label}
                </DropdownMenuItem>
              ))}
              {links(designer).map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  render={<Link to={link.href} />}
                >
                  <Icon icon={link.icon} />
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem render={<a href={REPOSITORY} />}>
                GitHub
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav sx={styles.nav} aria-label="Sections">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              render={<Link {...tabLink(tab.href)} />}
              nativeButton={false}
            >
              {tab.icon ? <Icon icon={tab.icon as IconProps["icon"]} /> : null}
              {tab.label}
            </Button>
          ))}
          {links(designer).map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              render={<Link to={link.href} />}
              nativeButton={false}
            >
              <Icon icon={link.icon} />
              {link.label}
            </Button>
          ))}
        </nav>
        <div sx={styles.end}>
          <div sx={styles.searchField}>
            <DocsSearch />
          </div>
          <div sx={styles.searchIcon}>
            <DocsSearch variant="icon" hotkey={false} />
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={<a href={REPOSITORY} />}
            nativeButton={false}
            sx={styles.github}
          >
            GitHub
          </Button>
          <ModeButton />
        </div>
      </div>
    </header>
  )
}
