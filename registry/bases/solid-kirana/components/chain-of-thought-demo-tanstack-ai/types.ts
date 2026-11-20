import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/** The tools the agent calls, declared once for the server and the client: they type the parts. */
export const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), url: z.string() })),
  }),
})

export const readBuildLog = toolDefinition({
  name: "readBuildLog",
  description: "Read a deployment's build log.",
  inputSchema: z.object({ deployment: z.string() }),
  outputSchema: z.object({ log: z.string() }),
})

export const searchCode = toolDefinition({
  name: "searchCode",
  description: "Search the project's code.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ files: z.array(z.string()) }),
})

export const tools = [searchWeb, readBuildLog, searchCode] as const

export type ChatMessage = UIMessage<typeof tools>

export type StepPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-call" }
>

export type ToolResultPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-result" }
>

export type Status = "running" | "error" | undefined
