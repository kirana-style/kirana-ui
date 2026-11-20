import { clientTools } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

const testSchema = z.object({
  name: z.string(),
  status: z.enum(["passed", "failed", "skipped"]),
  error: z.string().optional(),
})

export type Test = z.infer<typeof testSchema>

// The server's tool, as the client takes it for its types: the server runs it.
const runTests = toolDefinition({
  name: "runTests",
  description: "Run the project's tests.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({
    suites: z.array(z.object({ name: z.string(), tests: z.array(testSchema) })),
  }),
})

export const tools = clientTools(runTests)

export type ChatMessage = UIMessage<typeof tools>

type ChatPart = ChatMessage["parts"][number]

export type ToolPart = Extract<ChatPart, { type: "tool-call" }>

export type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>
