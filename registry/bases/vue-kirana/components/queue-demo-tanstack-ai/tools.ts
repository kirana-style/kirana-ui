import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { z } from "zod"

const todo = z.object({
  content: z.string(),
  status: z.enum(["pending", "in_progress", "completed"]),
})

export type Todo = z.infer<typeof todo>

const writeTodos = toolDefinition({
  name: "writeTodos",
  description: "Write the agent's todo list.",
  inputSchema: z.object({ todos: z.array(todo) }),
  outputSchema: z.string(),
})

export const tools = clientTools(writeTodos)

export type ChatMessage = UIMessage<typeof tools>

export type Part = ChatMessage["parts"][number]
