<script lang="ts">
  /**
   * Upstream's `Markdown` (`@/components/markdown`), which its chat demos render a reply with:
   * Streamdown there, TanStack Markdown here, with its streaming profile, which drops a half-written
   * trailing block (an empty heading, a list item without text) until its text arrives. Fenced code
   * is a Code Block with line numbers, its copy button disabled while the fence is still open.
   */
  import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming"
  import { css, select } from "@kirana-style/core"
  import type { Component } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { fontSize, fontWeight, lineHeight, space } from "../../../../core/scales"
  import { theme } from "../../../../core/tokens"
  import MarkdownPrimitive from "../../../../lib/svelte/Markdown.svelte"
  import FenceOpen from "./FenceOpen.svelte"
  import MarkdownCode from "./MarkdownCode.svelte"
  import MarkdownPre from "./MarkdownPre.svelte"

  const styles = {
    root: css({
      width: "100%",
      minWidth: "0",
      overflow: "hidden",
      whiteSpace: "normal",
      [select.child(
        ":not(:last-child):not(h1, h2, h3, h4, h5, h6, blockquote, hr)"
      )]: {
        marginBottom: space[4],
      },
      // `list-inside list-disc` (`list-decimal`), and `[li_&]:pl-6` when nested.
      [select.descendant("ul")]: {
        listStylePosition: "inside",
        listStyleType: "disc",
      },
      [select.descendant("ol")]: {
        listStylePosition: "inside",
        listStyleType: "decimal",
      },
      [select.descendant(":is(ul, ol):is(li *)")]: { paddingLeft: space[6] },
      // `py-1 [&>p]:inline`.
      [select.descendant("li")]: { paddingBlock: space[1] },
      [select.descendant("p:is(li > *)")]: { display: "inline" },
      [select.descendant("strong")]: { fontWeight: fontWeight.semibold },
      // `wrap-anywhere font-medium text-primary underline`.
      [select.descendant("a")]: {
        overflowWrap: "anywhere",
        fontWeight: fontWeight.medium,
        color: theme.primary,
        textDecorationLine: "underline",
      },
      // `mt-6 mb-2 font-semibold`, and `text-3xl` … `text-sm` from h1 to h6.
      [select.child(":is(h1, h2, h3, h4, h5, h6)")]: {
        fontWeight: fontWeight.semibold,
      },
      [select.child(":is(h1, h2, h3, h4, h5, h6):not(:first-child)")]: {
        marginTop: space[6],
      },
      [select.child(":is(h1, h2, h3, h4, h5, h6):not(:last-child)")]: {
        marginBottom: space[2],
      },
      [select.child("h1")]: {
        fontSize: fontSize["3xl"],
        lineHeight: lineHeight["3xl"],
      },
      [select.child("h2")]: {
        fontSize: fontSize["2xl"],
        lineHeight: lineHeight["2xl"],
      },
      [select.child("h3")]: { fontSize: fontSize.xl, lineHeight: lineHeight.xl },
      [select.child("h4")]: { fontSize: fontSize.lg, lineHeight: lineHeight.lg },
      [select.child("h5")]: {
        fontSize: fontSize.base,
        lineHeight: lineHeight.base,
      },
      [select.child("h6")]: { fontSize: fontSize.sm, lineHeight: lineHeight.sm },
      // `my-4 border-muted-foreground/30 border-l-4 pl-4 text-muted-foreground italic`.
      [select.child("blockquote")]: {
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
        paddingLeft: space[4],
        color: theme.mutedForeground,
        fontStyle: "italic",
      },
      [select.child("blockquote:not(:first-child)")]: { marginTop: space[4] },
      [select.child("blockquote:not(:last-child)")]: { marginBottom: space[4] },
      // `my-6 border-border`.
      [select.child("hr")]: { borderTopWidth: "1px", borderColor: theme.border },
      [select.child("hr:not(:first-child)")]: { marginTop: space[6] },
      [select.child("hr:not(:last-child)")]: { marginBottom: space[6] },
    }),
  }


  const extensions = [streamingMarkdownExtension()]

  const fenceOpen = (text: string) =>
    (text.match(/^ {0,3}(?:`{3,}|~{3,})/gm)?.length ?? 0) % 2 === 1

  const DEFAULT_COMPONENTS = {
    code: MarkdownCode,
    pre: MarkdownPre,
  }

  let {
    source,
    components = DEFAULT_COMPONENTS,
    class: className,
    ...rest
  }: {
    source: string
    // `any`: each component takes its own element's attributes.
    // oxlint-disable-next-line no-explicit-any
    components?: Partial<Record<string, Component<any>>>
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="markdown" {...rest} class={className} sx={styles.root}>
  <FenceOpen value={fenceOpen(source)}>
    <MarkdownPrimitive {source} {components} {extensions} />
  </FenceOpen>
</div>
