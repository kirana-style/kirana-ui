<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
  } from "../ui/context-menu"
  import { page } from "../../../styles/page.styles"
  import { containerSize, fontSize, lineHeight } from "../../../core/scales"
  import { radius, theme } from "../../../core/tokens"

  const styles = {
    flexAspectVideoWFullMaxW: css({
      display: "flex",
      aspectRatio: "16 / 9",
      width: "100%",
      maxWidth: containerSize.xs,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.xl,
      borderWidth: "1px",
      borderColor: theme.border,
      borderStyle: "dashed",
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    hiddenPointerFineInlineB: css({
      display: {
        "*": null,
        base: "none",
        "@media (pointer: fine)": "inline-block",
      },
    }),
    hiddenPointerCoarseInlin: css({
      display: {
        "*": null,
        base: "none",
        "@media (pointer: coarse)": "inline-block",
      },
    }),
  }

  let user = $state("pedro")

  let colorTheme = $state("light")
</script>

<div sx={page.example}>
  <ContextMenu>
    <ContextMenuTrigger sx={styles.flexAspectVideoWFullMaxW}>
      <span sx={styles.hiddenPointerFineInlineB}>
        Right click here
      </span>
      <span sx={styles.hiddenPointerCoarseInlin}>
        Long press here
      </span>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuLabel>
          People
        </ContextMenuLabel>
        <ContextMenuRadioGroup value={user} onValueChange={(details: { value: typeof user }) => (user = details.value)}>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">
            Colm Tuite
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuLabel>
          Theme
        </ContextMenuLabel>
        <ContextMenuRadioGroup value={colorTheme} onValueChange={(details: { value: typeof colorTheme }) => (colorTheme = details.value)}>
          <ContextMenuRadioItem value="light">
            Light
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">
            Dark
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="system">
            System
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuGroup>
    </ContextMenuContent>
  </ContextMenu>
</div>
