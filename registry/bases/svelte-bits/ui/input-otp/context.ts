import type { PinInputCell } from "bits-ui"

/** The cells Bits UI's root draws its slots from, read by each slot by its index. */
export const CELLS = Symbol("input-otp-cells")
export type CellsContext = () => PinInputCell[]
