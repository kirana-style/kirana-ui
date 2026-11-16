import { Avatar } from "@kirana-ui/react/avatar"

import type { Styles } from "../../styled.ts"

// A small picture, inline: a head and shoulders.
const PORTRAIT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23fcd34d'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%2378350f'/%3E%3Cpath d='M6 40a14 14 0 0 1 28 0z' fill='%2378350f'/%3E%3C/svg%3E"

export default function Demo({
  s,
}: {
  s: Styles<"group" | "root" | "image" | "fallback">
}) {
  return (
    <div {...s.group}>
      <Avatar.Root {...s.root}>
        <Avatar.Image src={PORTRAIT} alt="Ada Lovelace" {...s.image} />
        <Avatar.Fallback {...s.fallback}>AL</Avatar.Fallback>
      </Avatar.Root>
      {/* No picture: the fallback stays. */}
      <Avatar.Root {...s.root}>
        <Avatar.Image alt="Grace Hopper" {...s.image} />
        <Avatar.Fallback {...s.fallback}>GH</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
