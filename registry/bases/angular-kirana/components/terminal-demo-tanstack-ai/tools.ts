import { clientTools } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

// The server's tool, as the client takes it for its types: the server runs it.
const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ exitCode: z.number(), output: z.string() }),
})

export const tools = clientTools(runCommand)

export type ChatMessage = UIMessage<typeof tools>

type ChatPart = ChatMessage["parts"][number]

export type ToolPart = Extract<ChatPart, { type: "tool-call" }>

export type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>
