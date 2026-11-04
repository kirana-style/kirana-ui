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
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      display: "flex",
      width: "100%",
      maxWidth: containerSize.md,
      flexDirection: "column",
      gap: space[4],
    }),
  }

  const samples = [
    {
      language: "css",
      title: "app/globals.css",
      code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
    },
    {
      language: "python",
      title: "main.py",
      code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
    },
    {
      language: "text",
      title: "notes.txt",
      code: "A language that is not in the list renders as plain text.",
    },
  ]

  // Each sample's lines, as React's `Sample` highlights them.
  const sampleLines = samples.map((sample) =>
    useHighlightedCode(sample.code, sample.language)
  )
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    {#each samples as sample, i (sample.language)}
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>{sample.title}</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>
          {#each sampleLines[i]! as line, index (index)}
            <CodeBlockLine><HighlightedLine tokens={line} /></CodeBlockLine>
          {/each}
        </CodeBlockContent>
      </CodeBlock>
    {/each}
  </div>
</div>
