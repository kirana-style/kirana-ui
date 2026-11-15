<script setup lang="ts">
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

<template>
  <div :sx="page.example">
    <div :sx="styles.wFullMaxWMd">
      <CodeBlock>
        <CodeBlockContent line-numbers>
          <CodeBlockLine
            v-for="(line, index) in code.split('\n')"
            :key="index"
            :variant="highlighted.includes(index) ? 'highlighted' : 'default'"
            >{{ line }}</CodeBlockLine
          >
        </CodeBlockContent>
      </CodeBlock>
    </div>
  </div>
</template>
