import { css } from "@kirana-style/core"

import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
}

const output = `Error: The model "anthropic/claude-sonnet-4.5" returned an error: Request too large. The prompt is 212,431 tokens and the context window is 200,000 tokens. Remove some messages or summarize the conversation and try again.`

export default function CodeBlockWrap() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <CodeBlock>
          <CodeBlockContent>{output}</CodeBlockContent>
        </CodeBlock>
        <CodeBlock>
          <CodeBlockContent wrap>{output}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
