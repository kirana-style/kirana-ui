# Context

<!-- ::preview item="context-demo" height="250" combinations="vue/reka" -->

Context shows how much of the model's context window the conversation has used. It is a [Hover Card](/docs/components/hover-card) with a [Progress](/docs/components/progress) bar.

## Installation

Context is built with the [Hover Card](/docs/components/hover-card) and [Progress](/docs/components/progress) components.

<!-- ::installation name="hover-card progress" combinations="vue/reka" -->

## Usage

The code under the preview is the whole example, in one file.

## AI SDK

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
