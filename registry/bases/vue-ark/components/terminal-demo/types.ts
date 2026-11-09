import type { UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  {
    terminal: { output: string }
  },
  {
    runCommand: {
      input: { command: string }
      output: { exitCode: number }
    }
  }
>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runCommand" }
>
