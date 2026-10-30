import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  exampleDiv: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    filter: "grayscale(100%)",
  }),
}

export default function AvatarSizeExample() {
  return (
    <div sx={page.example}>
      <div sx={styles.exampleDiv}>
        <Avatar size="sm">
          <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
