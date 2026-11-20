import type { ToolPart, ToolResultPart } from "./tools"

/** A step: a `searchWeb`, `readBuildLog` or `searchCode` call. */
export type StepPart = ToolPart

export type ResultPart = ToolResultPart

export type Status = "running" | "error" | undefined
