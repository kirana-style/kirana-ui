import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const code = `export default {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
}`

const highlighted = [2, 3]

@Component({
  selector: "code-block-highlighted-lines",
  imports: [CodeBlock, CodeBlockContent, CodeBlockLine, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent lineNumbers>@for (line of code.split('
'); track index; let index = $index) {<span kuiCodeBlockLine [variant]="highlighted.includes(index) ? 'highlighted' : 'default'">{{ line }}</span>}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockHighlightedLines {
  protected readonly styles = styles
  protected readonly code = code
  protected readonly highlighted = highlighted
  protected readonly page = page
}
