<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue"

import StreamingBlock from "../components/StreamingBlock.vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
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
  button: css({
    alignSelf: "flex-start",
  }),
}

const blocks: {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}[] = [
  {
    title: "hooks/use-debounce.ts",
    language: "ts",
    lineNumbers: true,
    code: `export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}`,
  },
  {
    language: "bash",
    code: "pnpm dlx shadcn@latest add code-block",
  },
  {
    title: "components/search.tsx",
    language: "tsx",
    lineNumbers: true,
    diff: true,
    code: ` export function Search() {
   const [query, setQuery] = React.useState("")
-  const results = useSearch(query)
+  const debounced = useDebounce(query, 300)
+  const results = useSearch(debounced)

   return <SearchResults results={results} />
 }`,
  },
  {
    title: "app/api/chat/route.ts",
    language: "ts",
    lineNumbers: true,
    highlight: [5, 6, 7, 8],
    code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`,
  },
  {
    title: ".env.local",
    language: "bash",
    code: "AI_GATEWAY_API_KEY=your-api-key",
  },
]

const offsets = blocks.map((_, index) =>
  blocks.slice(0, index).reduce((total, block) => total + block.code.length, 0)
)

const total = blocks.reduce((sum, block) => sum + block.code.length, 0)

const length = ref(total)

// The code grows three characters a frame until it is whole.
let timeout: ReturnType<typeof setTimeout> | undefined
watch(
  length,
  (value) => {
    clearTimeout(timeout)
    if (value < total)
      timeout = setTimeout(() => (length.value = value + 3), 16)
  },
  { immediate: true }
)
onUnmounted(() => clearTimeout(timeout))
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <template v-for="(block, index) in blocks" :key="block.code">
        <StreamingBlock
          v-if="length > offsets[index]"
          :block="block"
          :code="block.code.slice(0, length - offsets[index])"
        />
      </template>
      <Button
        variant="outline"
        size="sm"
        :sx="styles.button"
        :disabled="length < total"
        @click="length = 0"
      >
        <IconPlaceholder
          lucide="RotateCcwIcon"
          tabler="IconRotate"
          hugeicons="RotateLeft01Icon"
          phosphor="ArrowCounterClockwiseIcon"
          remixicon="RiArrowGoBackLine"
        />
        Replay
      </Button>
    </div>
  </div>
</template>
