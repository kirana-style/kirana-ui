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

const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`

export default function CodeBlockSize() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
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
              <CodeBlockCopyButton value={output} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap>{output}</CodeBlockContent>
        </CodeBlock>
        <CodeBlock size="sm">
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
              <CodeBlockCopyButton value={output} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap>{output}</CodeBlockContent>
        </CodeBlock>
      </div>
    </div>
  )
}
