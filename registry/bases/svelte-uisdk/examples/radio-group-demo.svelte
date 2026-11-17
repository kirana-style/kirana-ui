<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Label } from "../ui/label"
  import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    fit: css({ width: "fit-content" }),
    row: css({ display: "flex", alignItems: "center", gap: space[3] }),
  }
</script>

<div sx={page.example}>
  <RadioGroup defaultValue="comfortable" sx={styles.fit}>
    <div sx={styles.row}>
      <RadioGroupItem value="default" id="r1" />
      <Label for="r1">
        Default
      </Label>
    </div>
    <div sx={styles.row}>
      <RadioGroupItem value="comfortable" id="r2" />
      <Label for="r2">
        Comfortable
      </Label>
    </div>
    <div sx={styles.row}>
      <RadioGroupItem value="compact" id="r3" />
      <Label for="r3">
        Compact
      </Label>
    </div>
  </RadioGroup>
</div>
