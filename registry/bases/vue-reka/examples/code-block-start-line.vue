<script setup lang="ts">
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/vue/use-highlighted-code"
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

const lines = useHighlightedCode(code, "tsx")
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle> app/dashboard/page.tsx</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent line-numbers :start-line="995">
          <CodeBlockLine v-for="(line, index) in lines" :key="index"
            ><HighlightedLine :tokens="line" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  </div>
</template>
