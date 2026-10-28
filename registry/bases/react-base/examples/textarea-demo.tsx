import { page } from "../../../styles/page.styles"
import { Textarea } from "../ui/textarea"

export default function TextareaDemo() {
  return (
    <div sx={page.example}>
      <Textarea sx={page.narrow} placeholder="Type your message here." />
    </div>
  )
}
