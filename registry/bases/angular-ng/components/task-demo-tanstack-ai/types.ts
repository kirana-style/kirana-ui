/** A task, as the `updateTask` call's input carries it with its `id`. */
export type Task = {
  title: string
  steps: { title: string; status: "done" | "running" | "error" }[]
}

export type Status = "running" | "error" | undefined
