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

// With its extension: the configuration is loaded by Node, not the bundler.
import { orientation } from "./states.ts"

export const registryConfig = {
  conditions: {
    exclusive: [
      ...Base.exclusive,
      ...Aria.exclusive,
      ...Ark.exclusive,
      // React Aria's separator writes `aria-orientation`, which no vocabulary names (`states.ts`).
      [orientation.horizontal.base, orientation.vertical.aria],
      [orientation.vertical.base, orientation.horizontal.aria],
      [orientation.horizontal.aria, orientation.vertical.aria],
    ],
    exclusiveAcross: exclusiveAcross(Base, Aria, Ark),
  },
} satisfies KiranaConfig

/**
 * `registryConfig` with the reset underneath every Kirana rule: what `kirana-style ui init` spreads
 * into a project's `kirana.config.ts`, beside the reset it imports.
 */
export const installConfig = {
  ...registryConfig,
  layers: { before: ["reset"] },
} satisfies KiranaConfig
