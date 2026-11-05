import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  CodeBlock,
  CodeBlockContent,
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

const code = `  if (!session) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return <ProjectList projects={projects} />
}`

const lines = useHighlightedCode(
  () => code,
  () => "tsx"
)

@Component({
  selector: "code-block-start-line",
  imports: [
    HighlightedLine,
    CodeBlock,
    CodeBlockContent,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>app/dashboard/page.tsx</div>
          </div>
          <pre
            kuiCodeBlockContent
            lineNumbers
            [startLine]="995"
          >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockStartLine {
  protected readonly styles = styles
  protected readonly lines = lines
  protected readonly page = page
}
