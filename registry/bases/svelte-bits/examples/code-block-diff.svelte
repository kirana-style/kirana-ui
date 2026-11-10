<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
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

  const patch = ` export default function Greeting({ name }: { name: string }) {
-  return <p>Hello, {name}</p>
+  return <p className="text-sm text-muted-foreground">
+    Hello, {name}!
+  </p>
 }`

  function getVariant(line: string) {
    if (line.startsWith("+")) {
      return "added"
    }

    if (line.startsWith("-")) {
      return "removed"
    }

    return "default"
  }
</script>

<div sx={page.example}>
  <div sx={styles.wFullMaxWMd}>
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle> components/greeting.tsx</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={patch} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{#each patch.split('\n') as line, index (index)}<CodeBlockLine variant={getVariant(line)}>{line.slice(1)}</CodeBlockLine>{/each}</CodeBlockContent>
    </CodeBlock>
  </div>
</div>
