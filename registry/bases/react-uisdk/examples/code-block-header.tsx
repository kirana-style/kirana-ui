import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

const command = "pnpm add ai @ai-sdk/react zod"

const output = `$ ${command}
Packages: +14
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`

export default function CodeBlockHeaderExample() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <IconPlaceholder
                lucide="CommandIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
              />
              Terminal
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={command} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent>{output}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
