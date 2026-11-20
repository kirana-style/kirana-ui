/**
 * What the chat demos on TanStack AI import, as `lib/ai.ts` is for the AI SDK's:
 * `@shadcn/helpers/tanstack-ai`'s scripted conversations (MIT), which stream through TanStack AI's
 * `useChat` (or its framework's equivalent) as AG-UI events, with no model, API route or network
 * request, and a message's text. The helper declares TanStack AI 0.40 as its peer and works with
 * 1.x (LF-004): a chat on 1.x needs a `threadId`.
 */
import type { UIMessage } from "@tanstack/ai-client"

export * from "@shadcn/helpers/tanstack-ai"

/** A message's text, its text parts joined (TanStack AI's parts carry `content`). */
export function getMessageText(message: Pick<UIMessage, "parts">) {
  return message.parts.reduce(
    (text, part) => (part.type === "text" ? text + part.content : text),
    ""
  )
}
