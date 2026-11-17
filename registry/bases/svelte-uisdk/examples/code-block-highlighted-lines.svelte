<script lang="ts">
  import { css } from "@kirana-style/core"
  import { CodeBlock, CodeBlockContent, CodeBlockLine } from "../ui/code-block"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    wFullMaxWMd: css({
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.md,
    }),
  }

  const code = `export default {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
}`

  const highlighted = [2, 3]
</script>

<div sx={page.example}>
  <div sx={styles.wFullMaxWMd}>
    <CodeBlock>
      <CodeBlockContent lineNumbers>{#each code.split('\n') as line, index (index)}<CodeBlockLine variant={highlighted.includes(index) ? 'highlighted' : 'default'}>{line}</CodeBlockLine>{/each}</CodeBlockContent>
    </CodeBlock>
  </div>
</div>
