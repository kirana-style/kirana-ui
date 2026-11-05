/**
 * `code-block-streaming`'s block, a component of its own as React's file declares it beside the
 * example: a code that grows, highlighted again as it does. `<div kuiStreamingBlock [block]
 * [code]>`, the Code Block itself.
 */
import { Component, computed, input } from "@angular/core"

import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

export type StreamingBlockData = {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}

@Component({
  selector: "div[kuiStreamingBlock]",
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
    @if (block().title) {
      <div kuiCodeBlockHeader>
        <div kuiCodeBlockTitle>{{ block().title }}</div>
        <div kuiCodeBlockActions>
          <button
            kuiCodeBlockCopyButton
            [value]="source()"
            [disabled]="code().length < block().code.length"
          ></button>
        </div>
      </div>
    }
    <pre
      kuiCodeBlockContent
      [lineNumbers]="!!block().lineNumbers"
    >@for (line of lines(); track $index) {<span kuiCodeBlockLine [variant]="variant($index)"><kui-highlighted-line [tokens]="line" /></span>}</pre>
  `,
})
export class StreamingBlock {
  readonly block = input.required<StreamingBlockData>()
  readonly code = input.required<string>()
  protected readonly rows = computed(() => this.code().split("\n"))
  // A diff row starts with +, - or a space. The marker is not part of the code.
  protected readonly source = computed(() =>
    this.block().diff
      ? this.rows()
          .map((row) => row.slice(1))
          .join("\n")
      : this.code()
  )
  protected readonly lines = useHighlightedCode(
    this.source,
    () => this.block().language
  )

  protected variant(index: number) {
    if (this.block().diff) {
      const row = this.rows()[index]
      return row?.startsWith("+")
        ? "added"
        : row?.startsWith("-")
          ? "removed"
          : "default"
    }
    return this.block().highlight?.includes(index) ? "highlighted" : "default"
  }
}
