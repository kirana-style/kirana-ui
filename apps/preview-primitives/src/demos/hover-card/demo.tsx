import { HoverCard } from "@kirana-ui/react/hover-card"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"text" | "trigger" | "popup" | "name" | "handle" | "bio">
}) {
  return (
    <p {...s.text}>
      Reviewed by{" "}
      <HoverCard.Root delay={200} closeDelay={150}>
        <HoverCard.Trigger href="#ada" {...s.trigger}>
          @ada
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Positioner side="bottom" sideOffset={8}>
            <HoverCard.Popup {...s.popup}>
              <strong {...s.name}>Ada Lovelace</strong>
              <span {...s.handle}>@ada · joined in 2021</span>
              <span {...s.bio}>
                Writes the notes on the analytical engine. Reviews anything with
                a loop in it.
              </span>
            </HoverCard.Popup>
          </HoverCard.Positioner>
        </HoverCard.Portal>
      </HoverCard.Root>{" "}
      two days ago.
    </p>
  )
}
