/**
 * `<!-- ::frameworks -->`, under the title of a page published once per variant (a component per
 * framework and base): the page's variants as tabs, each a link to its own URL, the page's own
 * chosen. The generator places it (`docs-core`'s `variants.ts`); the links are real anchors, so a
 * crawler and the prerender reach every variant, and choosing one is a navigation that also saves
 * the reader's choice for the rest of the site. At the row's end, the chosen base's logo, as
 * upstream's switcher shows it (its marks for Base UI and React Aria).
 */
import { use } from "react"
import type { ReactNode } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

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

/** The bases' marks, upstream's (`registry/bases.ts`), drawn in the text's colour. */
const LOGOS: Record<string, ReactNode> = {
  base: (
    <svg viewBox="0 0 17 24" width="100%" height="100%" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z"
      />
      <path
        fill="currentColor"
        d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z"
      />
    </svg>
  ),
  aria: (
    <svg
      viewBox="200 206 800 790"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z"
      />
    </svg>
  ),
}

export function MarkdownFrameworks() {
  const { Link } = useDocs()
  const variant = use(PageContext)?.variant
  if (!variant || variant.siblings.length < 2) return null
  const logo = LOGOS[variant.id.split("/")[1] ?? ""]
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
      {logo ? <span sx={styles.logo}>{logo}</span> : null}
    </div>
  )
}
