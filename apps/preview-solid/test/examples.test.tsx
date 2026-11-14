/**
 * Every example page on Ark UI, mounted as its preview page mounts it and every trigger it has
 * pressed: nothing may throw, and no press may submit a form.
 */
import { expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers } from "@workspace/vite-config/browser-page"

import { mountItem, previews, settle } from "./page"

const examples = Object.keys(previews).filter((item) =>
  item.endsWith("-example")
)

it.each(examples)("%s renders and every trigger works", async (item) => {
  const { container, errors } = await mountItem(item)
  expect(errors, "on mount").toEqual([])
  await pressTriggers(container, {
    page,
    userEvent,
    settle,
    check: (label) => expect(errors, label).toEqual([]),
  })
})
