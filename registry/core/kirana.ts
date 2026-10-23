/**
 * What every app compiling the registry tells Kirana, spread into its `kirana.config.ts`.
 *
 * `conditions.exclusive` lists states that never hold together on one element, so a property set
 * differently under each is not `ambiguous-precedence`: each vocabulary's own pairs (open and
 * closed …), and the same state as different bases write it, since a component is built on one base
 * and only that base's attributes appear on it (`states.ts`).
 */
import * as Base from "@kirana-style/states/base-ui"
import * as Aria from "@kirana-style/states/react-aria"
import * as Ark from "@kirana-style/states/ark-ui"
import type { KiranaConfig } from "@kirana-style/core/config"

// With its extension: the configuration is loaded by Node, not the bundler (KF-016).
import { overlay } from "./states.ts"

export const registryConfig = {
  conditions: {
    exclusive: [
      ...Base.exclusive,
      ...Aria.exclusive,
      ...Ark.exclusive,
      // Listed by hand until `@kirana-style/states` can say it (KF-015 in Kirana's feedback log).
      [overlay.starting.base, overlay.starting.aria],
      [overlay.ending.base, overlay.ending.aria],
    ],
  },
} satisfies KiranaConfig
