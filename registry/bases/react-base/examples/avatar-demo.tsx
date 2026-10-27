import { css } from "@kirana-style/core"

import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"

const styles = {
  row: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { base: space[6], [breakpoint.md]: space[12] },
  }),
  grayscale: css({ filter: "grayscale(100%)" }),
  // `bg-green-600 dark:bg-green-800`.
  online: css({
    backgroundColor:
      "light-dark(oklch(0.627 0.194 149.214), oklch(0.448 0.119 151.328))",
  }),
}

export default function AvatarDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.row}>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            sx={styles.grayscale}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
          <AvatarBadge sx={styles.online} />
        </Avatar>
        <AvatarGroup sx={styles.grayscale}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </div>
  )
}
