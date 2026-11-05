/**
 * What Code Block's markdown demo draws a reply's code with, as React's `Streamdown` components:
 * inline code (`MarkdownCode`), a fenced block as a Code Block (`MarkdownPre`), and whether the
 * reply's last fence is still open while it streams (`FenceOpen`), which keeps its copy button off.
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
import { css } from "@kirana-style/core"
import { partSx } from "@kirana-style/angular"

import { fontFamily, space } from "../../../core/scales"
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
const FENCE_OPEN = new InjectionToken<Signal<boolean>>("kui fence open", {
  factory: () => computed(() => false),
})

/** `<ng-container [kuiFenceOpen]="open">` around a reply's markdown. */
@Directive({
  selector: "[kuiFenceOpen]",
  providers: [
    { provide: FENCE_OPEN, useFactory: () => inject(FenceOpen).value },
  ],
})
export class FenceOpen {
  readonly value = input(false, { alias: "kuiFenceOpen" })
}

/** Inline code. Fenced code renders through `MarkdownPre`, which reads its element's text. */
@Component({
  selector: "code[kuiMarkdownCode]",
  host: { "[class]": "part" },
  template: `<ng-content />`,
})
export class MarkdownCode {
  readonly node = input<unknown>()
  protected readonly part = partSx(styles.code, undefined).class
}

/** A fenced block, as a Code Block: TanStack Markdown names its language in `data-lang`. */
@Component({
  selector: "div[kuiMarkdownPre]",
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
