<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { useIsMobile } from "../../../../../lib/svelte/use-mobile.svelte"
  import { Button } from "../../../ui/button"
  import { ChartContainer, ChartTooltipContent } from "../../../ui/chart"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../../../ui/drawer"
  import { Input } from "../../../ui/input"
  import { Label } from "../../../ui/label"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../ui/select"
  import { Separator } from "../../../ui/separator"
  import { chart, chartConfig, styles } from "./data-table"
  import type { Item } from "./data-table"

  let {
    item,
    class: className,
    ...rest
  }: {
    item: Item
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()



  const isMobile = useIsMobile()

  const typeItems = [
    { label: "Table of Contents", value: "Table of Contents" },
    { label: "Executive Summary", value: "Executive Summary" },
    { label: "Technical Approach", value: "Technical Approach" },
    { label: "Design", value: "Design" },
    { label: "Capabilities", value: "Capabilities" },
    { label: "Focus Documents", value: "Focus Documents" },
    { label: "Narrative", value: "Narrative" },
    { label: "Cover Page", value: "Cover Page" },
  ]
  const statusItems = [
    { label: "Done", value: "Done" },
    { label: "In Progress", value: "In Progress" },
    { label: "Not Started", value: "Not Started" },
  ]
  const reviewerItems = [
    { label: "Eddie Lake", value: "Eddie Lake" },
    { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
    { label: "Emily Whalen", value: "Emily Whalen" },
  ]
</script>

<Drawer swipeDirection={isMobile.current ? 'down' : 'right'} {...rest} sx={className as Sx}>
  <DrawerTrigger>
    {#snippet asChild(props)}
      <Button {...props()} class={props().class} style={props().style} variant="link" sx={styles.tableCellViewerButton}>
        {item.header}
      </Button>
    {/snippet}
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader sx={styles.tableCellViewerDrawerHeader}>
      <DrawerTitle>
        {item.header}
      </DrawerTitle>
      <DrawerDescription>
        Showing total visitors for the last 6 months
      </DrawerDescription>
    </DrawerHeader>
    <div sx={styles.tableCellViewerDiv}>
      {#if !isMobile.current}
        <ChartContainer config={chartConfig} definition={chart} ariaLabel="Desktop and mobile visitors, January to June" initialWidth={400}>
          {#snippet tooltip()}
            <ChartTooltipContent indicator="dot" />
          {/snippet}
        </ChartContainer>
        <Separator />
        <div sx={styles.tableCellViewerDiv2}>
          <div sx={styles.tableCellViewerDiv3}>
            Trending up by 5.2% this month
            <IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" hugeicons="ChartUpIcon" phosphor="TrendUpIcon" remixicon="RiArrowUpLine" sx={styles.tableCellViewerIconPlaceholder} />
          </div>
          <div sx={styles.tableCellViewerDiv4}>
            Showing total visitors for the last 6 months. This is just some random text to test the layout. It spans multiple lines and should wrap around.
          </div>
        </div>
        <Separator />
      {/if}
      <form sx={styles.tableCellViewerForm}>
        <div sx={styles.tableCellViewerDiv5}>
          <Label for="header">
            Header
          </Label>
          <Input id="header" value={item.header} />
        </div>
        <div sx={styles.tableCellViewerDiv6}>
          <div sx={styles.tableCellViewerDiv7}>
            <Label for="type">
              Type
            </Label>
            <Select defaultValue={item.type} items={typeItems}>
              <SelectTrigger id="type" sx={styles.tableCellViewerSelectTrigger}>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Table of Contents">
                    Table of Contents
                  </SelectItem>
                  <SelectItem value="Executive Summary">
                    Executive Summary
                  </SelectItem>
                  <SelectItem value="Technical Approach">
                    Technical Approach
                  </SelectItem>
                  <SelectItem value="Design">
                    Design
                  </SelectItem>
                  <SelectItem value="Capabilities">
                    Capabilities
                  </SelectItem>
                  <SelectItem value="Focus Documents">
                    Focus Documents
                  </SelectItem>
                  <SelectItem value="Narrative">
                    Narrative
                  </SelectItem>
                  <SelectItem value="Cover Page">
                    Cover Page
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div sx={styles.tableCellViewerDiv8}>
            <Label for="status">
              Status
            </Label>
            <Select defaultValue={item.status} items={statusItems}>
              <SelectTrigger id="status" sx={styles.tableCellViewerSelectTrigger2}>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Done">
                    Done
                  </SelectItem>
                  <SelectItem value="In Progress">
                    In Progress
                  </SelectItem>
                  <SelectItem value="Not Started">
                    Not Started
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div sx={styles.tableCellViewerDiv9}>
          <div sx={styles.tableCellViewerDiv10}>
            <Label for="target">
              Target
            </Label>
            <Input id="target" value={item.target} />
          </div>
          <div sx={styles.tableCellViewerDiv11}>
            <Label for="limit">
              Limit
            </Label>
            <Input id="limit" value={item.limit} />
          </div>
        </div>
        <div sx={styles.tableCellViewerDiv12}>
          <Label for="reviewer">
            Reviewer
          </Label>
          <Select defaultValue={item.reviewer} items={reviewerItems}>
            <SelectTrigger id="reviewer" sx={styles.tableCellViewerSelectTrigger3}>
              <SelectValue placeholder="Select a reviewer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Eddie Lake">
                  Eddie Lake
                </SelectItem>
                <SelectItem value="Jamik Tashpulatov">
                  Jamik Tashpulatov
                </SelectItem>
                <SelectItem value="Emily Whalen">
                  Emily Whalen
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
    <DrawerFooter>
      <Button>
        Submit
      </Button>
      <DrawerClose>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">
            Done
          </Button>
        {/snippet}
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
