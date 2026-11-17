import { css } from "@kirana-style/core"

import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
}

const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`

export default function CodeBlockLineNumbers() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock>
          <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
