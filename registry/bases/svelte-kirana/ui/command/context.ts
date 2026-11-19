import { getContext, setContext } from "svelte"

/** What a Command hands its items: where each one's `onSelect` is heard, by its value. */
export type CommandContext = {
  register: (value: () => string, select: () => void) => () => void
}

const KEY = Symbol("command")

export const setCommand = (context: CommandContext) => setContext(KEY, context)
export const useCommand = () => {
  const context = getContext<CommandContext | undefined>(KEY)
  if (!context) throw new Error("A command part must be used within a Command.")
  return context
}
