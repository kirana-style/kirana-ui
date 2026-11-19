import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[4],
  }),
}

const samples = [
  {
    language: "css",
    title: "app/globals.css",
    code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
  },
  {
    language: "python",
    title: "main.py",
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
  },
  {
    language: "text",
    title: "notes.txt",
    code: "A language that is not in the list renders as plain text.",
  },
]

// Each sample's lines, as React's `Sample` highlights them.
const sampleLines = samples.map((sample) =>
  useHighlightedCode(
    () => sample.code,
    () => sample.language
  )
)

@Component({
  selector: "code-block-languages",
  imports: [
    HighlightedLine,
    CodeBlock,
    CodeBlockContent,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (sample of samples; track sample.language; let i = $index) {
          <div kuiCodeBlock>
            <div kuiCodeBlockHeader>
              <div kuiCodeBlockTitle>{{ sample.title }}</div>
            </div>
            <pre
              kuiCodeBlockContent
            >@for (line of sampleLines[i]!(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
          </div>
        }
      </div>
    </div>
  `,
})
export default class CodeBlockLanguages {
  protected readonly styles = styles
  protected readonly samples = samples
  protected readonly sampleLines = sampleLines
  protected readonly page = page
}
