import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`

@Component({
  selector: "code-block-floating-actions",
  imports: [
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <div kuiCodeBlock>
          <div kuiCodeBlockActions>
            <button kuiCodeBlockCopyButton [value]="output"></button>
          </div>
          <pre kuiCodeBlockContent>{{ output }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockFloatingActions {
  protected readonly styles = styles
  protected readonly output = output
  protected readonly page = page
}
