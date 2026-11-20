import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/** The tools the agent calls, declared once for the server and the client: they type the parts. */
export const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
})

// TanStack AI's messages have no source parts: the sources are what the search tool returned.
export const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), url: z.string() })),
  }),
})

export const tools = [runCommand, searchWeb] as const

export type ChatMessage = UIMessage<typeof tools>

export type Part = ChatMessage["parts"][number]

export type ToolPart = Extract<Part, { type: "tool-call"; name: "runCommand" }>

export type ToolResultPart = Extract<Part, { type: "tool-result" }>

export type Source = z.infer<typeof searchWeb.outputSchema>["results"][number]
