<script lang="ts">
  import { css } from "@kirana-style/core"
  import { toast } from "svelte-sonner"
  import { useIsMobile } from "../../../lib/svelte/use-mobile.svelte"
  import { Badge } from "../ui/badge"
  import { Button } from "../ui/button"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../ui/drawer"
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
  } from "../ui/field"
  import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import { scrollFade } from "../../../styles/scroll-fade.styles"

  const styles = {
    flex1ScrollFadeOverflowY: css({
      flex: "1 1 0%",
      overflowY: "auto",
      padding: space[4],
    }),
    gap2: css({ gap: { "*": null, base: space[2] } }),
    pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
    h34Px: css({ height: { "*": null, base: "34px" } }),
  }

  const deliveryTimes = [
    {
      value: "asap",
      id: "delivery-asap",
      label: "Standard delivery",
      description: "25–35 min · Driver assigned now",
      badge: "Fastest",
    },
    {
      value: "5-00",
      id: "delivery-5-00",
      label: "5:00 PM – 5:15 PM",
      description: "Prep starts at 4:45 PM",
    },
    {
      value: "5-30",
      id: "delivery-5-30",
      label: "5:30 PM – 5:45 PM",
      description: "Good if you're heading home",
    },
    {
      value: "6-00",
      id: "delivery-6-00",
      label: "6:00 PM – 6:15 PM",
      description: "Most popular · High demand",
    },
    {
      value: "6-30",
      id: "delivery-6-30",
      label: "6:30 PM – 6:45 PM",
      description: "Last slot before kitchen closes",
    },
  ]

  let open = $state(false)

  let deliveryTime = $state("asap")

  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = deliveryTimes.find(
      (time) => time.value === deliveryTime
    )

    if (!selected) {
      return
    }

    open = false
    toast("Delivery time confirmed", {
      description: selected.label,
    })
  }
</script>

<div sx={page.example}>
  <Drawer open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)} showSwipeHandle={isMobile.current} swipeDirection={isMobile.current ? 'down' : 'right'}>
    <DrawerTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="secondary">
          Open Drawer
        </Button>
      {/snippet}
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          Pick a delivery time
        </DrawerTitle>
        <DrawerDescription>
          We'll prepare your order as soon as possible.
        </DrawerDescription>
      </DrawerHeader>
      <div sx={[scrollFade, styles.flex1ScrollFadeOverflowY]}>
        <RadioGroup value={deliveryTime} onValueChange={(details: { value: typeof deliveryTime }) => (deliveryTime = details.value)} sx={styles.gap2}>
          {#each deliveryTimes as time (time.value)}
            <FieldLabel for={time.id}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle sx={styles.pair}>
                    {time.label}
                    {#if time.badge}
                      <Badge variant="secondary">
                        {time.badge}
                      </Badge>
                    {/if}
                  </FieldTitle>
                  <FieldDescription>
                    {time.description}
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value={time.value} id={time.id} />
              </Field>
            </FieldLabel>
          {/each}
        </RadioGroup>
      </div>
      <DrawerFooter>
        <Button onclick={handleConfirm} sx={styles.h34Px}>
          Confirm Delivery Time
        </Button>
        <DrawerClose>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">
              Cancel
            </Button>
          {/snippet}
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</div>
