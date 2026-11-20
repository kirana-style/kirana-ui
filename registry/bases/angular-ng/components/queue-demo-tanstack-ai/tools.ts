import { clientTools } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

const todoSchema = z.object({
  content: z.string(),
  status: z.enum(["pending", "in_progress", "completed"]),
})

export type Todo = z.infer<typeof todoSchema>

// The server's tool, as the client takes it for its types: the server runs it.
const writeTodos = toolDefinition({
  name: "writeTodos",
  description: "Write the todo list, whole, each time it changes.",
  inputSchema: z.object({ todos: z.array(todoSchema) }),
  outputSchema: z.string(),
})

export const tools = clientTools(writeTodos)

export type ChatMessage = UIMessage<typeof tools>

type ChatPart = ChatMessage["parts"][number]

export type ToolPart = Extract<ChatPart, { type: "tool-call" }>

export type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>
