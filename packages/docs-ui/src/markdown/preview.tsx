/**
 * `<!-- ::preview item="button-demo" height="360" combinations="react/base,react/aria" -->`: an
 * item's live preview, framed on the page as shadcn/ui's component preview is (a bordered box, the
 * item centred in it). The page that draws the item is the site's (`DocsConfig.previewSrc`), shown
 * in an iframe, so it renders in its own framework and design. With `combinations`, a picker above
 * it chooses the framework and base, the reader's choice for the whole site (`combination.ts`). The
 * frame names the page's colour mode (`?theme=`), so it follows the site's switch.
 */
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"
import { useTheme } from "@workspace/ui/theme/theme-provider"

import {
  chooseCombination,
  combinationList,
  useCombination,
} from "../combination.ts"
import type { DocsCombination } from "../provider.tsx"
import { useDocs } from "../provider.tsx"
import { radius, spacing, theme } from "../tokens.ts"

const styles = {
  root: css({ marginBlockEnd: spacing[5] }),
  frame: css({
    display: "block",
    width: "100%",
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  picker: css({
    marginBlockEnd: spacing[2],
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  missing: css({
    marginBlockEnd: spacing[5],
    color: theme.mutedForeground,
  }),
}

/** The framework-and-base picker, over every embed of a page that shows one. */
export function CombinationPicker({
  available,
  current,
}: {
  available: readonly DocsCombination[]
  current: DocsCombination | undefined
}) {
  if (available.length < 2 || !current) return null
  return (
    <Tabs
      value={current.id}
      onValueChange={(value) => chooseCombination(String(value))}
      sx={styles.picker}
      data-slot="combination-picker"
    >
      <TabsList variant="line">
        {available.map((combination) => (
          <TabsTrigger key={combination.id} value={combination.id}>
            {combination.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export function MarkdownPreview({
  item,
  height = "360",
  combinations,
}: {
  item?: string
  height?: string
  combinations?: string
}) {
  const { previewSrc } = useDocs()
  const { mode } = useTheme()
  const only = combinationList(combinations)
  const { available, current } = useCombination(only)
  if (!item || !previewSrc)
    return <p sx={styles.missing}>No preview for {item ?? "this item"}.</p>
  const src = previewSrc(item, only ? current?.id : undefined)
  return (
    <div sx={styles.root} data-slot="markdown-preview">
      {only ? (
        <CombinationPicker available={available} current={current} />
      ) : null}
      <iframe
        title={`${item} preview`}
        src={`${src}${src.includes("?") ? "&" : "?"}theme=${mode}`}
        loading="lazy"
        height={height}
        sx={styles.frame}
      />
    </div>
  )
}
