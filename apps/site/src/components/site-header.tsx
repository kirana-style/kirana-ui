/**
 * The site's header, built from the registry's own components (Base UI's), so it takes the design
 * the reader chose, like every page of the site. Kirana's brand stays fixed: the name and the link
 * to GitHub. Each section joins the navigation with its first page. Below `md` the sections are in
 * a menu, and the GitHub link shows from `sm`, so the bar fits a phone.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { Link } from "@tanstack/react-router"
import {
  ComputerIcon,
  Menu01Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons"

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
import { Customizer } from "@/components/customizer"
import { useThemeHotkey } from "@workspace/shell/theme-toggle"
import { Icon } from "@workspace/ui/primitives/icon"
import { schemeMarker } from "@workspace/ui/theme/scheme-marker"
import { useTheme } from "@workspace/ui/theme/theme-provider"

export const REPOSITORY = "https://github.com/kirana-style/kirana-ui"

/** The sections, in shadcn/ui's order, as their pages land. */
const SECTIONS = [
  { label: "Docs", link: { to: "/docs" } },
  {
    label: "Components",
    link: { to: "/docs/$", params: { _splat: "components" } },
  },
  { label: "Create", link: { to: "/create" } },
  { label: "Demo", link: { to: "/demo" } },
] as const

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

export function SiteHeader() {
  return (
    <header sx={styles.header}>
      <div sx={styles.bar}>
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
              {SECTIONS.map((section) => (
                <DropdownMenuItem
                  key={section.label}
                  render={<Link {...section.link} />}
                >
                  {section.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem render={<a href={REPOSITORY} />}>
                GitHub
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav sx={styles.nav} aria-label="Sections">
          {SECTIONS.map((section) => (
            <Button
              key={section.label}
              variant="ghost"
              size="sm"
              render={<Link {...section.link} />}
              nativeButton={false}
            >
              {section.label}
            </Button>
          ))}
        </nav>
        <div sx={styles.end}>
          <Customizer />
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
