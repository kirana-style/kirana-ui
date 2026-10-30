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

const output = `$ pnpm build
> next build

 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)

Route (app)                Size  First Load JS
┌ ○ /                    1.9 kB         112 kB
├ ○ /_not-found           993 B         103 kB
└ ƒ /api/chat             141 B         102 kB`

export default function CodeBlockBasic() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock>
          <CodeBlockContent>{output}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
