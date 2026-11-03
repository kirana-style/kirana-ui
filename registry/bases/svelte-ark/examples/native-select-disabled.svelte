<script lang="ts">
  import { NativeSelect, NativeSelectOption } from "../ui/native-select"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <NativeSelect disabled>
    <NativeSelectOption value="">
      Disabled
    </NativeSelectOption>
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
    <NativeSelectOption value="blueberry">
      Blueberry
    </NativeSelectOption>
  </NativeSelect>
</div>
