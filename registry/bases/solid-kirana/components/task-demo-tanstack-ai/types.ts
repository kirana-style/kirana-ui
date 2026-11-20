import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

/**
 * TanStack AI's messages have no data parts: the agent writes a task, by its id, with a tool each
 * time one of its steps moves, and a task's latest call is the task.
 */
export const updateTask = toolDefinition({
  name: "updateTask",
  description: "Write a task and the status of each of its steps.",
  inputSchema: z.object({
    id: z.string(),
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        status: z.enum(["done", "running", "error"]),
      })
    ),
  }),
})

export const tools = [updateTask] as const

export type ChatMessage = UIMessage<typeof tools>

export type Task = z.infer<typeof updateTask.inputSchema>

export type Status = "running" | "error" | undefined
