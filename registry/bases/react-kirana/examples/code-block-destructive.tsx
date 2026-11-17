import { css } from "@kirana-style/core"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)`

export default function CodeBlockDestructive() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock variant="destructive">
          <CodeBlockHeader>
            <CodeBlockTitle>Error</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={error} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap>{error}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
