import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
}

const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`

@Component({
  selector: "code-block-size",
  imports: [
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
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
              <button kuiCodeBlockCopyButton [value]="output"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent wrap>{{ output }}</pre>
        </div>
        <div kuiCodeBlock size="sm">
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
              <button kuiCodeBlockCopyButton [value]="output"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent wrap>{{ output }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockSize {
  protected readonly styles = styles
  protected readonly output = output
  protected readonly page = page
}
