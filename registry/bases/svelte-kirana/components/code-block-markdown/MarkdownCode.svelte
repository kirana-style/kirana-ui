<script lang="ts">
  /** Inline code. Fenced code renders through `MarkdownPre`, which reads its element's text. */
  import { css } from "@kirana-style/core"
  import type { Snippet } from "svelte"

  import { fontFamily, space } from "../../../../core/scales"
  import { radius, theme } from "../../../../core/tokens"

  let { children }: { children?: Snippet; [attribute: string]: unknown } = $props()

  const styles = {
    code: css({
      borderRadius: radius.sm,
      backgroundColor: theme.muted,
      paddingInline: space[1],
      paddingBlock: space["0.5"],
      fontFamily: fontFamily.mono,
      fontSize: "0.9em",
    }),
  }
</script>

<code sx={styles.code}>{@render children?.()}</code>
