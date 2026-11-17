<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Button } from "../ui/button"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../ui/drawer"
  import { Input } from "../ui/input"
  import { Label } from "../ui/label"
  import { breakpoint, space } from "../../../core/scales"
  import { useIsMobile } from "../../../lib/svelte/use-mobile.svelte"
  import { page } from "../../../styles/page.styles"

  const styles = {
    // `sm:max-w-[425px]`
    narrow: css({
      maxWidth: {
        "*": null,
        base: "calc(100% - 2rem)",
        [breakpoint.sm]: "425px",
      },
    }),
    textLeft: css({ textAlign: "left" }),
    p4: css({ padding: space[4] }),
    form: css({ display: "grid", alignItems: "start", gap: space[6] }),
    field: css({ display: "grid", gap: space[3] }),
  }

  let open = $state(false)

  const isMobile = useIsMobile()
  const isDesktop = $derived.by(() => !isMobile.current)
</script>

<div sx={page.example}>
  {#if isDesktop}
    <Dialog open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
      <DialogTrigger>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">
            Edit Profile
          </Button>
        {/snippet}
      </DialogTrigger>
      <DialogContent sx={styles.narrow}>
        <DialogHeader>
          <DialogTitle>
            Edit profile
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form sx={[styles.form]}>
          <div sx={styles.field}>
            <Label for="email">
              Email
            </Label>
            <Input type="email" id="email" value="shadcn@example.com" />
          </div>
          <div sx={styles.field}>
            <Label for="username">
              Username
            </Label>
            <Input id="username" value="@shadcn" />
          </div>
          <Button type="submit">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  {:else}
    <Drawer open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
      <DrawerTrigger>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">
            Edit Profile
          </Button>
        {/snippet}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader sx={styles.textLeft}>
          <DrawerTitle>
            Edit profile
          </DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <form sx={[styles.form, styles.p4]}>
          <div sx={styles.field}>
            <Label for="email">
              Email
            </Label>
            <Input type="email" id="email" value="shadcn@example.com" />
          </div>
          <div sx={styles.field}>
            <Label for="username">
              Username
            </Label>
            <Input id="username" value="@shadcn" />
          </div>
          <Button type="submit">
            Save changes
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  {/if}
</div>
