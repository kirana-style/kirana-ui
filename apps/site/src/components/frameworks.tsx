/**
 * Choosing a framework (U-025's navigation): which one the reader is in, where choosing another
 * leads, and the docs bar's dropdown. The header's Frameworks menu (`header/menu-panels.tsx`) draws
 * the same rows from here, so the two never disagree. A choice is saved for the whole site
 * (`chooseCombination`), and every link to a component follows it.
 */
import { css } from "@kirana-style/core"
import { useRouterState } from "@tanstack/react-router"
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import {
  chooseCombination,
  useSavedCombination,
} from "@workspace/docs-ui/combination.ts"
import { FRAMEWORK_LOGOS } from "@workspace/docs-ui/framework-logos.ts"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/react-base/ui/dropdown-menu"
import { space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Icon } from "@workspace/shell/icon"

import { DocsLink, variantPage } from "@/components/docs-link"
import {
  FRAMEWORKS,
  frameworkOf,
  sharedPath,
  variantOfPath,
} from "@/lib/variants"

export type Framework = (typeof FRAMEWORKS)[number]

/**
 * Where choosing `framework` leads, and the variant it saves: on a component's page, that page in
 * the framework (the base the reader last chose in it, else its first the page has), or the
 * components' index where the page has none in it; elsewhere, the page itself.
 */
export function frameworkTarget(
  framework: Framework,
  path: string,
  saved: string | null
): { variant: string; href: string } {
  const ids = framework.variants.map((variant) => variant.id as string)
  const order = [
    ...(saved && frameworkOf(saved) === framework.id ? [saved] : []),
    ...ids,
  ]
  if (!variantOfPath(path)) return { variant: order[0]!, href: path }
  const shared = sharedPath(path)
  for (const variant of order) {
    const href = variantPage(shared, variant)
    if (href) return { variant, href }
  }
  return { variant: order[0]!, href: "/docs/components" }
}

/** The framework the reader is in: the page's, else the one they chose, else React. */
export function useFrameworks() {
  const path = useRouterState({ select: (state) => state.location.pathname })
  const saved = useSavedCombination()
  const current = frameworkOf(variantOfPath(path) ?? saved ?? "react/base")
  return { path, saved, current }
}

/** A framework's mark. */
export function FrameworkMark({
  framework,
  size = "1rem",
}: {
  framework: string
  size?: string
}) {
  const logo = FRAMEWORK_LOGOS[framework]
  return logo ? <BrandIcon icon={logo} size={size} /> : null
}

/** `React`, `Vue` … for an id. */
export const frameworkLabel = (id: string) =>
  FRAMEWORKS.find((framework) => framework.id === id)?.label ?? id

const styles = {
  trigger: css({ gap: space["1.5"] }),
  item: css({ gap: space[2] }),
  itemText: css({ display: "grid", flexGrow: 1 }),
  itemBases: css({
    fontSize: "0.75rem",
    whiteSpace: "nowrap",
    color: theme.mutedForeground,
  }),
  tick: css({ marginInlineStart: "auto" }),
}

/**
 * The docs bar's framework dropdown: the reader's framework by its mark and name, and the others to
 * choose, each with its bases; on a component's page, choosing one opens that page in it.
 */
export function FrameworkMenu() {
  const { path, saved, current } = useFrameworks()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Framework: ${frameworkLabel(current)}`}
            sx={styles.trigger}
          />
        }
      >
        <FrameworkMark framework={current} />
        {frameworkLabel(current)}
        <Icon icon={ArrowDown01Icon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Frameworks</DropdownMenuLabel>
          {FRAMEWORKS.map((framework) => {
            const target = frameworkTarget(framework, path, saved)
            return (
              <DropdownMenuItem
                key={framework.id}
                sx={styles.item}
                render={
                  <DocsLink
                    href={target.href}
                    onClick={() => chooseCombination(target.variant)}
                  />
                }
              >
                <FrameworkMark framework={framework.id} />
                <span sx={styles.itemText}>
                  {framework.label}
                  <span sx={styles.itemBases}>
                    {framework.variants
                      .map((variant) => variant.base)
                      .join(" · ")}
                  </span>
                </span>
                {current === framework.id ? (
                  <Icon icon={Tick02Icon} sx={styles.tick} />
                ) : null}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
