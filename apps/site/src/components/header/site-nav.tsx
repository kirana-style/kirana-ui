/**
 * The header's links and menus, ported from the Kirana site's header (its own links before the
 * menus, as kirana/ui's components lead): `NavigationMenu` (Base UI), which
 * morphs its popup between panels and slides content in from the side the pointer came from, with
 * one pill over the triggers gliding to the one under the pointer, or the open one. Each panel is
 * a card in a frame of frosted glass: the featured destinations on their landscapes, then a column
 * of links with their glyphs. Below `lg` the same links are in a sheet.
 */
import {
  Suspense,
  lazy,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { css } from "@kirana-style/core"
import { Menu01Icon } from "@hugeicons/core-free-icons"

import { DocsLink } from "@/components/docs-link"

import {
  breakpoint,
  duration,
  easing,
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/registry/bases/react-base/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"
import { Icon } from "@workspace/ui/primitives/icon"

import { LINKS, MENUS } from "./nav"
import type { NavLinkItem } from "./nav"
import type { Sx } from "@workspace/registry/lib/sx"

const REDUCED = "@media (prefers-reduced-motion: reduce)"

const loadPanels = () => import("./menu-panels")
const Panel = lazy(loadPanels)
const MobileGroups = lazy(() =>
  loadPanels().then((module) => ({ default: module.MobileGroups }))
)

const styles = {
  nav: css({
    position: "relative",
    display: { base: "none", [breakpoint.lg]: "flex" },
  }),
  pill: css({
    position: "absolute",
    insetBlock: "4px",
    borderRadius: radius["4xl"],
    backgroundColor: alpha.muted50,
    pointerEvents: "none",
    transitionProperty: "left, width, opacity",
    transitionDuration: { base: duration[300], [REDUCED]: "0s" },
    transitionTimingFunction: easing.inOut,
  }),
  trigger: css({
    position: "relative",
    borderRadius: radius["4xl"],
    paddingInline: space["3.5"],
    backgroundColor: { "*": null, base: "transparent" },
    color: {
      base: theme.mutedForeground,
      ":hover": theme.foreground,
      "[data-popup-open]": theme.foreground,
    },
  }),
  // A link of its own, as tall as a trigger, the pill its hover too.
  link: css({
    display: "inline-flex",
    alignItems: "center",
    height: space[9],
    fontSize: "0.875rem",
    fontWeight: 500,
    textDecorationLine: "none",
  }),
  // The popup is the glass, the content's padding its width, and the panel the card inside it.
  glass: css({
    // The panel's corner and the glass around it, as the customizer's frame (`glass.ts`).
    borderRadius: `calc(${radius["2xl"]} + min(${radius["2xl"]}, ${space["1.5"]}))`,
    backgroundColor:
      "light-dark(rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.06))",
    backdropFilter: "blur(16px) saturate(1.4)",
    boxShadow:
      "0 0 0 1px light-dark(rgb(0 0 0 / 0.07), rgb(255 255 255 / 0.1)), inset 0 1px 0 light-dark(rgb(255 255 255 / 0.8), rgb(255 255 255 / 0.08)), 0 24px 60px -24px rgb(10 20 30 / 0.35)",
  }),
  frame: css({ padding: space["1.5"] }),
  mobileTrigger: css({
    display: { base: "inline-flex", [breakpoint.lg]: "none" },
  }),
  sheet: css({ overflowY: "auto" }),
}

type PillBox = { left: number; width: number } | null

/** The links and menus inline, from `lg` (`sx` moves that, as the docs bar does). */
export function DesktopNav({ sx }: { sx?: Sx }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const [box, setBox] = useState<PillBox>(null)
  const [shown, setShown] = useState(false)

  const measure = useCallback((key: string | null) => {
    const root = wrap.current
    const target = key
      ? root?.querySelector<HTMLElement>(`[data-pill="${key}"]`)
      : null
    if (!root || !target) return setShown(false)
    const outer = root.getBoundingClientRect()
    const inner = target.getBoundingClientRect()
    setBox({ left: inner.left - outer.left, width: inner.width })
    setShown(true)
  }, [])

  useLayoutEffect(() => measure(hover ?? open), [hover, open, measure])

  return (
    <div
      ref={wrap}
      sx={[styles.nav, sx]}
      onPointerOver={(event) => {
        const item = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-pill]"
        )
        if (item) setHover(item.dataset.pill ?? null)
      }}
      onPointerLeave={() => setHover(null)}
      onPointerEnter={loadPanels}
      onFocus={loadPanels}
    >
      <span
        aria-hidden="true"
        sx={styles.pill}
        style={{ left: box?.left, width: box?.width, opacity: shown ? 1 : 0 }}
      />
      <NavigationMenu
        popupSx={styles.glass}
        value={open}
        onValueChange={(value) => setOpen((value as string | null) ?? null)}
      >
        <NavigationMenuList>
          {LINKS.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                data-pill={link.title}
                render={<DocsLink href={link.href} />}
                sx={[styles.trigger, styles.link]}
              >
                {link.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          {MENUS.map((menu) => (
            <NavigationMenuItem key={menu.title} value={menu.title}>
              <NavigationMenuTrigger data-pill={menu.title} sx={styles.trigger}>
                {menu.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent sx={styles.frame}>
                <Suspense fallback={null}>
                  <Panel menu={menu} />
                </Suspense>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

/** The same links in a sheet, below `lg`; `extra` is the header's own (Create). */
export function MobileNav({
  extra,
  sx,
}: {
  extra?: readonly NavLinkItem[]
  /** Where the trigger shows, when not below `lg` (the docs bar's, between `lg` and `xl`). */
  sx?: Sx
}) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        onPointerEnter={loadPanels}
        onFocus={loadPanels}
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            sx={[styles.mobileTrigger, sx]}
          />
        }
      >
        <Icon icon={Menu01Icon} />
      </SheetTrigger>
      <SheetContent side="right" sx={styles.sheet}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Suspense fallback={null}>
          <MobileGroups extra={extra} onNavigate={() => setOpen(false)} />
        </Suspense>
      </SheetContent>
    </Sheet>
  )
}
