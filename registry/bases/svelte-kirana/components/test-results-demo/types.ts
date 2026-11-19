import type { UIDataTypes, UIMessage } from "ai"

export type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runTests: {
      input: { command: string }
      output: { suites: { name: string; tests: Test[] }[] }
    }
  }
>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runTests" }
>
