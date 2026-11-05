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
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)`

@Component({
  selector: "code-block-destructive",
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
        <div kuiCodeBlock variant="destructive">
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>Error</div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="error"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent wrap>{{ error }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockDestructive {
  protected readonly styles = styles
  protected readonly error = error
  protected readonly page = page
}
