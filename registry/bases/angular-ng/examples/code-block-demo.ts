import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
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
  div: css({
    width: "100%",
    maxWidth: containerSize.lg,
  }),
  button: css({
    color: { '[aria-pressed="true"]': theme.foreground },
  }),
}

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const lines = useHighlightedCode(
  () => code,
  () => "ts"
)

@Component({
  selector: "code-block-demo",
  imports: [
    HighlightedLine,
    Button,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>
              <svg
                iconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              ></svg
              >app/api/chat/route.ts
            </div>
            <div kuiCodeBlockActions>
              <button
                kuiButton
                variant="ghost"
                size="icon-xs"
                aria-label="Wrap lines"
                [attr.aria-pressed]="wrap()"
                [sx]="styles.button"
                (click)="wrap.set(!wrap())"
              >
                <svg
                  iconPlaceholder
                  lucide="WrapTextIcon"
                  tabler="IconTextWrap"
                  hugeicons="TextWrapIcon"
                  phosphor="ArrowUDownLeftIcon"
                  remixicon="RiTextWrap"
                ></svg>
              </button>
              <button
                kuiButton
                variant="ghost"
                size="icon-xs"
                aria-label="Download"
                (click)="download(code, 'route.ts')"
              >
                <svg
                  iconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="DownloadIcon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                ></svg>
              </button>
              <button kuiCodeBlockCopyButton [value]="code"></button>
            </div>
          </div>
          <pre
            kuiCodeBlockContent
            [wrap]="wrap()"
            lineNumbers
          >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine [variant]="index >= 5 && index <= 9 ? 'highlighted' : 'default'"><kui-highlighted-line [tokens]="line" /></span>}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockDemo {
  protected readonly wrap = signal(false)
  protected readonly styles = styles
  protected readonly code = code
  protected readonly download = download
  protected readonly lines = lines
  protected readonly page = page
}
