<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import {
    HighlightedLine,
    useHighlightedCode,
  } from "../../../lib/svelte/use-highlighted-code"
  import { Button } from "../ui/button"
  import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
  } from "../ui/code-block"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../core/tokens"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      width: "100%",
      maxWidth: containerSize.lg,
    }),
    button: css({
      color: { '[aria-pressed="true"]': theme.foreground },
    }),
  }

  const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`

  function download(value: string, filename: string) {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  let wrap = $state(false)

  const lines = $derived(useHighlightedCode(code, "ts"))
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle><IconPlaceholder lucide="FileCodeIcon" tabler="IconFileCode" hugeicons="File01Icon" phosphor="FileCodeIcon" remixicon="RiFileCodeLine" />app/api/chat/route.ts</CodeBlockTitle>
        <CodeBlockActions>
          <Button variant="ghost" size="icon-xs" aria-label="Wrap lines" aria-pressed={wrap} sx={styles.button} onclick={() => (wrap = !wrap)}>
            <IconPlaceholder lucide="WrapTextIcon" tabler="IconTextWrap" hugeicons="TextWrapIcon" phosphor="ArrowUDownLeftIcon" remixicon="RiTextWrap" />
          </Button>
          <Button variant="ghost" size="icon-xs" aria-label="Download" onclick={() => download(code, 'route.ts')}>
            <IconPlaceholder lucide="DownloadIcon" tabler="IconDownload" hugeicons="DownloadIcon" phosphor="DownloadIcon" remixicon="RiDownloadLine" />
          </Button>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap={wrap} lineNumbers>{#each lines as line, index (index)}<CodeBlockLine variant={index >= 5 && index <= 9 ? 'highlighted' : 'default'}><HighlightedLine tokens={line} /></CodeBlockLine>{/each}</CodeBlockContent>
    </CodeBlock>
  </div>
</div>
