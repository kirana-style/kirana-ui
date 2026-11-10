/** A progress's value and maximum, for its parts: Bits UI's progress is one element. */
export const PROGRESS = Symbol("progress")

export type ProgressContext = () => { value: number | null; max: number }
