import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
}

const output = `Error: The model "anthropic/claude-sonnet-4.5" returned an error: Request too large. The prompt is 212,431 tokens and the context window is 200,000 tokens. Remove some messages or summarize the conversation and try again.`

@Component({
  selector: "code-block-wrap",
  imports: [CodeBlock, CodeBlockContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent>{{ output }}</pre>
        </div>
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent wrap>{{ output }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockWrap {
  protected readonly styles = styles
  protected readonly output = output
  protected readonly page = page
}
