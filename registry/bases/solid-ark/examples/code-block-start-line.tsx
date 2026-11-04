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

export default function CodeBlockStartLine() {
  const styles = {
    div: css({
      width: "100%",
      maxWidth: containerSize.md,
    }),
  }

  const code = `  if (!session) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return <ProjectList projects={projects} />
}`

  const lines = createMemo(() => useHighlightedCode(code, "tsx"))

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>app/dashboard/page.tsx</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent lineNumbers startLine={995}>
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
