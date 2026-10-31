import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  ariaPressedTextForegroun: css({
    color: { '[aria-pressed="true"]': theme.foreground },
  }),
}

const output = `$ pnpm lint
apps/web/components/message-list.tsx
  18:22  error  'messages' is possibly 'undefined'. Add a guard before calling map  @typescript-eslint/no-unsafe-call
  42:7   warning  React Hook React.useEffect has a missing dependency: 'scrollToBottom'  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)`

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function CodeBlockActionsExample() {
  const [wrap, setWrap] = React.useState(true)

  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <IconPlaceholder
                lucide="CommandIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
              />
              Terminal
            </CodeBlockTitle>
            <CodeBlockActions>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Wrap lines"
                aria-pressed={wrap}
                sx={styles.ariaPressedTextForegroun}
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
                onPress={() => download(output, "lint.log")}
              >
                <IconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="DownloadIcon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                />
              </Button>
              <CodeBlockCopyButton value={output} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap={wrap}>{output}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
