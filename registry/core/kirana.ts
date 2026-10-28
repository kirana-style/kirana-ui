/**
 * What every app compiling the registry tells Kirana, spread into its `kirana.config.ts`.
 *
 * States that never hold together on one element, so a property set differently under each is not
 * `ambiguous-precedence`: each vocabulary's own pairs (open and closed …) in `exclusive`, and in
 * `exclusiveAcross` one vocabulary per base, since a component is built on one base and only that
 * base's attributes appear on it (`states.ts`): Base UI's `[data-starting-style]` and React Aria's
 * `[data-entering]` never meet.
 */
import { exclusiveAcross } from "@kirana-style/states"
import * as Base from "@kirana-style/states/base-ui"
import * as Aria from "@kirana-style/states/react-aria"
import * as Ark from "@kirana-style/states/ark-ui"
import type { KiranaConfig } from "@kirana-style/core/config"

// A type, which Node erases: the configuration still loads no module of its own.
import type { StateKeys } from "./states"

/**
 * A separator's direction. React Aria writes `aria-orientation`, and draws a horizontal one as an
 * `<hr>` with none (`:is(hr)`, in `separator.styles.ts`); `@kirana-style/states` has no keys for it.
 * Here rather than in `states.ts`, which re-exports it, so the configuration imports no module of
 * its own: Node loads it, where a relative import needs its `.ts` extension, which a project's
 * type checker refuses without `allowImportingTsExtensions`.
 */
export const orientation = {
  horizontal: {
    base: Base.Separator.orientation.horizontal,
    aria: '[aria-orientation="horizontal"]',
  },
  vertical: {
    base: Base.Separator.orientation.vertical,
    aria: '[aria-orientation="vertical"]',
  },
} as const satisfies Record<string, StateKeys>

export const registryConfig = {
  conditions: {
    exclusive: [
      ...Base.exclusive,
      ...Aria.exclusive,
      ...Ark.exclusive,
      // React Aria's separator writes `aria-orientation`, which no vocabulary names (`orientation`).
      [orientation.horizontal.base, orientation.vertical.aria],
      [orientation.vertical.base, orientation.horizontal.aria],
      [orientation.horizontal.aria, orientation.vertical.aria],
      // Upstream marks Base UI's invalid checkbox with `aria-invalid`, which no vocabulary names,
      // and React Aria's checkbox is a label that never carries it (`check`, in `states.ts`).
      ['[aria-invalid="true"]', Aria.Checkbox.focusVisible],
    ],
    exclusiveAcross: exclusiveAcross(Base, Aria, Ark),
  },
} satisfies KiranaConfig

/**
 * `registryConfig` with the reset and typeset underneath every Kirana rule: what `kirana-style ui
 * init` spreads into a project's `kirana.config.ts`, beside the reset it imports. `typeset` is the
 * layer of `typeset.css` (the `typeset` item), so an element's own `sx` beats it; a project without
 * it declares an empty layer.
 */
export const installConfig = {
  ...registryConfig,
  layers: { before: ["reset", "typeset"] },
} satisfies KiranaConfig
