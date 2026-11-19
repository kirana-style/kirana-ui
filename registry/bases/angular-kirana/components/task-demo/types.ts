import type { UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  {
    task: {
      title: string
      steps: { title: string; status: "done" | "running" | "error" }[]
    }
  }
>

export type TaskPart = Extract<
  ChatMessage["parts"][number],
  { type: "data-task" }
>

export type Status = "running" | "error" | undefined
