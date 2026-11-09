/**
 * Upstream's `Markdown` (`@/components/markdown`), which its chat demos render a reply with:
 * Streamdown there, TanStack Markdown here, with its streaming profile, which drops a half-written
 * trailing block (an empty heading, a list item without text) until its text arrives. Fenced code
 * is a Code Block with line numbers (`MarkdownPre`), its copy button disabled while the fence is
 * still open (`FenceOpen`). `<kui-markdown [source]="text" />` draws no box of its own.
 */
import {
  Component,
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
} from "@angular/core"
import type { Signal } from "@angular/core"
import { css, select } from "@kirana-style/core"
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming"
import { SxDirective, partSx } from "@kirana-style/angular"

import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { Markdown as MarkdownDirective } from "../../../lib/angular/markdown"
import type { MarkdownComponents } from "../../../lib/angular/markdown"
import { radius, theme } from "../../../core/tokens"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { textOf } from "../../../lib/markdown-tree"
import type { MarkdownElement } from "../../../lib/markdown-tree"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

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
  code: css({
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
    paddingInline: space[1],
    paddingBlock: space["0.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.9em",
  }),
}

/** True while the reply's last code fence has not closed yet (Streamdown's `useIsCodeFenceIncomplete`). */
const FENCE_OPEN = new InjectionToken<Signal<boolean>>("kui chat fence open", {
  factory: () => computed(() => false),
})

/** `<ng-container [kuiChatFenceOpen]="open">` around a reply's markdown. */
@Directive({
  selector: "[kuiChatFenceOpen]",
  providers: [
    { provide: FENCE_OPEN, useFactory: () => inject(FenceOpen).value },
  ],
})
export class FenceOpen {
  readonly value = input(false, { alias: "kuiChatFenceOpen" })
}

/** Inline code. Fenced code renders through `MarkdownPre`, which reads its element's text. */
@Component({
  selector: "code[kuiChatMarkdownCode]",
  host: { "[class]": "part" },
  template: `<ng-content />`,
})
export class MarkdownCode {
  readonly node = input<unknown>()
  protected readonly part = partSx(styles.code, undefined).class
}

/** A fenced block, as a Code Block: TanStack Markdown names its language in `data-lang`. */
@Component({
  selector: "div[kuiChatMarkdownPre]",
  imports: [
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    HighlightedLine,
  ],
  hostDirectives: [CodeBlock],
  template: `
    <div kuiCodeBlockHeader>
      <div kuiCodeBlockTitle>{{ language() || "text" }}</div>
      <div kuiCodeBlockActions>
        <button
          kuiCodeBlockCopyButton
          [value]="code()"
          [disabled]="incomplete()"
        ></button>
      </div>
    </div>
    <pre
      kuiCodeBlockContent
      lineNumbers
    >@for (line of lines(); track $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
  `,
})
export class MarkdownPre {
  readonly node = input.required<MarkdownElement>()
  // True while the closing fence has not arrived yet.
  protected readonly incomplete = inject(FENCE_OPEN)
  // The fence's text, its `code` element's, as React's reads `children.props.children`.
  protected readonly code = computed(() => textOf(this.node().children))
  protected readonly language = computed(() =>
    String(this.node().props["data-lang"] ?? "")
  )
  protected readonly lines = useHighlightedCode(this.code, this.language)
}

const extensions = [streamingMarkdownExtension()]

const fenceOpen = (text: string) =>
  (text.match(/^ {0,3}(?:`{3,}|~{3,})/gm)?.length ?? 0) % 2 === 1

const DEFAULT_COMPONENTS = {
  code: MarkdownCode,
  pre: MarkdownPre,
} satisfies MarkdownComponents

@Component({
  selector: "kui-markdown",
  imports: [FenceOpen, MarkdownDirective, SxDirective],
  host: { style: "display: contents" },
  template: `
    <ng-container [kuiChatFenceOpen]="fenceOpen(source())">
      <div
        data-slot="markdown"
        [sx]="styles.root"
        [kuiMarkdown]="source()"
        [components]="components() ?? defaultComponents"
        [extensions]="extensions"
      ></div>
    </ng-container>
  `,
})
export class Markdown {
  readonly source = input.required<string>()
  readonly components = input<MarkdownComponents>()
  protected readonly styles = styles
  protected readonly extensions = extensions
  protected readonly fenceOpen = fenceOpen
  protected readonly defaultComponents = DEFAULT_COMPONENTS
}
