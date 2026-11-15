import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { color } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  avatarWithBadgeAvatarBadge: css({
    backgroundColor: `light-dark(${color.green[600]}, ${color.green[800]})`,
  }),
}

export default function AvatarWithBadge() {
  return (
    <div sx={page.example}>
      <Avatar>
        <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge sx={styles.avatarWithBadgeAvatarBadge} />
      </Avatar>
    </div>
  )
}
