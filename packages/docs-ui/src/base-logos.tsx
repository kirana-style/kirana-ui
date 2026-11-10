/**
 * The bases' official marks, drawn in the text's colour: Base UI's and React Aria's as upstream's
 * `registry/bases.ts` has them, inline so they take `currentColor`; Ark UI's, Reka UI's and
 * ng-primitives' are their sites' icons, kept in `brands/` as the other logos are and drawn as images. The docs'
 * frameworks row and `/create`'s Get Code draw them from here.
 */
import type { ReactNode } from "react"

import type { Base } from "@workspace/registry/core/config"

import { BrandIcon } from "./brand-icon.tsx"
import type { SvglIcon } from "./brand-icon.tsx"
import arkLogo from "./brands/ark-ui.svg?url"
import ngLogo from "./brands/ng-primitives.svg?url"
import rekaLogo from "./brands/reka-ui.svg?url"

export const ARK_UI: SvglIcon = {
  title: "Ark UI",
  url: "https://ark-ui.com",
  route: arkLogo,
}
export const REKA_UI: SvglIcon = {
  title: "Reka UI",
  url: "https://reka-ui.com",
  route: rekaLogo,
}
export const NG_PRIMITIVES: SvglIcon = {
  title: "ng-primitives",
  url: "https://ng-primitives.com",
  route: ngLogo,
}

const IMAGES: Partial<Record<Base, SvglIcon>> = {
  ark: ARK_UI,
  reka: REKA_UI,
  ng: NG_PRIMITIVES,
}

const INLINE: Partial<Record<Base, ReactNode>> = {
  base: (
    <svg viewBox="0 0 17 24" width="100%" height="100%" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z"
      />
      <path
        fill="currentColor"
        d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z"
      />
    </svg>
  ),
  aria: (
    <svg
      viewBox="200 206 800 790"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z"
      />
    </svg>
  ),
}

/** A base's mark, sized by its container (an inline mark) or 1em square (an image). */
export function BaseLogo({
  base,
  scheme,
}: {
  base: Base
  scheme?: "light" | "dark"
}) {
  const inline = INLINE[base]
  if (inline) return <>{inline}</>
  const image = IMAGES[base]
  return image ? <BrandIcon icon={image} scheme={scheme} /> : null
}
