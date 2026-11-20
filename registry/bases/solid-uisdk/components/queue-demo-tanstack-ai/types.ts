import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/** The agent's todo list: it writes the whole list each time a todo moves. */
export const writeTodos = toolDefinition({
  name: "writeTodos",
  description: "Write the todo list.",
  inputSchema: z.object({
    todos: z.array(
      z.object({
        content: z.string(),
        status: z.enum(["pending", "in_progress", "completed"]),
      })
    ),
  }),
  outputSchema: z.string(),
})

export const tools = [writeTodos] as const

export type ChatMessage = UIMessage<typeof tools>

export type Todo = z.infer<typeof writeTodos.inputSchema>["todos"][number]
