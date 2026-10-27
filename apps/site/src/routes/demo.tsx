import { Demo } from "@/components/demo"
import appCss from "@workspace/ui/globals.css?url"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Toaster } from "@workspace/ui/components/toast"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { createFileRoute } from "@tanstack/react-router"

/** The demo of `packages/ui`, the components the apps were first built from, until they retire. */
export const Route = createFileRoute("/demo")({
  // The demo's reset and element styles; the site's pages load the registry's instead.
  head: () => ({ links: [{ rel: "stylesheet", href: appCss }] }),
  component: App,
})

/** The demo's providers are its own, so no other page downloads them. */
function App() {
  return (
    <DirectionProvider direction="ltr">
      <TooltipProvider>
        <Demo />
      </TooltipProvider>
      <Toaster />
    </DirectionProvider>
  )
}
