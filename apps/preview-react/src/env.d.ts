/// <reference types="vite/client" />

/**
 * `registry/core/preview-script.ts` bundled on its own, written inline before the first paint (the
 * `design-script` plugin, `@workspace/vite-config/preview`).
 */
declare module "virtual:design-script" {
  const script: string
  export default script
}
