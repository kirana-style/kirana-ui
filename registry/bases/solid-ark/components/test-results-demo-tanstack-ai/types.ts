import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

const test = z.object({
  name: z.string(),
  status: z.enum(["passed", "failed", "skipped"]),
  error: z.string().optional(),
})

/** The tool the agent calls, declared once for the server and the client: it types the parts. */
export const runTests = toolDefinition({
  name: "runTests",
  description: "Run the project's tests.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({
    suites: z.array(z.object({ name: z.string(), tests: z.array(test) })),
  }),
})

export const tools = [runTests] as const

export type ChatMessage = UIMessage<typeof tools>

export type Test = z.infer<typeof test>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-call" }
>
