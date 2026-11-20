import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/**
 * The research agent runs as one tool: its result, when it has finished, is the commands it ran
 * and its report. TanStack AI streams a tool's input, not its output, so the steps arrive with the
 * result.
 */
export const researchAgent = toolDefinition({
  name: "researchAgent",
  description: "Hand a research task to a subagent.",
  inputSchema: z.object({ task: z.string() }),
  outputSchema: z.object({
    steps: z.array(z.object({ command: z.string(), stdout: z.string() })),
    report: z.string(),
  }),
})

export const tools = [researchAgent] as const

export type ChatMessage = UIMessage<typeof tools>

export type AgentPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-call" }
>

export type Step = z.infer<typeof researchAgent.outputSchema>["steps"][number]
