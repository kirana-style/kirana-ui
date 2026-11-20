# Context

<!-- ::preview item="context-demo" height="250" combinations="angular/kirana" -->

Context shows how much of the model's context window the conversation has used. It is a [Hover Card](/docs/components/hover-card) with a [Progress](/docs/components/progress) bar.

## Installation

Context is built with the [Hover Card](/docs/components/hover-card) and [Progress](/docs/components/progress) components.

<!-- ::installation name="hover-card progress" combinations="angular/kirana" -->

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

Read usage from the end of the run. TanStack AI's `RUN_FINISHED` event carries it as AG-UI's `usage`, one entry per model call: add them up in `onChunk`.

```ts showLineNumbers
protected readonly used = signal(0)

protected readonly chat = injectChat({
  connection,
  threadId,
  onChunk: (chunk) => {
    if (chunk.type === EventType.RUN_FINISHED && Array.isArray(chunk.usage)) {
      this.used.set(
        chunk.usage.reduce((sum, usage) => sum + (usage.totalTokens ?? 0), 0)
      )
    }
  },
})
```

```ts showLineNumbers
const percent = Math.round((this.used() / limit) * 100)
```

`limit` is the model's context window. TanStack AI does not send it, so set it from the model you use.

<!-- ::end:runtime -->
