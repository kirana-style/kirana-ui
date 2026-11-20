/**
 * Every example page on ui-sdk (Solid 2), and every chat demo on TanStack AI (`*-tanstack-ai`) and
 * helper demo (`*-helper-demo`), mounted as its preview page mounts it and every trigger it has
 * pressed: nothing may throw, and no press may submit a form. A chat demo then replays or sends its
 * conversation once and streams a while.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers } from "@workspace/vite-config/browser-page"

import { BASES, mountItem, settle } from "./page"

/** Whether `item` is a chat demo that streams: one on TanStack AI, or a helper demo. */
const isChat = (item: string) =>
  item.endsWith("-tanstack-ai") || item.endsWith("-helper-demo")

/** The button that starts a chat demo's conversation: Replay, Send message, Continue, or Send. */
function sendButton(container: HTMLElement) {
  return [...container.querySelectorAll("button")].find(
    (button) =>
      !button.disabled &&
      /^(Replay|Send message|Continue|Send)$/.test(
        button.textContent?.trim() ?? ""
      )
  )
}

for (const base of Object.keys(BASES) as (keyof typeof BASES)[]) {
  describe(base, () => {
    const examples = Object.keys(BASES[base]).filter(
      (item) => item.endsWith("-example") || isChat(item)
    )
    it.each(examples)("%s renders and every trigger works", async (item) => {
      const { container, errors } = await mountItem(base, item)
      expect(errors, "on mount").toEqual([])
      await pressTriggers(container, {
        page,
        userEvent,
        settle,
        check: (label) => expect(errors, label).toEqual([]),
      })
      // A demo that shows its whole conversation at rest has nothing to send.
      const send = isChat(item) ? sendButton(container) : undefined
      if (send) {
        send.dataset.testid = "send"
        await page.getByTestId("send").click()
        // A while of streaming, not its end: the demos script seconds of it.
        await new Promise((resolve) => setTimeout(resolve, 1500))
        // A helper demo's Send submits its form on purpose (`onSubmit` sends the next message).
        expect(
          errors.filter((error) => !error.startsWith("a form was submitted")),
          "streaming"
        ).toEqual([])
      }
    })
  })
}
