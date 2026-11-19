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

const output = `$ pnpm build
> next build

 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)

Route (app)                Size  First Load JS
┌ ○ /                    1.9 kB         112 kB
├ ○ /_not-found           993 B         103 kB
└ ƒ /api/chat             141 B         102 kB`

@Component({
  selector: "code-block-basic",
  imports: [CodeBlock, CodeBlockContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent>{{ output }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockBasic {
  protected readonly styles = styles
  protected readonly output = output
  protected readonly page = page
}
