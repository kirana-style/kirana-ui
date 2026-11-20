import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/**
 * TanStack AI's messages have no source parts: the sources are what the agent's search tool
 * returned, which the tool's output types.
 */
export const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), url: z.string() })),
  }),
})

export const tools = [searchWeb] as const

export type ChatMessage = UIMessage<typeof tools>

export type Source = z.infer<typeof searchWeb.outputSchema>["results"][number]
