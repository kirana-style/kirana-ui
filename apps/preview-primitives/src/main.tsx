import { props } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { StrictMode } from "react"
import type { ComponentType } from "react"
import { createRoot } from "react-dom/client"

import { classes, raw } from "./styled.ts"
import type { Styles } from "./styled.ts"

type Demo = ComponentType<{ s: Styles<string> }>

// One chunk a demo and one a style of it: a page loads the one it shows.
const demos = import.meta.glob<{ default: Demo }>("./demos/*/demo.tsx")
const modules = import.meta.glob<{ default: Record<string, string> }>(
  "./demos/*/styles.module.css"
)
const tailwinds = import.meta.glob<{ default: Record<string, string> }>(
  "./demos/*/tailwind.ts"
)
const kiranas = import.meta.glob<{ default: Record<string, Sx> }>(
  "./demos/*/kirana.ts"
)

const query = new URLSearchParams(location.search)
const name = query.get("demo") ?? "collapsible"
const style = query.get("style") ?? "css"
const at = (file: string) => `./demos/${name}/${file}`

/** The props that style each part, in the style the page was asked for. */
async function styles(): Promise<Styles<string>> {
  if (style === "css") {
    await import("./theme.css")
    return classes((await modules[at("styles.module.css")]!()).default)
  }
  if (style === "tailwind") {
    await import("./tailwind.css")
    return classes((await tailwinds[at("tailwind.ts")]!()).default)
  }
  if (style === "kirana") {
    await Promise.all([
      import("./theme.css"),
      import("@kirana-style/core/stylesheet.css"),
    ])
    const handles = (await kiranas[at("kirana.ts")]!()).default
    return new Proxy(handles, {
      get: (all, part: string) => (all[part] ? props(all[part]) : {}),
    }) as unknown as Styles<string>
  }
  return raw
}

// The site's colour mode, which the frame's own `prefers-color-scheme` does not follow.
const mode = /(?:^|; )kirana-theme=(light|dark)/.exec(document.cookie)?.[1]
if (mode) document.documentElement.style.colorScheme = mode

const load = demos[at("demo.tsx")]
const root = document.getElementById("app")!
if (!load) root.textContent = `No demo is called "${name}".`
else {
  const [{ default: Demo }, s] = await Promise.all([load(), styles()])
  document.body.style.cssText =
    "margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box"
  createRoot(root).render(
    <StrictMode>
      <Demo s={s} />
    </StrictMode>
  )
}
