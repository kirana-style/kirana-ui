import { inject } from "vue"
import type { InjectionKey } from "vue"

/** What a Command hands its items: where each one's `select` is heard, by its value. */
export type CommandContext = {
  register: (value: () => string, select: () => void) => () => void
}

export const COMMAND: InjectionKey<CommandContext> = Symbol("command")

export function useCommand() {
  const context = inject(COMMAND)
  if (!context) throw new Error("A command part must be used within a Command.")
  return context
}
