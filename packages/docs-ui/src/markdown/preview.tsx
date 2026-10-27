/**
 * `<!-- ::preview item="button-demo" height="360" combinations="react/base,react/aria" -->`: an
 * item's live preview, framed on the page as shadcn/ui's component preview is (a bordered box, the
 * item centred in it). The page that draws the item is the site's (`DocsConfig.previewSrc`), shown
 * in an iframe, so it renders in its own framework and design. With `combinations`, a picker above
 * it chooses the framework and base, the reader's choice for the whole site (`combination.ts`).
 *
 * The frame is created once the page has hydrated, so its first address is the final one: the
 * prerendered page knows neither the reader's combination nor anything saved, and a frame created
 * before would load twice. The colour mode is not in the address: the framed page reads the site's
 * mode as it loads and follows a change through the theme provider's channel.
 */
import { useSyncExternalStore } from "react"
import type { Sx } from "@workspace/registry/lib/sx"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

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
  sx,
}: {
  available: readonly DocsCombination[]
  current: DocsCombination | undefined
  /** Where a page sets the picker in a row of its own (the charts' types). */
  sx?: Sx
}) {
  if (available.length < 2 || !current) return null
  return (
    <Tabs
      value={current.id}
      onValueChange={(value) => chooseCombination(String(value))}
      sx={[styles.picker, sx]}
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

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

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
  const hydrated = useSyncExternalStore(subscribeNever, isClient, isServer)
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
      {hydrated ? (
        <iframe
          title={`${item} preview`}
          src={src}
          loading="lazy"
          height={height}
          sx={styles.frame}
        />
      ) : (
        <div style={{ height: `${height}px` }} sx={styles.frame} />
      )}
    </div>
  )
}
