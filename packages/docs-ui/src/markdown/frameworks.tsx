/**
 * `<!-- ::frameworks -->`, under the title of a page published once per variant (a component per
 * framework and base): the page's framework, by its mark and name, then a switch of that
 * framework's bases the page has (React: Base UI, React Aria), each a link to its own URL, the
 * page's own chosen; none where the framework has one. Another framework is the site header's
 * Frameworks menu (U-025's navigation). The generator places it (`docs-core`'s `variants.ts`); the
 * links are real anchors, so a crawler and the prerender reach every variant, and choosing one is a
 * navigation that also saves the reader's choice for the rest of the site. At the row's end, the
 * chosen base's logo, as upstream's switcher shows it (its marks for Base UI and React Aria).
 */
import { use } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import type { Base } from "@workspace/registry/core/config"

import { BaseLogo } from "../base-logos.tsx"
import { BrandIcon } from "../brand-icon.tsx"
import { FRAMEWORK_LOGOS } from "../framework-logos.ts"
import { chooseCombination } from "../combination.ts"
import { PageContext } from "../page-context.ts"
import { useDocs } from "../provider.tsx"
import { spacing, theme } from "../tokens.ts"

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing[4],
    marginBlockEnd: spacing[6],
  }),
  root: css({
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  framework: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[2],
    flexShrink: 0,
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.foreground,
  }),
  // `ml-auto size-4 shrink-0 text-muted-foreground opacity-80`.
  logo: css({
    display: "grid",
    marginInlineStart: "auto",
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    color: theme.mutedForeground,
    opacity: 0.8,
  }),
}

export function MarkdownFrameworks() {
  const { Link, combinations = [] } = useDocs()
  const variant = use(PageContext)?.variant
  if (!variant) return null
  const [framework, base] = variant.id.split("/") as [string, Base?]
  const named = (id: string) => combinations.find((each) => each.id === id)
  const frameworkLabel = named(variant.id)?.framework?.label ?? framework
  // The page's own framework's bases only: another framework is the header's menu.
  const bases = variant.siblings.filter((sibling) =>
    sibling.id.startsWith(`${framework}/`)
  )
  const logo = FRAMEWORK_LOGOS[framework]
  return (
    <div sx={styles.row} data-slot="frameworks">
      <span sx={styles.framework}>
        {logo ? <BrandIcon icon={logo} /> : null}
        {frameworkLabel}
      </span>
      {bases.length > 1 ? (
        <Tabs value={variant.id} sx={styles.root}>
          <TabsList aria-label={`${frameworkLabel} base`}>
            {bases.map((sibling) => (
              <TabsTrigger
                key={sibling.id}
                value={sibling.id}
                nativeButton={false}
                render={
                  <Link
                    href={sibling.href}
                    onClick={() => chooseCombination(sibling.id)}
                  />
                }
              >
                {named(sibling.id)?.base ?? sibling.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}
      {base ? (
        <span sx={styles.logo}>
          <BaseLogo base={base} />
        </span>
      ) : null}
    </div>
  )
}
