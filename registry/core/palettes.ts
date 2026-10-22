/**
 * The colours behind the colour axes, each a `light-dark(<light>, <dark>)` pair (one value when
 * both modes agree), ported from shadcn/ui's `apps/v4/registry/themes.ts` (MIT) at commit
 * `25af02b`. The keys are the semantic tokens' names (`tokens.ts`): shadcn/ui's custom properties
 * in camel case (`--card-foreground` is `cardForeground`).
 *
 * shadcn/ui merges a base colour's 32 properties, then the theme's, then the chart colour's
 * `chart-1` to `chart-5`. The three never set the same token, so each axis owns a disjoint group:
 *
 * - a **base colour** owns the 20 neutral tokens (`baseColors`);
 * - a **theme** owns the 6 accent tokens a hue changes (`themeColors`); a theme that is a base
 *   colour gives that base colour's own;
 * - a **chart colour** owns the 5 chart tokens (`chartColors`).
 *
 * The radius every base colour sets (0.625rem) is the radius axis's default (`config.ts`).
 *
 * P1 carries the slice: the base colours Neutral and Stone, the themes and chart colours Neutral,
 * Stone, Blue and Rose. The others follow in P2.
 */

export const baseColors = {
  neutral: {
    background: "light-dark(oklch(1 0 0), oklch(0.145 0 0))",
    foreground: "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
    card: "light-dark(oklch(1 0 0), oklch(0.205 0 0))",
    cardForeground: "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
    popover: "light-dark(oklch(1 0 0), oklch(0.205 0 0))",
    popoverForeground: "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
    muted: "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))",
    mutedForeground: "light-dark(oklch(0.556 0 0), oklch(0.708 0 0))",
    accent: "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))",
    accentForeground: "light-dark(oklch(0.205 0 0), oklch(0.985 0 0))",
    destructive:
      "light-dark(oklch(0.577 0.245 27.325), oklch(0.704 0.191 22.216))",
    border: "light-dark(oklch(0.922 0 0), oklch(1 0 0 / 10%))",
    input: "light-dark(oklch(0.922 0 0), oklch(1 0 0 / 15%))",
    ring: "light-dark(oklch(0.708 0 0), oklch(0.556 0 0))",
    sidebar: "light-dark(oklch(0.985 0 0), oklch(0.205 0 0))",
    sidebarForeground: "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
    sidebarAccent: "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))",
    sidebarAccentForeground: "light-dark(oklch(0.205 0 0), oklch(0.985 0 0))",
    sidebarBorder: "light-dark(oklch(0.922 0 0), oklch(1 0 0 / 10%))",
    sidebarRing: "light-dark(oklch(0.708 0 0), oklch(0.556 0 0))",
  },
  stone: {
    background: "light-dark(oklch(1 0 0), oklch(0.147 0.004 49.25))",
    foreground:
      "light-dark(oklch(0.147 0.004 49.25), oklch(0.985 0.001 106.423))",
    card: "light-dark(oklch(1 0 0), oklch(0.216 0.006 56.043))",
    cardForeground:
      "light-dark(oklch(0.147 0.004 49.25), oklch(0.985 0.001 106.423))",
    popover: "light-dark(oklch(1 0 0), oklch(0.216 0.006 56.043))",
    popoverForeground:
      "light-dark(oklch(0.147 0.004 49.25), oklch(0.985 0.001 106.423))",
    muted: "light-dark(oklch(0.97 0.001 106.424), oklch(0.268 0.007 34.298))",
    mutedForeground:
      "light-dark(oklch(0.553 0.013 58.071), oklch(0.709 0.01 56.259))",
    accent: "light-dark(oklch(0.97 0.001 106.424), oklch(0.268 0.007 34.298))",
    accentForeground:
      "light-dark(oklch(0.216 0.006 56.043), oklch(0.985 0.001 106.423))",
    destructive:
      "light-dark(oklch(0.577 0.245 27.325), oklch(0.704 0.191 22.216))",
    border: "light-dark(oklch(0.923 0.003 48.717), oklch(1 0 0 / 10%))",
    input: "light-dark(oklch(0.923 0.003 48.717), oklch(1 0 0 / 15%))",
    ring: "light-dark(oklch(0.709 0.01 56.259), oklch(0.553 0.013 58.071))",
    sidebar:
      "light-dark(oklch(0.985 0.001 106.423), oklch(0.216 0.006 56.043))",
    sidebarForeground:
      "light-dark(oklch(0.147 0.004 49.25), oklch(0.985 0.001 106.423))",
    sidebarAccent:
      "light-dark(oklch(0.97 0.001 106.424), oklch(0.268 0.007 34.298))",
    sidebarAccentForeground:
      "light-dark(oklch(0.216 0.006 56.043), oklch(0.985 0.001 106.423))",
    sidebarBorder: "light-dark(oklch(0.923 0.003 48.717), oklch(1 0 0 / 10%))",
    sidebarRing:
      "light-dark(oklch(0.709 0.01 56.259), oklch(0.553 0.013 58.071))",
  },
} as const

