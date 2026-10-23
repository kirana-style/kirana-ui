/**
 * The style prop every component takes in place of `className`: Kirana handles, arrays of them, or
 * nothing. On an element the compiler turns `sx` into `className` (and `style` for runtime values);
 * on a component it is a prop passed on to the root, last, so the caller's styles win. A part from
 * an installed package (Base UI, React Aria) does not read it: spread `{...props(…, sx)}` there.
 */
import type { Sx } from "@kirana-style/core"
import type {} from "@kirana-style/core/react"

export type { Sx }

/** A component's props with `sx` in place of `className`. */
export type WithSx<P> = Omit<P, "className"> & { sx?: Sx }
