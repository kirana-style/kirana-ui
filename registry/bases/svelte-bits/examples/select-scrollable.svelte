<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    wFullMaxW64: css({ width: { "*": null, base: "100%" }, maxWidth: space[64] }),
  }

  const northAmerica = [
    { label: "Eastern Standard Time", value: "est" },
    { label: "Central Standard Time", value: "cst" },
    { label: "Mountain Standard Time", value: "mst" },
    { label: "Pacific Standard Time", value: "pst" },
    { label: "Alaska Standard Time", value: "akst" },
    { label: "Hawaii Standard Time", value: "hst" },
  ]

  const europeAfrica = [
    { label: "Greenwich Mean Time", value: "gmt" },
    { label: "Central European Time", value: "cet" },
    { label: "Eastern European Time", value: "eet" },
    { label: "Western European Summer Time", value: "west" },
    { label: "Central Africa Time", value: "cat" },
    { label: "East Africa Time", value: "eat" },
  ]

  const asia = [
    { label: "Moscow Time", value: "msk" },
    { label: "India Standard Time", value: "ist" },
    { label: "China Standard Time", value: "cst_china" },
    { label: "Japan Standard Time", value: "jst" },
    { label: "Korea Standard Time", value: "kst" },
    { label: "Indonesia Central Standard Time", value: "ist_indonesia" },
  ]

  const australiaPacific = [
    { label: "Australian Western Standard Time", value: "awst" },
    { label: "Australian Central Standard Time", value: "acst" },
    { label: "Australian Eastern Standard Time", value: "aest" },
    { label: "New Zealand Standard Time", value: "nzst" },
    { label: "Fiji Time", value: "fjt" },
  ]

  const southAmerica = [
    { label: "Argentina Time", value: "art" },
    { label: "Bolivia Time", value: "bot" },
    { label: "Brasilia Time", value: "brt" },
    { label: "Chile Standard Time", value: "clt" },
  ]

  const items = [
    { label: "Select a timezone", value: null },
    ...northAmerica,
    ...europeAfrica,
    ...asia,
    ...australiaPacific,
    ...southAmerica,
  ]
</script>

<div sx={page.example}>
  <Select items={items}>
    <SelectTrigger sx={styles.wFullMaxW64}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          North America
        </SelectLabel>
        {#each northAmerica as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>
          Europe & Africa
        </SelectLabel>
        {#each europeAfrica as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>
          Asia
        </SelectLabel>
        {#each asia as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>
          Australia & Pacific
        </SelectLabel>
        {#each australiaPacific as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>
          South America
        </SelectLabel>
        {#each southAmerica as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
