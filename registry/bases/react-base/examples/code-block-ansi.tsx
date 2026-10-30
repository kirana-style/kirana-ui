import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { ansiText } from "../../../lib/highlighter"
import { useHighlightedCode } from "../../../lib/use-highlighted-code"
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
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    width: "100%",
    maxWidth: containerSize.md,
  }),
}

const output = `$ pnpm test
\x1b[32m✓\x1b[39m src/format.test.ts \x1b[2m(4 tests)\x1b[22m
\x1b[32m✓\x1b[39m src/parse.test.ts \x1b[2m(7 tests)\x1b[22m
\x1b[31m✗\x1b[39m src/stream.test.ts \x1b[2m(3 tests | 1 failed)\x1b[22m

\x1b[31mAssertionError: expected 'hello' to be 'hello world'\x1b[39m

Tests  \x1b[31m1 failed\x1b[39m | \x1b[32m13 passed\x1b[39m (14)`

export default function CodeBlockAnsi() {
  const lines = useHighlightedCode(output, "ansi")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <IconPlaceholder
                lucide="TerminalIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
              />
              Terminal
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={ansiText(output)} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap>
            {lines.map((line, index) => (
              <CodeBlockLine key={index}>{line}</CodeBlockLine>
            ))}
          </CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
