/**
 * `<!-- ::frameworks -->`, under the title of a page published once per variant (a component per
 * framework and base): the page's variants as tabs, each a link to its own URL, the page's own
 * chosen. The generator places it (`docs-core`'s `variants.ts`); the links are real anchors, so a
 * crawler and the prerender reach every variant, and choosing one is a navigation that also saves
 * the reader's choice for the rest of the site.
 */
import { use } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import { chooseCombination } from "../combination.ts"
import { PageContext } from "../page-context.ts"
import { useDocs } from "../provider.tsx"
import { spacing } from "../tokens.ts"

const styles = {
  root: css({
    marginBlockEnd: spacing[6],
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
}

export function MarkdownFrameworks() {
  const { Link } = useDocs()
  const variant = use(PageContext)?.variant
  if (!variant || variant.siblings.length < 2) return null
  return (
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
  )
}
