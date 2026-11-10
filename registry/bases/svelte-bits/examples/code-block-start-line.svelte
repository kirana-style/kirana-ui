<script lang="ts">
  import {
    HighlightedLine,
    useHighlightedCode,
  } from "../../../lib/svelte/use-highlighted-code"
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

  const code = `  if (!session) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return <ProjectList projects={projects} />
}`

  const lines = $derived(useHighlightedCode(code, "tsx"))
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle> app/dashboard/page.tsx</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers startLine={995}>{#each lines as line, index (index)}<CodeBlockLine><HighlightedLine tokens={line} /></CodeBlockLine>{/each}</CodeBlockContent>
    </CodeBlock>
  </div>
</div>
