import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { page } from "../../../styles/page.styles"

export default function NativeSelectInvalid() {
  return (
    <div sx={page.example}>
      <NativeSelect aria-invalid="true">
        <NativeSelectOption value="">Error state</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
