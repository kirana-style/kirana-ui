import { css } from "@kirana-style/core"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function CodeBlockWrap() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <CodeBlock>
          <CodeBlockContent code={output} />
        </CodeBlock>
        <CodeBlock>
          <CodeBlockContent wrap code={output} />
        </CodeBlock>
      </div>
    </div>
  )
}
