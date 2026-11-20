import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { z } from "zod"

const source = z.object({ url: z.string(), title: z.string().optional() })

export type Source = z.infer<typeof source>

const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ sources: z.array(source) }),
})

export const tools = clientTools(searchWeb)

export type ChatMessage = UIMessage<typeof tools>

export type Part = ChatMessage["parts"][number]
