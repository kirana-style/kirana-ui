import type { UIMessage } from "@tanstack/ai-svelte"

export type Part = UIMessage["parts"][number]

export type ToolResultPart = Extract<Part, { type: "tool-result" }>

type ToolCall<NAME extends string, INPUT, OUTPUT> = Omit<
  Extract<Part, { type: "tool-call" }>,
  "name" | "input" | "output"
> & { name: NAME; input?: INPUT; output?: OUTPUT }

/** The research tools' calls: TanStack AI types a call by its tool's schemas, so this names them by hand. */
export type StepPart =
  | ToolCall<
      "searchWeb",
      { query: string },
      { results: { title: string; url: string }[] }
    >
  | ToolCall<"readBuildLog", { deployment: string }, { log: string }>
  | ToolCall<"searchCode", { query: string }, { files: string[] }>

export const isStep = (part: Part): part is StepPart =>
  part.type === "tool-call" &&
  (part.name === "searchWeb" ||
    part.name === "readBuildLog" ||
    part.name === "searchCode")

/** The result TanStack AI adds beside a call, which carries its error. */
export const resultOf = (message: UIMessage, toolCallId: string) =>
  message.parts.find(
    (part): part is ToolResultPart =>
      part.type === "tool-result" && part.toolCallId === toolCallId
  )

export type Status = "running" | "error" | undefined
