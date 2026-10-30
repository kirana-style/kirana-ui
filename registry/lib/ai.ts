/**
 * What the chat demos import, as upstream's `@/lib/ai`: `@shadcn/helpers/ai-sdk`'s scripted
 * conversations (MIT), which stream through the AI SDK's `useChat` with no model, API route or
 * network request, and a message's text. On the AI SDK until the helpers' TanStack AI adapter takes
 * TanStack AI 1.x (LF-004).
 */
import type { UIMessage } from "ai"

export * from "@shadcn/helpers/ai-sdk"

/** A message's text, its text parts joined. */
export function getMessageText(message: Pick<UIMessage, "parts">) {
  return message.parts.reduce(
    (text, part) => (part.type === "text" ? text + part.text : text),
    ""
  )
}
