import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { useHighlightedCode } from "../../../lib/use-highlighted-code"
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
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function CodeBlockDemo() {
  const [wrap, setWrap] = React.useState(false)
  const lines = useHighlightedCode(code, "ts")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <IconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              />
              app/api/chat/route.ts
            </CodeBlockTitle>
            <CodeBlockActions>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Wrap lines"
                aria-pressed={wrap}
                sx={styles.button}
                onPress={() => setWrap(!wrap)}
              >
                <IconPlaceholder
                  lucide="WrapTextIcon"
                  tabler="IconTextWrap"
                  hugeicons="TextWrapIcon"
                  phosphor="ArrowUDownLeftIcon"
                  remixicon="RiTextWrap"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Download"
                onPress={() => download(code, "route.ts")}
              >
                <IconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="DownloadIcon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                />
              </Button>
              <CodeBlockCopyButton value={code} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap={wrap} lineNumbers>
            {lines.map((line, index) => (
              <CodeBlockLine
                key={index}
                variant={index >= 5 && index <= 9 ? "highlighted" : "default"}
              >
                {line}
              </CodeBlockLine>
            ))}
          </CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
