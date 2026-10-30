import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  exampleAvatar: css({
    filter: "grayscale(100%)",
  }),
}

export default function AvatarBadgeIconExample() {
  return (
    <div sx={page.example}>
      <Avatar sx={styles.exampleAvatar}>
        <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
        <AvatarFallback>PP</AvatarFallback>
        <AvatarBadge>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
