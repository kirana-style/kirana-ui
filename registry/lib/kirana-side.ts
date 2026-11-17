/**
 * Base UI's sides on Kirana UI Primitives' Positioners, which take the physical four only (PF-016):
 * `inline-start` and `inline-end` turned by the reading direction the nearest `DirectionProvider`
 * states. Remove with the release that takes logical sides.
 */
import { useDirection } from "@kirana-ui/react/direction"

import { physicalSide } from "./placement"
import type { Side } from "./placement"

/** `side` as a physical side, in the reading direction of where it is drawn. */
export function useSide(side: Side | undefined) {
  return physicalSide(side, useDirection() === "rtl")
}
