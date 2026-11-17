<script lang="ts">
  import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
  } from "../ui/code-block"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
  import { css } from "@kirana-style/core"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import FileCode from "../components/code-block-tabs/FileCode.svelte"

  const styles = {
    tabs: css({
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: containerSize.md },
    }),
  }

  const files = [
    {
      id: "route",
      title: "app/api/chat/route.ts",
      language: "ts",
      code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`,
    },
    {
      id: "chat",
      title: "components/chat.tsx",
      language: "tsx",
      code: `import { useChat } from "@ai-sdk/react"

export function Chat() {
  const { messages } = useChat()

  return <MessageList messages={messages} />
}`,
    },
    {
      id: "env",
      title: ".env.local",
      language: "bash",
      code: "AI_GATEWAY_API_KEY=your-api-key",
    },
  ]
</script>

<div sx={page.example}>
  <Tabs defaultValue="route" sx={styles.tabs}>
    <TabsList>
      {#each files as file (file.id)}
        <TabsTrigger value={file.id}>
          {file.title.split("/").at(-1)}
        </TabsTrigger>
      {/each}
    </TabsList>
    {#each files as file (file.id)}
      <TabsContent value={file.id}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>{file.title}</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={file.code} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <FileCode code={file.code} language={file.language} />
        </CodeBlock>
      </TabsContent>
    {/each}
  </Tabs>
</div>
