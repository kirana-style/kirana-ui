/**
 * `registry/core/design-script.ts` bundled on its own, written inline before the first paint (the
 * `design-script` plugin, vite.config.ts).
 */
declare module "virtual:design-script" {
  const script: string
  export default script
}
