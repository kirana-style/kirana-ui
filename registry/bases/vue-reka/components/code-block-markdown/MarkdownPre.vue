<script setup lang="ts">
/** A fenced block: TanStack Markdown names its language in `data-lang`. */
import { computed, useAttrs, useSlots } from "vue"

import MarkdownCodeBlock from "./MarkdownCodeBlock.vue"

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

// The fence's text, the `code` element's children, as React's reads `children.props.children`.
const text = (children: unknown): string => {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(text).join("")
  if (children && typeof children === "object") {
    if ("children" in children)
      return text((children as { children: unknown }).children)
    if ("default" in children)
      return text((children as { default: () => unknown }).default())
  }
  return ""
}
const code = () => text(slots.default?.()[0]?.children)
const language = computed(() => String(attrs["data-lang"] ?? ""))
</script>

<template>
  <MarkdownCodeBlock :code="code()" :language="language" />
</template>
