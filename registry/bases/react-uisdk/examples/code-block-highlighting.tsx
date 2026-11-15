import { useHighlightedCode } from "../../../lib/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
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

const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`

export default function CodeBlockHighlighting() {
  const lines = useHighlightedCode(code, "json")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>getWeather output</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent>
            {lines.map((line, index) => (
              <CodeBlockLine key={index}>{line}</CodeBlockLine>
            ))}
          </CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
