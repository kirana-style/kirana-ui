import { css } from "@kirana-style/core"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"
import { containerSize, space } from "../../../core/scales"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  maxH48ScrollFadeY: css(scrollFade, { maxHeight: space[48] }),
}

const logs = Array.from(
  { length: 40 },
  (_, index) =>
    `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
).join("\n")

export default function CodeBlockHeight() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>Logs</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={logs} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent sx={styles.maxH48ScrollFadeY}>
            {logs}
          </CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
