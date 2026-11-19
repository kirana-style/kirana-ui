import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { page } from "../../../styles/page.styles"

export default function CodeBlockSize() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
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
              <CodeBlockCopyButton value={output} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap code={output} />
        </CodeBlock>
        <CodeBlock size="sm">
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
              <CodeBlockCopyButton value={output} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap code={output} />
        </CodeBlock>
      </div>
    </div>
  )
}
