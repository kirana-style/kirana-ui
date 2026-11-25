import { ProgressCircle } from "../ui/progress-circle"
import { page } from "../../../styles/page.styles"

export default function ProgressCircleIndeterminate() {
  return (
    <div sx={page.example}>
      <ProgressCircle value={null} aria-label="Loading" />
    </div>
  )
}
