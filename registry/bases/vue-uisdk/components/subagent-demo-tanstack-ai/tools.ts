import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { z } from "zod"

const step = z.object({ command: z.string(), stdout: z.string() })

export type Step = z.infer<typeof step>

// The subagent's run, as its tool returns it: TanStack AI's tool results carry no preliminary
// output, so its steps arrive with its report, when it finishes.
const researchAgent = toolDefinition({
  name: "researchAgent",
  description: "Hand a research task to a subagent.",
  inputSchema: z.object({ task: z.string() }),
  outputSchema: z.object({ steps: z.array(step), report: z.string() }),
})

export const tools = clientTools(researchAgent)

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
