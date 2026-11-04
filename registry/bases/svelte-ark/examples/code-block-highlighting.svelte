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

  const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`

  const lines = $derived(useHighlightedCode(code, "json"))
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle> getWeather output</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>{#each lines as line, index (index)}<CodeBlockLine><HighlightedLine tokens={line} /></CodeBlockLine>{/each}</CodeBlockContent>
    </CodeBlock>
  </div>
</div>
