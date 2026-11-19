import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`

@Component({
  selector: "code-block-line-numbers",
  imports: [CodeBlock, CodeBlockContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent lineNumbers [code]="code"></pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockLineNumbers {
  protected readonly styles = styles
  protected readonly code = code
  protected readonly page = page
}
