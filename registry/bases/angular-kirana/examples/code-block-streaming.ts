import { Component, DestroyRef, effect, inject, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { StreamingBlock } from "../components/streaming-block"
import type { StreamingBlockData } from "../components/streaming-block"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"

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

const blocks: StreamingBlockData[] = [
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

@Component({
  selector: "code-block-streaming",
  imports: [Button, IconPlaceholder, StreamingBlock, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (block of blocks; track block.code; let index = $index) {
          @if (length() > offsets[index]) {
            <div
              kuiStreamingBlock
              [block]="block"
              [code]="block.code.slice(0, length() - offsets[index])"
            ></div>
          }
        }
        <button
          kuiButton
          variant="outline"
          size="sm"
          [sx]="styles.button"
          [disabled]="length() < total"
          (click)="length.set(0)"
        >
          <svg
            iconPlaceholder
            lucide="RotateCcwIcon"
            tabler="IconRotate"
            hugeicons="RotateLeft01Icon"
            phosphor="ArrowCounterClockwiseIcon"
            remixicon="RiArrowGoBackLine"
          ></svg>
          Replay
        </button>
      </div>
    </div>
  `,
})
export default class CodeBlockStreaming {
  protected readonly length = signal(total)
  protected readonly styles = styles
  protected readonly blocks = blocks
  protected readonly offsets = offsets
  protected readonly total = total
  protected readonly page = page

  constructor() {
    // The code grows three characters a frame until it is whole.
    let timeout: ReturnType<typeof setTimeout> | undefined
    effect(() => {
      const value = this.length()
      clearTimeout(timeout)
      if (value < total)
        timeout = setTimeout(() => this.length.set(value + 3), 16)
    })
    inject(DestroyRef).onDestroy(() => clearTimeout(timeout))
  }
}
