import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/** The tool the agent calls, declared once for the server and the client: it types the parts. */
export const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
})

export const tools = [runCommand] as const

export type ChatMessage = UIMessage<typeof tools>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-call" }
>

export type ToolResultPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-result" }
>
