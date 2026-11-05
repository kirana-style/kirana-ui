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
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const styles = {
  tabs: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.md },
  }),
}

const files = [
  {
    id: "route",
    title: "app/api/chat/route.ts",
    language: "ts",
    code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`,
  },
  {
    id: "chat",
    title: "components/chat.tsx",
    language: "tsx",
    code: `import { useChat } from "@ai-sdk/react"

export function Chat() {
  const { messages } = useChat()

  return <MessageList messages={messages} />
}`,
  },
  {
    id: "env",
    title: ".env.local",
    language: "bash",
    code: "AI_GATEWAY_API_KEY=your-api-key",
  },
]

// Each file's lines, as Vue's `FileCode` highlights them.
const fileLines = files.map((file) =>
  useHighlightedCode(
    () => file.code,
    () => file.language
  )
)

@Component({
  selector: "code-block-tabs",
  imports: [
    HighlightedLine,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockLine,
    CodeBlockHeader,
    CodeBlockTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTabs defaultValue="route" [sx]="styles.tabs">
        <div kuiTabsList>
          @for (file of files; track file.id) {
            <button kuiTabsTrigger [value]="file.id">
              {{ file.title.split("/").at(-1) }}
            </button>
          }
        </div>
        @for (file of files; track file.id) {
          <div kuiTabsContent [value]="file.id">
            <div kuiCodeBlock>
              <div kuiCodeBlockHeader>
                <div kuiCodeBlockTitle>{{ file.title }}</div>
                <div kuiCodeBlockActions>
                  <button kuiCodeBlockCopyButton [value]="file.code"></button>
                </div>
              </div>
              <pre
                kuiCodeBlockContent
                lineNumbers
              >@for (line of fileLines[$index]!(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export default class CodeBlockTabs {
  protected readonly styles = styles
  protected readonly files = files
  protected readonly fileLines = fileLines
  protected readonly page = page
}
