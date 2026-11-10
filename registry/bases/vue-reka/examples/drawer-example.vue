<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
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
import { color, containerSize, leading, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { axes } from "../../../core/axes"
import { drawerScope } from "../../../styles/drawer.styles"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
  p4: css({ padding: space[4] }),
  h80WFullBgMuted: css({
    height: { "*": null, base: space[80] },
    width: { "*": null, base: "100%" },
    backgroundColor: theme.muted,
  }),
  h80WFullBgBlue200: css({
    height: space[80],
    width: "100%",
    backgroundColor: color.blue[200],
  }),
  capitalize: css({ textTransform: { "*": null, base: "capitalize" } }),
  flex1P4: css({ flex: 1, padding: space[4] }),
  bgMutedGroupDataSwipeAxi: css({
    backgroundColor: theme.muted,
    width: {
      [drawerScope.within('[data-swipe-axis="x"]')]: "100%",
      [drawerScope.within('[data-swipe-axis="y"]')]: "100%",
    },
    height: {
      [drawerScope.within('[data-swipe-axis="x"]')]: "100%",
      [drawerScope.within('[data-swipe-axis="y"]')]: space[80],
    },
  }),
  dataSwipeDirectionDownH6: css({
    height: { '[data-swipe-direction="down"]': space[64] },
  }),
  flex1ScrollFadeScrollbar: css({
    flex: "1 1 0%",
    overflowY: "auto",
    padding: space[4],
  }),
  mb4LeadingNormalStyleLyr: css({
    marginBottom: { base: space[4], [axes.style.lyra]: space[2] },
    lineHeight: { base: leading.normal, [axes.style.lyra]: leading.relaxed },
  }),
  dataSwipeDirectionUpH50V: css({
    height: { '[data-swipe-direction="up"]': "50vh" },
  }),
  flex1ScrollFadeOverflowY: css({
    flex: "1 1 0%",
    overflowY: "auto",
    padding: space[4],
  }),
  dataSwipeDirectionLeftWX: css({
    width: { '[data-swipe-direction="left"]': containerSize.xl },
  }),
  dataSwipeDirectionRightW: css({
    width: { '[data-swipe-direction="right"]': containerSize.xs },
  }),
  maxHCalc100Dvh1Rem: css({
    maxHeight: { "*": null, base: "calc(100dvh-1rem)" },
  }),
  gridFlex1ScrollFadeGap3O: css({
    display: "grid",
    flex: "1 1 0%",
    gap: space[3],
    overflowY: "auto",
    padding: space[4],
  }),
  h12BgMuted: css({
    height: { "*": null, base: space[12] },
    backgroundColor: theme.muted,
  }),
}

const PARAGRAPHS = [
  "Your changes are saved automatically as you type.",
  "Delivery usually takes three to five business days, depending on your location and the shipping method you selected at checkout.",
  "We use your email address for account notifications and order updates. You can change this anytime from your profile settings.",
  "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a code from your authenticator app in addition to your password. We recommend enabling it if you store payment methods or sensitive information.",
  "By continuing, you agree to our Terms of Service and Privacy Policy. We collect usage data to improve the product, personalize your experience, and troubleshoot issues. You can export or delete your data at any time from the account settings page. Third-party integrations may have their own policies, and you should review them before connecting external services.",
  "Refunds are processed within five to ten business days after we receive your return. Items must be unused and in their original packaging to qualify. Shipping costs are non-refundable unless the return is due to our error or a defective product. Once approved, the refund is issued to your original payment method; credit card refunds may take an additional billing cycle to appear on your statement. If you paid with store credit, the balance is restored to your account immediately. Contact support if you haven't received your refund after two weeks.",
  "Last updated March 12, 2026.",
  "Upgrade to Pro for unlimited projects, priority support, and advanced analytics. Cancel anytime from billing settings.",
  "You haven't verified your email yet. Check your inbox for a confirmation link—we sent it when you signed up. The link expires after 24 hours, but you can request a new one below.",
  "API requests are rate-limited to 1,000 calls per hour on the free plan. Exceeding the limit returns a 429 response with a Retry-After header. Upgrade to a paid plan for higher limits and dedicated support. Webhook deliveries are retried up to three times with exponential backoff if your endpoint returns a non-2xx status.",
  "No payment method on file.",
  "Our design team rebuilt the checkout flow last quarter after interviews with forty-two customers. The biggest friction point was surprise fees at the final step, so we moved shipping and tax estimates earlier in the process. Early tests show a twelve percent drop in cart abandonment. We're still rolling out the update region by region, and you may see the old flow until your account is migrated.",
]

