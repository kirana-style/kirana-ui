import { props } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { StrictMode } from "react"
import type { ComponentType } from "react"
import { createRoot } from "react-dom/client"

import { classes, raw } from "./styled.ts"
import type { Styles } from "./styled.ts"

type Demo = ComponentType<{ s: Styles<string> }>
type Load<Module> = () => Promise<{ default: Module }>

/**
 * A folder of demos' files, by demo: a `Map`, so a name from the address finds only a file that
 * exists, never something an object inherits.
 */
const byDemo = <Module,>(files: Record<string, Load<Module>>) =>
  new Map(
    Object.entries(files).map(([path, load]) => [
      path.split("/")[2] ?? "",
      load,
    ])
  )

// One chunk a demo and one a style of it: a page loads the one it shows.
const demos = byDemo(import.meta.glob<{ default: Demo }>("./demos/*/demo.tsx"))
const modules = byDemo(
  import.meta.glob<{ default: Record<string, string> }>(
    "./demos/*/styles.module.css"
  )
)
const tailwinds = byDemo(
  import.meta.glob<{ default: Record<string, string> }>("./demos/*/tailwind.ts")
)
const kiranas = byDemo(
  import.meta.glob<{ default: Record<string, Sx> }>("./demos/*/kirana.ts")
)

const query = new URLSearchParams(location.search)
const name = query.get("demo") ?? "collapsible"
const style = query.get("style") ?? "css"

/** A demo's file of one kind, loaded: the page's demo is known to have one before this is asked. */
async function file<Module>(files: Map<string, Load<Module>>): Promise<Module> {
  const load = files.get(name)
  if (typeof load !== "function") throw new Error(`"${name}" has no such file`)
  return (await load()).default
}

/** The props that style each part, in the style the page was asked for. */
async function styles(): Promise<Styles<string>> {
  if (style === "css") {
    await import("./theme.css")
    return classes(await file(modules))
  }
  if (style === "tailwind") {
    await import("./tailwind.css")
    return classes(await file(tailwinds))
  }
  if (style === "kirana") {
    await Promise.all([
      import("./theme.css"),
      import("@kirana-style/core/stylesheet.css"),
    ])
    const handles = new Map(Object.entries(await file(kiranas)))
    return new Proxy(
      {},
      {
        get(_all, part) {
          const handle =
            typeof part === "string" ? handles.get(part) : undefined
          return handle ? props(handle) : {}
        },
      }
    ) as Styles<string>
  }
  return raw
}

// The site's colour mode, which the frame's own `prefers-color-scheme` does not follow.
const mode = /(?:^|; )kirana-theme=(light|dark)/.exec(document.cookie)?.[1]
if (mode) document.documentElement.style.colorScheme = mode

const root = document.getElementById("app")!
if (!demos.has(name)) root.textContent = "No demo has that name."
else {
  const [Demo, s] = await Promise.all([file(demos), styles()])
  document.body.style.cssText =
    "margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box"
  createRoot(root).render(
    <StrictMode>
      <Demo s={s} />
    </StrictMode>
  )
}
