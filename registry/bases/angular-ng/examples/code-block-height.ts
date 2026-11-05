import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { page } from "../../../styles/page.styles"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  maxH48ScrollFadeY: css(scrollFade, { maxHeight: space[48] }),
}

const logs = Array.from(
  { length: 40 },
  (_, index) =>
    `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
).join("\n")

@Component({
  selector: "code-block-height",
  imports: [
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>Logs</div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="logs"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent [sx]="styles.maxH48ScrollFadeY">{{
            logs
          }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockHeight {
  protected readonly styles = styles
  protected readonly logs = logs
  protected readonly page = page
}
