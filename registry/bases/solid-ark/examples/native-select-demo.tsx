import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { page } from "../../../styles/page.styles"

export default function NativeSelectDemo() {
  return (
    <div sx={page.example}>
      <NativeSelect>
        <NativeSelectOption value="">Select status</NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
        <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