const DRAWER_SIDES = ["up", "right", "down", "left"] as const

const SNAP_POINTS = ["31rem", 1]
</script>

<template>
  <ExampleWrapper>
    <!-- DrawerDemo -->
    <Example title="Demo">
      <div :sx="styles.flexFlexWrapGap2">
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline"> Open Drawer </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div :sx="styles.p4">
              <div :sx="styles.h80WFullBgMuted"></div>
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline"> Header </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> Edit profile </DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="styles.p4">
              <div :sx="styles.h80WFullBgMuted"></div>
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline"> Footer </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div :sx="styles.p4">
              <div :sx="styles.h80WFullBgMuted"></div>
            </div>
            <DrawerFooter>
              <Button> Submit </Button>
              <DrawerClose as-child>
                <Button variant="outline"> Cancel </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline"> Header and Footer </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> Edit profile </DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="styles.p4">
              <div :sx="styles.h80WFullBgMuted"></div>
            </div>
            <DrawerFooter>
              <Button> Submit </Button>
              <DrawerClose as-child>
                <Button variant="outline"> Cancel </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline"> Edge to Edge </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div :sx="styles.h80WFullBgBlue200"></div>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
    <!-- DrawerSwipeHandleExample -->
    <Example title="Swipe Handle">
      <div :sx="styles.flexFlexWrapGap2">
        <Drawer
          v-for="side in DRAWER_SIDES"
          :key="side"
          :swipe-direction="side"
          show-swipe-handle
        >
          <DrawerTrigger as-child>
            <Button variant="outline" :sx="styles.capitalize">
              {{ side }}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle :sx="styles.capitalize"> Drawer </DrawerTitle>
              <DrawerDescription>
                Drawer with a swipe handle.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="styles.flex1P4">
              <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
    <!-- DrawerPosition -->
    <Example title="Position">
      <div :sx="styles.flexFlexWrapGap2">
        <Drawer
          v-for="side in DRAWER_SIDES"
          :key="side"
          :swipe-direction="side"
        >
          <DrawerTrigger as-child>
            <Button variant="outline" :sx="styles.capitalize">
              {{ side }}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> Move Goal </DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="styles.flex1P4">
              <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
            </div>
            <DrawerFooter>
              <Button> Submit </Button>
              <DrawerClose as-child>
                <Button variant="outline"> Cancel </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
    <!-- DrawerCustomWidthAndHeight -->
    <Example title="Custom Width and Height">
      <div :sx="styles.flexFlexWrapGap2">
        <Drawer swipe-direction="down">
          <DrawerTrigger as-child>
            <Button variant="outline"> Down </Button>
          </DrawerTrigger>
          <DrawerContent :sx="styles.dataSwipeDirectionDownH6">
            <DrawerHeader>
              <DrawerTitle> Down drawer </DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="[scrollFade, styles.flex1ScrollFadeScrollbar]">
              <p
                v-for="(_, index) in Array.from({ length: 10 })"
                :key="index"
                :sx="styles.mb4LeadingNormalStyleLyr"
              >
                {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline"> Close </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipe-direction="up">
          <DrawerTrigger as-child>
            <Button variant="outline"> Up </Button>
          </DrawerTrigger>
          <DrawerContent :sx="styles.dataSwipeDirectionUpH50V">
            <DrawerHeader>
              <DrawerTitle> Up drawer </DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="[scrollFade, styles.flex1ScrollFadeOverflowY]">
              <p
                v-for="(_, index) in Array.from({ length: 10 })"
                :key="index"
                :sx="styles.mb4LeadingNormalStyleLyr"
              >
                {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline"> Close </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipe-direction="left">
          <DrawerTrigger as-child>
            <Button variant="outline"> Left </Button>
          </DrawerTrigger>
          <DrawerContent :sx="styles.dataSwipeDirectionLeftWX">
            <DrawerHeader>
              <DrawerTitle> Left drawer </DrawerTitle>
              <DrawerDescription>
                Drawer with a custom width.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="[scrollFade, styles.flex1ScrollFadeOverflowY]">
              <p
                v-for="(_, index) in Array.from({ length: 10 })"
                :key="index"
                :sx="styles.mb4LeadingNormalStyleLyr"
              >
                {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline"> Close </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipe-direction="right">
          <DrawerTrigger as-child>
            <Button variant="outline"> Right </Button>
          </DrawerTrigger>
          <DrawerContent :sx="styles.dataSwipeDirectionRightW">
            <DrawerHeader>
              <DrawerTitle> Right drawer </DrawerTitle>
              <DrawerDescription>
                Drawer with a custom width.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="[scrollFade, styles.flex1ScrollFadeOverflowY]">
              <p
                v-for="(_, index) in Array.from({ length: 10 })"
                :key="index"
                :sx="styles.mb4LeadingNormalStyleLyr"
              >
                {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline"> Close </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
    <!-- DrawerScrollable -->
    <Example title="Scrollable Content">
      <div :sx="styles.flexFlexWrapGap2">
        <Drawer
          v-for="side in DRAWER_SIDES"
          :key="side"
          :swipe-direction="side"
        >
          <DrawerTrigger as-child>
            <Button variant="outline" :sx="styles.capitalize">
              {{ side }}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle> Move Goal </DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="[scrollFade, styles.flex1ScrollFadeOverflowY]">
              <p
                v-for="(_, index) in Array.from({ length: 20 })"
                :key="index"
                :sx="styles.mb4LeadingNormalStyleLyr"
              >
                {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
              </p>
            </div>
            <DrawerFooter>
              <Button> Submit </Button>
              <DrawerClose as-child>
                <Button variant="outline"> Cancel </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
    <!-- DrawerSnapPoints -->
    <Example title="Snap Points">
      <Drawer :snap-points="SNAP_POINTS" show-swipe-handle>
        <DrawerTrigger as-child>
          <Button variant="outline"> Open Snap Drawer </Button>
        </DrawerTrigger>
        <DrawerContent :sx="styles.maxHCalc100Dvh1Rem">
          <DrawerHeader>
            <DrawerTitle> Snap points </DrawerTitle>
            <DrawerDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </DrawerDescription>
          </DrawerHeader>
          <div :sx="[scrollFade, styles.gridFlex1ScrollFadeGap3O]">
            <div
              v-for="(_, index) in Array.from({ length: 16 })"
              :key="index"
              :sx="styles.h12BgMuted"
            ></div>
          </div>
        </DrawerContent>
      </Drawer>
    </Example>
    <!-- DrawerNested -->
    <Example title="Nested">
      <div :sx="styles.flexFlexWrapGap2">
        <Drawer
          v-for="side in DRAWER_SIDES"
          :key="side"
          :swipe-direction="side"
          show-swipe-handle
        >
          <DrawerTrigger as-child>
            <Button variant="outline" :sx="styles.capitalize">
              {{ side }}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle :sx="styles.capitalize">
                {{ side }} drawer
              </DrawerTitle>
              <DrawerDescription>
                Open another drawer from the same direction.
              </DrawerDescription>
            </DrawerHeader>
            <div :sx="styles.flex1P4">
              <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
            </div>
            <DrawerFooter>
              <Drawer :swipe-direction="side">
                <DrawerTrigger as-child>
                  <Button> Open nested drawer </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle> Nested drawer </DrawerTitle>
                    <DrawerDescription>
                      The parent drawer stays mounted behind this one.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div :sx="styles.flex1P4">
                    <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
                  </div>
                  <DrawerFooter>
                    <Drawer :swipe-direction="side">
                      <DrawerTrigger as-child>
                        <Button> Open third drawer </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle> Third drawer </DrawerTitle>
                          <DrawerDescription>
                            This is the frontmost drawer in the stack.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div :sx="styles.flex1P4">
                          <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
                        </div>
                        <DrawerFooter>
                          <DrawerClose as-child>
                            <Button variant="outline"> Close </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    <DrawerClose as-child>
                      <Button variant="outline"> Close </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <DrawerClose as-child>
                <Button variant="outline"> Close </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
    <!-- DrawerNonModal -->
    <Example title="Non Modal">
      <Drawer :modal="false" disable-pointer-dismissal swipe-direction="right">
        <DrawerTrigger as-child>
          <Button variant="outline"> Non Modal </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle> Non Modal Drawer </DrawerTitle>
          </DrawerHeader>
          <div :sx="styles.flex1P4">
            <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
          </div>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline"> Close </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  </ExampleWrapper>
</template>
