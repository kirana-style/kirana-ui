<script lang="ts">
  import IconPlaceholder from "@workspace/registry/icons/IconPlaceholder.svelte"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@workspace/registry/bases/svelte-ark/ui/alert-dialog/index.ts"
  import { Badge } from "@workspace/registry/bases/svelte-ark/ui/badge/index.ts"
  import { Button } from "@workspace/registry/bases/svelte-ark/ui/button/index.ts"
  import { ButtonGroup } from "@workspace/registry/bases/svelte-ark/ui/button-group/index.ts"
  import { Card, CardContent } from "@workspace/registry/bases/svelte-ark/ui/card/index.ts"
  import { Checkbox } from "@workspace/registry/bases/svelte-ark/ui/checkbox/index.ts"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@workspace/registry/bases/svelte-ark/ui/dropdown-menu/index.ts"
  import { Field, FieldGroup } from "@workspace/registry/bases/svelte-ark/ui/field/index.ts"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from "@workspace/registry/bases/svelte-ark/ui/input-group/index.ts"
  import {
    RadioGroup,
    RadioGroupItem,
  } from "@workspace/registry/bases/svelte-ark/ui/radio-group/index.ts"
  import { Switch } from "@workspace/registry/bases/svelte-ark/ui/switch/index.ts"
  import { Textarea } from "@workspace/registry/bases/svelte-ark/ui/textarea/index.ts"
  import { axes } from "@workspace/registry/core/axes"
  import { css } from "@kirana-style/core"
  import { breakpoint, space } from "@workspace/registry/core/scales"

  const WIDE = "@media (width >= 2000px)"

  const styles = {
    card: css({
      width: { "*": null, base: "100%" },
    }),
    cardContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[6] },
    }),
    // Upstream's home draws one design, whose row fits; here a reader's design can be wider (Sera's
    // capitals), so the buttons and badges wrap rather than leave the card.
    div: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space[2],
    }),
    field: css({
      flex: "1 1 0%",
    }),
    textarea: css({
      resize: { "*": null, base: "none" },
    }),
    div2: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
    }),
    div3: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space[2],
    }),
    badge: css({
      display: { "*": null, base: "none", [WIDE]: "flex" },
    }),
    radioGroup: css({
      marginLeft: { "*": null, base: "auto" },
      display: { "*": null, base: "flex" },
      width: { "*": null, base: "fit-content" },
      gap: { "*": null, base: space[3] },
    }),
    div4: css({
      display: "flex",
      gap: space[3],
    }),
    checkbox: css({
      display: { "*": null, base: "none", [WIDE]: "flex" },
    }),
    switch: css({
      display: { "*": null, base: "flex", [WIDE]: "none" },
    }),
    div5: css({
      display: "flex",
      alignItems: "center",
      gap: space[4],
    }),
    span: css({
      display: {
        base: "none",
        [breakpoint.md]: "flex",
        [axes.style.sera]: { [breakpoint.md]: "none" },
      },
    }),
    span2: css({
      display: {
        base: "flex",
        [breakpoint.md]: "none",
        [axes.style.sera]: { [breakpoint.md]: "flex" },
      },
    }),
    buttonGroup: css({
      marginLeft: { "*": null, base: "auto" },
    }),
    span3: css({
      display: { [axes.style.sera]: "none" },
    }),
    span4: css({
      display: { base: "none", [axes.style.sera]: "block" },
    }),
    dropdownMenuContent: css({
      width: { "*": null, base: space[40] },
    }),
    switch2: css({
      display: { "*": null, base: "none", [WIDE]: "flex" },
    }),
  }
</script>

<Card sx={styles.card}>
  <CardContent sx={styles.cardContent}>
    <div sx={styles.div}>
      <Button>
        Button{" "}
        <IconPlaceholder lucide="ArrowRightIcon" tabler="IconArrowRight" hugeicons="ArrowRight02Icon" phosphor="ArrowRightIcon" remixicon="RiArrowRightLine" data-icon="inline-end" />
      </Button>
      <Button variant="secondary">
        Secondary
      </Button>
      <Button variant="outline">
        Outline
      </Button>
    </div>
    <FieldGroup>
      <Field>
        <InputGroup>
          <InputGroupInput placeholder="Name" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>
              <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="Search01Icon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field sx={styles.field}>
        <Textarea placeholder="Message" sx={styles.textarea} />
      </Field>
    </FieldGroup>
    <div sx={styles.div2}>
      <div sx={styles.div3}>
        <Badge>
          Badge
        </Badge>
        <Badge variant="secondary">
          Secondary
        </Badge>
        <Badge variant="outline" sx={styles.badge}>
          Outline
        </Badge>
      </div>
      <RadioGroup defaultValue="apple" sx={styles.radioGroup} aria-label="Fruit preference">
        <RadioGroupItem value="apple" aria-label="Apple" />
        <RadioGroupItem value="banana" aria-label="Banana" />
      </RadioGroup>
      <div sx={styles.div4}>
        <Checkbox defaultChecked aria-label="Enable email alerts" />
        <Checkbox sx={styles.checkbox} aria-label="Enable push alerts" />
      </div>
      <Switch defaultChecked sx={styles.switch} aria-label="Enable compact notifications" />
    </div>
    <div sx={styles.div5}>
      <AlertDialog>
        <AlertDialogTrigger>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">
              <span sx={styles.span}>
                Alert Dialog
              </span>
              <span sx={styles.span2}>
                Dialog
              </span>
            </Button>
          {/snippet}
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Allow accessory to connect?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device and your data?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Don't allow
            </AlertDialogCancel>
            <AlertDialogAction>
              Allow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ButtonGroup sx={styles.buttonGroup}>
        <Button variant="outline">
          <span sx={styles.span3}>
            Button Group
          </span>
          <span sx={styles.span4}>
            Group
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {#snippet asChild(props)}
              <Button {...props()} variant="outline" size="icon" aria-label="Open quick actions">
                <IconPlaceholder lucide="ChevronUpIcon" tabler="IconChevronUp" hugeicons="ArrowUp01Icon" phosphor="CaretUpIcon" remixicon="RiArrowUpSLine" />
              </Button>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" sx={styles.dropdownMenuContent}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Quick Actions
              </DropdownMenuLabel>
              <DropdownMenuItem>
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                Block User
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <Switch defaultChecked sx={styles.switch2} aria-label="Enable advanced setting" />
    </div>
  </CardContent>
</Card>
