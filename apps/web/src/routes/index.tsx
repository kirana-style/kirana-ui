import { Demo } from "@/components/demo"
import appCss from "@workspace/ui/globals.css?url"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  // The demo's reset and element styles; a preview page loads the registry's instead.
  head: () => ({ links: [{ rel: "stylesheet", href: appCss }] }),
  component: App,
})

function App() {
  return <Demo />
}
