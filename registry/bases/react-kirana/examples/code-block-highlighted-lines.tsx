import { css } from "@kirana-style/core"

import { CodeBlock, CodeBlockContent, CodeBlockLine } from "../ui/code-block"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const code = `export default {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
}`

const highlighted = [2, 3]

export default function CodeBlockHighlightedLines() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock>
          <CodeBlockContent lineNumbers>
            {code.split("\n").map((line, index) => (
              <CodeBlockLine
                key={index}
                variant={
                  highlighted.includes(index) ? "highlighted" : "default"
                }
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
