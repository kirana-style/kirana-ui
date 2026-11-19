import { IconPlaceholder } from "../ui/icon-placeholder"
import { Badge } from "../ui/badge"
import { page } from "../../../styles/page.styles"

export default function BadgeLink() {
  return (
    <div sx={page.example}>
      <Badge
        asChild={(props) => (
          <a {...props()} href="#link">
            Open Link{" "}
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
              data-icon="inline-end"
            />
          </a>
        )}
      />
    </div>
  )
}
