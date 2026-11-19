/**
 * `sx` on Solid 2's elements: Solid 2's JSX namespace is `@solidjs/web`'s, which
 * `@kirana-style/core/solid` does not augment yet (KF-127), so this does what it does for Solid 1.
 */
import type { Sx } from "@kirana-style/core"

declare module "@solidjs/web/jsx-runtime" {
  namespace JSX {
    // oxlint-disable-next-line no-unused-vars -- `T` must match Solid's declaration.
    interface ElementAttributes<T> {
      sx?: Sx
    }
  }
}

declare module "@kirana-style/core" {
  // `props()` returns `{ class, style }` on Solid (KF-047).
  interface Register {
    classAttribute: "class"
  }
}
