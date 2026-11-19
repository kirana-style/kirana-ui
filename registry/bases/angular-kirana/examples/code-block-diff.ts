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
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const patch = ` export default function Greeting({ name }: { name: string }) {
-  return <p>Hello, {name}</p>
+  return <p className="text-sm text-muted-foreground">
+    Hello, {name}!
+  </p>
 }`

function getVariant(line: string) {
  if (line.startsWith("+")) {
    return "added"
  }

  if (line.startsWith("-")) {
    return "removed"
  }

  return "default"
}

@Component({
  selector: "code-block-diff",
  imports: [
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>components/greeting.tsx</div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="patch"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent>@for (line of patch.split('
'); track index; let index = $index) {<span kuiCodeBlockLine [variant]="getVariant(line)">{{ line.slice(1) }}</span>}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockDiff {
  protected readonly styles = styles
  protected readonly patch = patch
  protected readonly getVariant = getVariant
  protected readonly page = page
}
