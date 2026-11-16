import { defineTokens } from "@kirana-style/core"

/** The values the Kirana examples share: the same ones `theme.css` gives the other two. */
export const theme = defineTokens("theme", {
  surface: "light-dark(#ffffff, #18181b)",
  raised: "light-dark(#f4f4f5, #27272a)",
  ink: "light-dark(#18181b, #fafafa)",
  quiet: "light-dark(#71717a, #a1a1aa)",
  line: "light-dark(#e4e4e7, #3f3f46)",
  accent: "light-dark(#18181b, #fafafa)",
  onAccent: "light-dark(#fafafa, #18181b)",
  ring: "light-dark(#2563eb, #60a5fa)",
  danger: "light-dark(#dc2626, #f87171)",
})
