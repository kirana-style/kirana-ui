import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { z } from "zod"

const task = z.object({
  title: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      status: z.enum(["done", "running", "error"]),
    })
  ),
})

export type Task = z.infer<typeof task>

// TanStack AI's messages have no data parts: the agent reports a task with a tool, each call the
// whole task as it stands.
const updateTask = toolDefinition({
  name: "updateTask",
  description: "Report a task and the status of its steps.",
  inputSchema: task.extend({ id: z.string() }),
  outputSchema: z.string(),
})

export const tools = clientTools(updateTask)

export type ChatMessage = UIMessage<typeof tools>

export type Part = ChatMessage["parts"][number]

export type Status = "running" | "error" | undefined
