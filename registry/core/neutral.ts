/**
 * The default design's colours, Neutral's, which `tokens.ts` declares the colour tokens with: a base
 * colour's 20 neutral tokens, a theme's 6 accent tokens and a chart colour's 5, each a
 * `light-dark(<light>, <dark>)` pair (one value when both modes agree). From shadcn/ui's
 * `apps/v4/registry/themes.ts` (MIT) at commit `96da9cc`; generated, do not edit.
 */
export const neutral = {
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
  primary: "light-dark(oklch(0.205 0 0), oklch(0.922 0 0))",
  primaryForeground: "light-dark(oklch(0.985 0 0), oklch(0.205 0 0))",
  secondary: "light-dark(oklch(0.97 0 0), oklch(0.269 0 0))",
  secondaryForeground: "light-dark(oklch(0.205 0 0), oklch(0.985 0 0))",
  sidebarPrimary: "light-dark(oklch(0.205 0 0), oklch(0.488 0.243 264.376))",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  chart1: "oklch(0.87 0 0)",
  chart2: "oklch(0.556 0 0)",
  chart3: "oklch(0.439 0 0)",
  chart4: "oklch(0.371 0 0)",
  chart5: "oklch(0.269 0 0)",
} as const
