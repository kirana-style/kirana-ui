"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import { Badge } from "../../../ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  card: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  avatar: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
  a: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
}

// GitHub usernames displayed as contributor avatars.
const usernames = [
  "shadcn",
  "vercel",
  "nextjs",
  "tailwindlabs",
  "typescript-lang",
  "eslint",
  "prettier",
  "babel",
  "webpack",
  "rollup",
  "parcel",
  "vite",
  "react",
  "vue",
  "angular",
  "solid",
]

export function Contributors() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle>
          Contributors <Badge variant="secondary">312</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div sx={styles.div}>
          {usernames.map((username) => (
            <Avatar key={username} sx={styles.avatar}>
              <AvatarImage
                src={`https://github.com/${username}.png`}
                alt={username}
              />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <a href="#" sx={styles.a}>
          + 810 contributors
        </a>
      </CardFooter>
    </Card>
  )
}
