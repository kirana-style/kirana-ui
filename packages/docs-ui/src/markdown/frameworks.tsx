/**
 * `<!-- ::frameworks -->`, under the title of a page published once per variant (a component per
 * framework and base): a switch of the page's framework's bases the page has (React: Base UI, React
 * Aria, ui-sdk), each a link to its own URL, the page's own chosen; none where the framework has
 * one. The framework itself is the sidebar's picker (U-025's navigation), so the row does not name
 * it again. The generator places it (`docs-core`'s `variants.ts`); the links are real anchors, so a
 * crawler and the prerender reach every variant, and choosing one is a navigation that also saves
 * the reader's choice for the rest of the site. At the row's end, the chosen base's logo where it
 * has an official one, as upstream's switcher shows it (its marks for Base UI and React Aria).
 */
import { use } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import type { Base } from "@workspace/registry/core/config"

import { BaseLogo, hasBaseLogo } from "../base-logos.tsx"
import { chooseCombination } from "../combination.ts"
import { PageContext } from "../page-context.ts"
import { useDocs } from "../provider.tsx"
import { RuntimePicker } from "./runtime.tsx"
import { spacing, theme } from "../tokens.ts"

const styles = {
  row: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing[4],
    rowGap: spacing[2],
    marginBlockEnd: spacing[6],
  }),
  root: css({
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  // `ml-auto size-4 shrink-0 text-muted-foreground opacity-80`.
  // The chat runtime's switch, at the row's end; the base's mark after it.
  runtime: css({ marginInlineStart: "auto" }),
  logo: css({
    display: "grid",
    marginInlineStart: "auto",
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    color: theme.mutedForeground,
    opacity: 0.8,
  }),
  logoAfter: css({ marginInlineStart: { "*": null, base: 0 } }),
}

export function MarkdownFrameworks({
  runtimes,
}: {
  /** `ai-sdk,tanstack-ai`: the page shows a chat demo, so the chat runtime's switch is here. */
  runtimes?: string
}) {
  const { Link, combinations = [] } = useDocs()
  const variant = use(PageContext)?.variant
  if (!variant) return null
  const [framework, base] = variant.id.split("/") as [string, Base?]
  const named = (id: string) => combinations.find((each) => each.id === id)
  const frameworkLabel = named(variant.id)?.framework?.label ?? framework
  // The page's own framework's bases only: another framework is the sidebar's picker.
  const bases = variant.siblings.filter((sibling) =>
    sibling.id.startsWith(`${framework}/`)
  )
  const mark = base && hasBaseLogo(base)
  if (bases.length < 2 && !mark && !runtimes) return null
  return (
    <div sx={styles.row} data-slot="frameworks">
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
      {runtimes ? <RuntimePicker sx={styles.runtime} /> : null}
      {mark && base ? (
        <span sx={[styles.logo, runtimes ? styles.logoAfter : null]}>
          <BaseLogo base={base} />
        </span>
      ) : null}
    </div>
  )
}
