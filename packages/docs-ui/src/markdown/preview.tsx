/**
 * `<!-- ::preview item="button-demo" height="360" -->`: an item's live preview, framed on the page
 * as shadcn/ui's component preview is (a bordered box, the item centred in it). The page that draws
 * the item is the site's (`DocsConfig.previewSrc`), shown in an iframe, so it renders in its own
 * framework and design. The frame names the page's colour mode (`?theme=`), so it follows the
 * site's switch.
 */
import { css } from "@kirana-style/core"

import { useTheme } from "@workspace/ui/theme/theme-provider"

import { radius, spacing, theme } from "../tokens.ts"
import { useDocs } from "../provider.tsx"

const styles = {
  frame: css({
    display: "block",
    width: "100%",
    marginBlockEnd: spacing[5],
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  missing: css({
    marginBlockEnd: spacing[5],
    color: theme.mutedForeground,
  }),
}

export function MarkdownPreview({
  item,
  height = "360",
}: {
  item?: string
  height?: string
}) {
  const { previewSrc } = useDocs()
  const { mode } = useTheme()
  if (!item || !previewSrc)
    return <p sx={styles.missing}>No preview for {item ?? "this item"}.</p>
  const src = previewSrc(item)
  return (
    <iframe
      title={`${item} preview`}
      src={`${src}${src.includes("?") ? "&" : "?"}theme=${mode}`}
      loading="lazy"
      height={height}
      sx={styles.frame}
    />
  )
}
