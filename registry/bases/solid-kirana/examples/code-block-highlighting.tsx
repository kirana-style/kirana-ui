import { For, createMemo } from "solid-js"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/solid/use-highlighted-code"
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

export default function CodeBlockHighlighting() {
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

  const lines = createMemo(() => useHighlightedCode(code, "json"))

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>getWeather output</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent>
            <For each={lines()}>
              {(line) => (
                <CodeBlockLine>
                  <HighlightedLine tokens={line} />
                </CodeBlockLine>
              )}
            </For>
          </CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
