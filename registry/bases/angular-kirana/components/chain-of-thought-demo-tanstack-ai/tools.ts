import { clientTools } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

// The server's tools, as the client takes them for their types: the server runs them.
const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), url: z.string() })),
  }),
})

const readBuildLog = toolDefinition({
  name: "readBuildLog",
  description: "Read a deployment's build log.",
  inputSchema: z.object({ deployment: z.string() }),
  outputSchema: z.object({ log: z.string() }),
})

const searchCode = toolDefinition({
  name: "searchCode",
  description: "Search the project's code.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ files: z.array(z.string()) }),
})

export const tools = clientTools(searchWeb, readBuildLog, searchCode)

export type ChatMessage = UIMessage<typeof tools>

type ChatPart = ChatMessage["parts"][number]

export type ToolPart = Extract<ChatPart, { type: "tool-call" }>

export type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>
