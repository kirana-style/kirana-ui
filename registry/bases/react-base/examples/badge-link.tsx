import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Badge } from "../ui/badge"
import { page } from "../../../styles/page.styles"

export default function BadgeAsLink() {
  return (
    <div sx={page.example}>
      <Badge render={<a href="#link" />}>
        Open Link{" "}
        <IconPlaceholder
          lucide="ArrowUpRightIcon"
          tabler="IconArrowUpRight"
          hugeicons="ArrowUpRightIcon"
          phosphor="ArrowUpRightIcon"
          remixicon="RiArrowRightUpLine"
          data-icon="inline-end"
        />
      </Badge>
    </div>
  )
}
