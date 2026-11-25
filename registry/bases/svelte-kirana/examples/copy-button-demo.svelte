<script lang="ts">
  import { css } from "@kirana-style/core"

  import { CopyButton } from "../ui/copy-button"
  import { fontFamily, fontSize, lineHeight, space } from "../../../core/scales"
  import { radius, theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    row: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
      width: "100%",
      maxWidth: "24rem",
      paddingBlock: space[1],
      paddingInlineStart: space[3],
      paddingInlineEnd: space[1],
      borderWidth: "1px",
      borderColor: theme.border,
      borderRadius: radius.lg,
      backgroundColor: theme.muted,
    }),
    command: css({
      flex: "1",
      minWidth: "0",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontFamily: fontFamily.mono,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
  }

  const COMMAND = "npx kirana-style ui add copy-button"
</script>

<div sx={page.example}>
  <div sx={styles.row}>
    <code sx={styles.command}>{COMMAND}</code>
    <CopyButton value={COMMAND} copyLabel="Copy command" />
  </div>
</div>
