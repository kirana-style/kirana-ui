# Context

<!-- ::preview item="context-demo" height="250" combinations="solid/uisdk" -->

Context shows how much of the model's context window the conversation has used. It is a [Hover Card](/docs/components/hover-card) with a [Progress](/docs/components/progress) bar.

## Installation

Context is built with the [Hover Card](/docs/components/hover-card) and [Progress](/docs/components/progress) components.

<!-- ::installation name="hover-card progress" combinations="solid/uisdk" -->

## Usage

The code under the preview is the whole example, in one file.

## In a Chat

<!-- ::start:runtime ai-sdk -->

Read usage from the metadata on the agent's message. `messageMetadata` runs when the stream finishes.

```ts showLineNumbers title="app/api/chat/route.ts"
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) => {
    if (part.type === "finish") {
      return { usage: part.totalUsage }
    }
  },
})
```

```ts showLineNumbers
const usage = message.metadata?.usage
const used = (usage?.inputTokens ?? 0) + (usage?.outputTokens ?? 0)
const percent = Math.round((used / limit) * 100)
```

`limit` is the model's context window. The AI SDK does not send it, so set it from the model you use.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

TanStack AI reports a run's token usage on its `RUN_FINISHED` event. Read it in `onChunk` and keep it beside the chat.

```ts showLineNumbers
const [usage, setUsage] = createSignal<TokenUsage>()

const { messages } = useChat({
  connection: fetchServerSentEvents("/api/chat"),
  threadId: "chat",
  onChunk: (chunk) => {
    if (
      chunk.type === "RUN_FINISHED" &&
      chunk.usage &&
      !Array.isArray(chunk.usage)
    )
      setUsage(chunk.usage)
  },
})

const percent = () => Math.round(((usage()?.totalTokens ?? 0) / limit) * 100)
```

`limit` is the model's context window. TanStack AI does not send it, so set it from the model you use.

<!-- ::end:runtime -->
