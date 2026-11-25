import { CopyButton } from "../ui/copy-button"
import { page } from "../../../styles/page.styles"

export default function CopyButtonText() {
  return (
    <div sx={page.example}>
      <CopyButton
        value="https://ui.kirana.style/docs/components/copy-button"
        variant="outline"
        size="sm"
        copiedLabel="Link copied"
      >
        Copy link
      </CopyButton>
    </div>
  )
}
