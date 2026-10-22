import { defineAppConfig } from "@workspace/vite-config"

// The demo deploys as the Cloudflare Worker `ui` (wrangler.jsonc), its page prerendered into the
// static files the Worker's assets serve.
export default defineAppConfig({ cloudflare: true, prerender: true })
