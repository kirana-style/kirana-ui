# Model Selector

<!-- ::preview item="model-selector-demo" height="360" combinations="solid/uisdk" -->

## Installation

Model Selector is built with the [Dropdown Menu](/docs/components/dropdown-menu) and [Input Group](/docs/components/input-group) components.

<!-- ::installation name="dropdown-menu input-group" combinations="solid/uisdk" -->

## Usage

The code under the preview is the whole example, in one file.

## In a Chat

<!-- ::start:runtime ai-sdk -->

Send the model and the effort with the message. Map them to a model and provider options in the route.

```ts showLineNumbers
sendMessage({ text }, { body: { model, effort } })
```

```ts showLineNumbers title="app/api/chat/route.ts"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

const models = {
  "gpt-5": openai("gpt-5"),
  "gpt-5-mini": openai("gpt-5-mini"),
  "claude-sonnet-4-5": anthropic("claude-sonnet-4-5"),
  "claude-haiku-4-5": anthropic("claude-haiku-4-5"),
}

export async function POST(req: Request) {
  const { messages, model, effort } = (await req.json()) as {
    messages: UIMessage[]
    model: keyof typeof models
    effort: "low" | "medium" | "high"
  }

  const result = streamText({
    model: models[model] ?? models["gpt-5"],
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: { reasoningEffort: effort },
      anthropic: { effort },
    },
  })

  return result.toUIMessageStreamResponse()
}
```

Each provider reads its own key in `providerOptions` and ignores the rest.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Send the model and the effort with the chat as `forwardedProps`. Read them in the route, pick the adapter for the model, and pass the effort as `reasoning`.

```ts showLineNumbers
useChat({
  connection: fetchServerSentEvents("/api/chat"),
  threadId: "chat",
  forwardedProps: { model, effort },
})
```

```ts showLineNumbers title="app/api/chat/route.ts"
import {
  chat,
  chatParamsFromRequest,
  toServerSentEventsResponse,
} from "@tanstack/ai"
import { anthropicText } from "@tanstack/ai-anthropic"
import { openaiText } from "@tanstack/ai-openai"

const adapters = {
  "gpt-5": () => openaiText("gpt-5"),
  "gpt-5-mini": () => openaiText("gpt-5-mini"),
  "claude-sonnet-4-5": () => anthropicText("claude-sonnet-4-5"),
  "claude-haiku-4-5": () => anthropicText("claude-haiku-4-5"),
}

export async function POST(request: Request) {
  const { messages, threadId, forwardedProps } =
    await chatParamsFromRequest(request)
  const model = forwardedProps.model as keyof typeof adapters
  const effort = forwardedProps.effort as "low" | "medium" | "high"

  const stream = chat({
    adapter: (adapters[model] ?? adapters["gpt-5"])(),
    messages,
    threadId,
    reasoning: effort,
  })

  return toServerSentEventsResponse(stream)
}
```

Each adapter writes the effort into its provider's own field.

<!-- ::end:runtime -->
