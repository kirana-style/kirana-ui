"use client"

import { createContext, use } from "react"
import type { ReactNode } from "react"

/**
 * Base UI's DirectionProvider and `useDirection`, which ui-sdk has no part for: its components read
 * the direction the element is laid out in (`dir`), so the provider only answers `useDirection`
 * for the parts and examples that ask.
 */
type TextDirection = "ltr" | "rtl"

const Direction = createContext<TextDirection>("ltr")

function DirectionProvider({
  direction = "ltr",
  children,
}: {
  direction?: TextDirection
  children?: ReactNode
}) {
  return <Direction value={direction}>{children}</Direction>
}

function useDirection(): TextDirection {
  return use(Direction)
}

export { DirectionProvider, useDirection }
