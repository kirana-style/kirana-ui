import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { z } from "zod"

const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), url: z.string() })),
  }),
})

const readBuildLog = toolDefinition({
  name: "readBuildLog",
  description: "Read a deployment's build log.",
  inputSchema: z.object({ deployment: z.string() }),
  outputSchema: z.object({ log: z.string() }),
})

const searchCode = toolDefinition({
  name: "searchCode",
  description: "Search the project's code.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ files: z.array(z.string()) }),
})

export const tools = clientTools(searchWeb, readBuildLog, searchCode)

export type ChatMessage = UIMessage<typeof tools>

export type Part = ChatMessage["parts"][number]

/** A tool call, with the error its result carries when it failed. */
export type ToolCall = Extract<Part, { type: "tool-call" }> & {
  errorText?: string
}

/** A message's tool calls: TanStack AI keeps each one's result in a part of its own. */
export function toolCallsOf(message: ChatMessage): ToolCall[] {
  return message.parts.flatMap((part) => {
    if (part.type !== "tool-call") return []
    const result = message.parts.find(
      (other) => other.type === "tool-result" && other.toolCallId === part.id
    )
    return [
      {
        ...part,
        errorText: result?.type === "tool-result" ? result.error : undefined,
      },
    ]
  })
}

export type Status = "running" | "error" | undefined
