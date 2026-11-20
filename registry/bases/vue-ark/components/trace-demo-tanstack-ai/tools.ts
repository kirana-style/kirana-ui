import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { z } from "zod"

const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
})

const source = z.object({ url: z.string(), title: z.string().optional() })

export type Source = z.infer<typeof source>

const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ sources: z.array(source) }),
})

export const tools = clientTools(runCommand, searchWeb)

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

export type RunCommandCall = Extract<ToolCall, { name: "runCommand" }>

export type ThinkingPart = Extract<Part, { type: "thinking" }>
