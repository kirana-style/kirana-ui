/**
 * `<!-- ::frameworks -->`, under the title of a page published once per variant (a component per
 * framework and base): the page's variants as tabs, each a link to its own URL, the page's own
 * chosen. The generator places it (`docs-core`'s `variants.ts`); the links are real anchors, so a
 * crawler and the prerender reach every variant, and choosing one is a navigation that also saves
 * the reader's choice for the rest of the site. At the row's end, the chosen base's logo, as
 * upstream's switcher shows it (its marks for Base UI and React Aria).
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
  const { Link } = useDocs()
  const variant = use(PageContext)?.variant
  if (!variant || variant.siblings.length < 2) return null
  const base = variant.id.split("/")[1] as Base | undefined
  return (
    <div sx={styles.row}>
      <Tabs value={variant.id} sx={styles.root} data-slot="frameworks">
        <TabsList variant="line" aria-label="Framework and base">
          {variant.siblings.map((sibling) => (
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
              {sibling.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {base ? (
        <span sx={styles.logo}>
          <BaseLogo base={base} />
        </span>
      ) : null}
    </div>
  )
}
