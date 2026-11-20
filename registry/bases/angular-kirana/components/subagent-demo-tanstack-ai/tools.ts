import { clientTools } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

const stepSchema = z.object({ command: z.string(), stdout: z.string() })

/** A command the subagent ran, and its output. */
export type Step = z.infer<typeof stepSchema>

// The subagent is a tool as the server defines it; the client takes the definition for its types.
// TanStack AI's connection carries no partial tool results, so its steps arrive with its report.
const researchAgent = toolDefinition({
  name: "researchAgent",
  description: "Hand a research task to a subagent.",
  inputSchema: z.object({ task: z.string() }),
  outputSchema: z.object({ steps: z.array(stepSchema), report: z.string() }),
})

export const tools = clientTools(researchAgent)

export type ChatMessage = UIMessage<typeof tools>

export type AgentPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-call" }
>
