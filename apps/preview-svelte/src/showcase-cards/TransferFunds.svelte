<script lang="ts">
  import IconPlaceholder from "@workspace/registry/icons/IconPlaceholder.svelte"
  import { Button } from "@workspace/registry/bases/svelte-ark/ui/button/index.ts"
  import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@workspace/registry/bases/svelte-ark/ui/card/index.ts"
  import {
    Field,
    FieldGroup,
    FieldLabel,
  } from "@workspace/registry/bases/svelte-ark/ui/field/index.ts"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from "@workspace/registry/bases/svelte-ark/ui/input-group/index.ts"
  import { Item, ItemContent } from "@workspace/registry/bases/svelte-ark/ui/item/index.ts"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@workspace/registry/bases/svelte-ark/ui/select/index.ts"
  import { Separator } from "@workspace/registry/bases/svelte-ark/ui/separator/index.ts"
  import { css } from "@kirana-style/core"
  import { theme } from "@workspace/registry/core/tokens"
  import {
    fontSize,
    fontWeight,
    lineHeight,
    space,
  } from "@workspace/registry/core/scales"

  const styles = {
    button: css({
      backgroundColor: theme.muted,
    }),
    selectTrigger: css({
      width: { "*": null, base: "100%" },
    }),
    selectTrigger2: css({
      width: { "*": null, base: "100%" },
    }),
    item: css({
      flexDirection: { "*": null, base: "column" },
      alignItems: { "*": null, base: "stretch" },
    }),
    itemContent: css({
      gap: { "*": null, base: space[3] },
    }),
    div: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    span: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: theme.mutedForeground,
    }),
    span2: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
    }),
    div2: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    span3: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: theme.mutedForeground,
    }),
    span4: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
      fontVariantNumeric: "tabular-nums",
    }),
    div3: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    span5: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
    }),
    span6: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.semibold,
      fontVariantNumeric: "tabular-nums",
    }),
    button2: css({
      width: { "*": null, base: "100%" },
    }),
  }

  const FROM_ACCOUNTS = [
    { label: "Main Checking (··8402) — $12,450.00", value: "checking" },
    { label: "Business (··7731) — $8,920.00", value: "business" },
  ]

  const TO_ACCOUNTS = [
    { label: "High Yield Savings (··1192) — $42,100.00", value: "savings" },
    { label: "Investment (··3349) — $18,200.00", value: "investment" },
  ]
</script>

<Card>
  <CardHeader>
    <CardTitle>
      Transfer Funds
    </CardTitle>
    <CardDescription>
      Move money between your connected accounts.
    </CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm" sx={styles.button} aria-label="Dismiss transfer funds">
        <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <FieldGroup>
      <Field>
        <FieldLabel for="transfer-amount">
          Amount to Transfer
        </FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>
              $
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="transfer-amount" defaultValue="1,200.00" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel for="from-account">
          From Account
        </FieldLabel>
        <Select items={FROM_ACCOUNTS} defaultValue="checking">
          <SelectTrigger id="from-account" sx={styles.selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {#each FROM_ACCOUNTS as item (item.value)}
                <SelectItem value={item.value}>
                  {item.label}
                </SelectItem>
              {/each}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel for="to-account">
          To Account
        </FieldLabel>
        <Select items={TO_ACCOUNTS} defaultValue="savings">
          <SelectTrigger id="to-account" sx={styles.selectTrigger2}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {#each TO_ACCOUNTS as item (item.value)}
                <SelectItem value={item.value}>
                  {item.label}
                </SelectItem>
              {/each}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Item variant="muted" sx={styles.item}>
        <ItemContent sx={styles.itemContent}>
          <div sx={styles.div}>
            <span sx={styles.span}>
              Estimated arrival
            </span>
            <span sx={styles.span2}>
              Today, Apr 14
            </span>
          </div>
          <Separator />
          <div sx={styles.div2}>
            <span sx={styles.span3}>
              Transaction fee
            </span>
            <span sx={styles.span4}>
              $0.00
            </span>
          </div>
          <Separator />
          <div sx={styles.div3}>
            <span sx={styles.span5}>
              Total amount
            </span>
            <span sx={styles.span6}>
              $1,200.00
            </span>
          </div>
        </ItemContent>
      </Item>
    </FieldGroup>
  </CardContent>
  <CardFooter>
    <Button sx={styles.button2}>
      Confirm Transfer
    </Button>
  </CardFooter>
</Card>
