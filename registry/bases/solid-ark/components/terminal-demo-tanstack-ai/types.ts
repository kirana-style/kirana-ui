import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/**
 * TanStack AI streams a tool's input, not its output: the command's output is in the tool's
 * result, which arrives when the command exits.
 */
export const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ output: z.string(), exitCode: z.number() }),
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
