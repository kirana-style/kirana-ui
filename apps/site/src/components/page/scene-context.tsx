/**
 * The scene the page stands in, as the Kirana site's `scene-context.tsx`: `Page` names it once,
 * and the hero's picture, the page's hue and the footer's landscape follow from it.
 */
import { createContext, useContext } from "react"

import type { SceneId } from "@/components/header/nav"

const SceneContext = createContext<SceneId>("heritage-street")

export const SceneProvider = SceneContext.Provider

export function useScene(): SceneId {
  return useContext(SceneContext)
}
