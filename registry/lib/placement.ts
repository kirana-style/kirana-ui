/**
 * Where a popup sits against its trigger. shadcn/ui's popups take Base UI's `side`, `align` and
 * offsets on their content; Ark UI takes Zag's `positioning` on its root. The Vue, Svelte and Solid
 * contents take Base UI's props, and their root places the popup with `positioning()`. Reka UI's
 * contents take Radix's `side`, which has no logical sides (`physicalSide()`).
 */
export type Side =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "inline-start"
  | "inline-end"
export type Align = "start" | "center" | "end"

export type PlacementProps = {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

type Physical = "top" | "right" | "bottom" | "left"

/** The physical side for Base UI's `side`: `rtl` turns the logical sides. */
export function physicalSide(side: Side = "bottom", rtl = false): Physical {
  if (side === "inline-start") return rtl ? "right" : "left"
  if (side === "inline-end") return rtl ? "left" : "right"
  return side
}

/**
 * Zag's positioning for Base UI's placement. `arrow` is the size of the popup's arrow: Zag adds half
 * of it to the gap, which Base UI measures without it. `rtl` turns the logical sides.
 */
export function positioning(
  {
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
  }: PlacementProps,
  { arrow = 0, rtl = false }: { arrow?: number; rtl?: boolean } = {}
) {
  const physical = physicalSide(side, rtl)
  return {
    placement:
      align === "center"
        ? physical
        : (`${physical}-${align}` as `${Physical}-${"start" | "end"}`),
    gutter: sideOffset - arrow / 2,
    offset: { crossAxis: alignOffset },
  }
}
