import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { ansiText } from "../../../lib/highlight-tokens"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
  div: css({
    width: "100%",
    maxWidth: containerSize.md,
  }),
}

const output = `$ pnpm test
\x1b[32m✓\x1b[39m src/format.test.ts \x1b[2m(4 tests)\x1b[22m
\x1b[32m✓\x1b[39m src/parse.test.ts \x1b[2m(7 tests)\x1b[22m
\x1b[31m✗\x1b[39m src/stream.test.ts \x1b[2m(3 tests | 1 failed)\x1b[22m

\x1b[31mAssertionError: expected 'hello' to be 'hello world'\x1b[39m

Tests  \x1b[31m1 failed\x1b[39m | \x1b[32m13 passed\x1b[39m (14)`

const lines = useHighlightedCode(
  () => output,
  () => "ansi"
)

@Component({
  selector: "code-block-ansi",
  imports: [
    HighlightedLine,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>
              <svg
                iconPlaceholder
                lucide="CommandIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
              ></svg
              >Terminal
            </div>
            <div kuiCodeBlockActions>
              <button
                kuiCodeBlockCopyButton
                [value]="ansiText(output)"
              ></button>
            </div>
          </div>
          <pre
            kuiCodeBlockContent
            wrap
          >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockAnsi {
  protected readonly styles = styles
  protected readonly output = output
  protected readonly lines = lines
  protected readonly ansiText = ansiText
  protected readonly page = page
}