export const themeColors = {
  neutral: {
    primary: "light-dark(oklch(0.205 0 0), oklch(0.922 0 0))",
    primaryForeground: "light-dark(oklch(0.985 0 0), oklch(0.205 0 0))",
    secondary: "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))",
    secondaryForeground: "light-dark(oklch(0.205 0 0), oklch(0.985 0 0))",
    sidebarPrimary: "light-dark(oklch(0.205 0 0), oklch(0.488 0.243 264.376))",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
  },
  stone: {
    primary: "light-dark(oklch(0.216 0.006 56.043), oklch(0.923 0.003 48.717))",
    primaryForeground:
      "light-dark(oklch(0.985 0.001 106.423), oklch(0.216 0.006 56.043))",
    secondary:
      "light-dark(oklch(0.97 0.001 106.424), oklch(0.268 0.007 34.298))",
    secondaryForeground:
      "light-dark(oklch(0.216 0.006 56.043), oklch(0.985 0.001 106.423))",
    sidebarPrimary:
      "light-dark(oklch(0.216 0.006 56.043), oklch(0.488 0.243 264.376))",
    sidebarPrimaryForeground: "oklch(0.985 0.001 106.423)",
  },
  blue: {
    primary:
      "light-dark(oklch(0.488 0.243 264.376), oklch(0.424 0.199 265.638))",
    primaryForeground: "oklch(0.97 0.014 254.604)",
    secondary:
      "light-dark(oklch(0.967 0.001 286.375), oklch(0.274 0.006 286.033))",
    secondaryForeground:
      "light-dark(oklch(0.21 0.006 285.885), oklch(0.985 0 0))",
    sidebarPrimary:
      "light-dark(oklch(0.546 0.245 262.881), oklch(0.623 0.214 259.815))",
    sidebarPrimaryForeground: "oklch(0.97 0.014 254.604)",
  },
  rose: {
    primary: "light-dark(oklch(0.514 0.222 16.935), oklch(0.455 0.188 13.697))",
    primaryForeground: "oklch(0.969 0.015 12.422)",
    secondary:
      "light-dark(oklch(0.967 0.001 286.375), oklch(0.274 0.006 286.033))",
    secondaryForeground:
      "light-dark(oklch(0.21 0.006 285.885), oklch(0.985 0 0))",
    sidebarPrimary:
      "light-dark(oklch(0.586 0.253 17.585), oklch(0.645 0.246 16.439))",
    sidebarPrimaryForeground: "oklch(0.969 0.015 12.422)",
  },
} as const

export const chartColors = {
  neutral: {
    chart1: "oklch(0.87 0 0)",
    chart2: "oklch(0.556 0 0)",
    chart3: "oklch(0.439 0 0)",
    chart4: "oklch(0.371 0 0)",
    chart5: "oklch(0.269 0 0)",
  },
  stone: {
    chart1: "oklch(0.869 0.005 56.366)",
    chart2: "oklch(0.553 0.013 58.071)",
    chart3: "oklch(0.444 0.011 73.639)",
    chart4: "oklch(0.374 0.01 67.558)",
    chart5: "oklch(0.268 0.007 34.298)",
  },
  blue: {
    chart1: "oklch(0.809 0.105 251.813)",
    chart2: "oklch(0.623 0.214 259.815)",
    chart3: "oklch(0.546 0.245 262.881)",
    chart4: "oklch(0.488 0.243 264.376)",
    chart5: "oklch(0.424 0.199 265.638)",
  },
  rose: {
    chart1: "oklch(0.81 0.117 11.638)",
    chart2: "oklch(0.645 0.246 16.439)",
    chart3: "oklch(0.586 0.253 17.585)",
    chart4: "oklch(0.514 0.222 16.935)",
    chart5: "oklch(0.455 0.188 13.697)",
  },
} as const
