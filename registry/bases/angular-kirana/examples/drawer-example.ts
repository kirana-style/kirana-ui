import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { color, containerSize, leading, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { axes } from "../../../core/axes"
import { drawerScope } from "../../../styles/drawer.styles"
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

@Component({
  selector: "drawer-example",
  imports: [
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Example,
    ExampleWrapper,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- DrawerDemo -->
      <div kuiExample title="Demo">
        <div [sx]="styles.flexFlexWrapGap2">
          <ng-container kuiDrawer>
            <button kuiButton kuiDrawerTrigger variant="outline">
              Open Drawer
            </button>
            <div kuiDrawerContent>
              <div [sx]="styles.p4">
                <div [sx]="styles.h80WFullBgMuted"></div>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer>
            <button kuiButton kuiDrawerTrigger variant="outline">Header</button>
            <div kuiDrawerContent>
              <div kuiDrawerHeader>
                <h2 kuiDrawerTitle>Edit profile</h2>
                <p kuiDrawerDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </p>
              </div>
              <div [sx]="styles.p4">
                <div [sx]="styles.h80WFullBgMuted"></div>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer>
            <button kuiButton kuiDrawerTrigger variant="outline">Footer</button>
            <div kuiDrawerContent>
              <div [sx]="styles.p4">
                <div [sx]="styles.h80WFullBgMuted"></div>
              </div>
              <div kuiDrawerFooter>
                <button kuiButton>Submit</button>
                <button kuiButton kuiDrawerClose variant="outline">
                  Cancel
                </button>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer>
            <button kuiButton kuiDrawerTrigger variant="outline">
              Header and Footer
            </button>
            <div kuiDrawerContent>
              <div kuiDrawerHeader>
                <h2 kuiDrawerTitle>Edit profile</h2>
                <p kuiDrawerDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </p>
              </div>
              <div [sx]="styles.p4">
                <div [sx]="styles.h80WFullBgMuted"></div>
              </div>
              <div kuiDrawerFooter>
                <button kuiButton>Submit</button>
                <button kuiButton kuiDrawerClose variant="outline">
                  Cancel
                </button>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer>
            <button kuiButton kuiDrawerTrigger variant="outline">
              Edge to Edge
            </button>
            <div kuiDrawerContent>
              <div [sx]="styles.h80WFullBgBlue200"></div>
            </div>
          </ng-container>
        </div>
      </div>
      <!-- DrawerSwipeHandleExample -->
      <div kuiExample title="Swipe Handle">
        <div [sx]="styles.flexFlexWrapGap2">
          @for (side of DRAWER_SIDES; track side) {
            <ng-container kuiDrawer [swipeDirection]="side" showSwipeHandle>
              <button
                kuiButton
                kuiDrawerTrigger
                variant="outline"
                [sx]="styles.capitalize"
              >
                {{ side }}
              </button>
              <div kuiDrawerContent>
                <div kuiDrawerHeader>
                  <h2 kuiDrawerTitle [sx]="styles.capitalize">Drawer</h2>
                  <p kuiDrawerDescription>Drawer with a swipe handle.</p>
                </div>
                <div [sx]="styles.flex1P4">
                  <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- DrawerPosition -->
      <div kuiExample title="Position">
        <div [sx]="styles.flexFlexWrapGap2">
          @for (side of DRAWER_SIDES; track side) {
            <ng-container kuiDrawer [swipeDirection]="side">
              <button
                kuiButton
                kuiDrawerTrigger
                variant="outline"
                [sx]="styles.capitalize"
              >
                {{ side }}
              </button>
              <div kuiDrawerContent>
                <div kuiDrawerHeader>
                  <h2 kuiDrawerTitle>Move Goal</h2>
                  <p kuiDrawerDescription>Set your daily activity goal.</p>
                </div>
                <div [sx]="styles.flex1P4">
                  <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                </div>
                <div kuiDrawerFooter>
                  <button kuiButton>Submit</button>
                  <button kuiButton kuiDrawerClose variant="outline">
                    Cancel
                  </button>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- DrawerCustomWidthAndHeight -->
      <div kuiExample title="Custom Width and Height">
        <div [sx]="styles.flexFlexWrapGap2">
          <ng-container kuiDrawer swipeDirection="down">
            <button kuiButton kuiDrawerTrigger variant="outline">Down</button>
            <div kuiDrawerContent [sx]="styles.dataSwipeDirectionDownH6">
              <div kuiDrawerHeader>
                <h2 kuiDrawerTitle>Down drawer</h2>
                <p kuiDrawerDescription>Drawer with a custom height.</p>
              </div>
              <div [sx]="[scrollFade, styles.flex1ScrollFadeScrollbar]">
                @for (
                  _ of Array.from({ length: 10 });
                  track index;
                  let index = $index
                ) {
                  <p [sx]="styles.mb4LeadingNormalStyleLyr">
                    {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
                  </p>
                }
              </div>
              <div kuiDrawerFooter>
                <button kuiButton kuiDrawerClose variant="outline">
                  Close
                </button>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer swipeDirection="up">
            <button kuiButton kuiDrawerTrigger variant="outline">Up</button>
            <div kuiDrawerContent [sx]="styles.dataSwipeDirectionUpH50V">
              <div kuiDrawerHeader>
                <h2 kuiDrawerTitle>Up drawer</h2>
                <p kuiDrawerDescription>Drawer with a custom height.</p>
              </div>
              <div [sx]="[scrollFade, styles.flex1ScrollFadeOverflowY]">
                @for (
                  _ of Array.from({ length: 10 });
                  track index;
                  let index = $index
                ) {
                  <p [sx]="styles.mb4LeadingNormalStyleLyr">
                    {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
                  </p>
                }
              </div>
              <div kuiDrawerFooter>
                <button kuiButton kuiDrawerClose variant="outline">
                  Close
                </button>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer swipeDirection="left">
            <button kuiButton kuiDrawerTrigger variant="outline">Left</button>
            <div kuiDrawerContent [sx]="styles.dataSwipeDirectionLeftWX">
              <div kuiDrawerHeader>
                <h2 kuiDrawerTitle>Left drawer</h2>
                <p kuiDrawerDescription>Drawer with a custom width.</p>
              </div>
              <div [sx]="[scrollFade, styles.flex1ScrollFadeOverflowY]">
                @for (
                  _ of Array.from({ length: 10 });
                  track index;
                  let index = $index
                ) {
                  <p [sx]="styles.mb4LeadingNormalStyleLyr">
                    {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
                  </p>
                }
              </div>
              <div kuiDrawerFooter>
                <button kuiButton kuiDrawerClose variant="outline">
                  Close
                </button>
              </div>
            </div>
          </ng-container>
          <ng-container kuiDrawer swipeDirection="right">
            <button kuiButton kuiDrawerTrigger variant="outline">Right</button>
            <div kuiDrawerContent [sx]="styles.dataSwipeDirectionRightW">
              <div kuiDrawerHeader>
                <h2 kuiDrawerTitle>Right drawer</h2>
                <p kuiDrawerDescription>Drawer with a custom width.</p>
              </div>
              <div [sx]="[scrollFade, styles.flex1ScrollFadeOverflowY]">
                @for (
                  _ of Array.from({ length: 10 });
                  track index;
                  let index = $index
                ) {
                  <p [sx]="styles.mb4LeadingNormalStyleLyr">
                    {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
                  </p>
                }
              </div>
              <div kuiDrawerFooter>
                <button kuiButton kuiDrawerClose variant="outline">
                  Close
                </button>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <!-- DrawerScrollable -->
      <div kuiExample title="Scrollable Content">
        <div [sx]="styles.flexFlexWrapGap2">
          @for (side of DRAWER_SIDES; track side) {
            <ng-container kuiDrawer [swipeDirection]="side">
              <button
                kuiButton
                kuiDrawerTrigger
                variant="outline"
                [sx]="styles.capitalize"
              >
                {{ side }}
              </button>
              <div kuiDrawerContent>
                <div kuiDrawerHeader>
                  <h2 kuiDrawerTitle>Move Goal</h2>
                  <p kuiDrawerDescription>Set your daily activity goal.</p>
                </div>
                <div [sx]="[scrollFade, styles.flex1ScrollFadeOverflowY]">
                  @for (
                    _ of Array.from({ length: 20 });
                    track index;
                    let index = $index
                  ) {
                    <p [sx]="styles.mb4LeadingNormalStyleLyr">
                      {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
                    </p>
                  }
                </div>
                <div kuiDrawerFooter>
                  <button kuiButton>Submit</button>
                  <button kuiButton kuiDrawerClose variant="outline">
                    Cancel
                  </button>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- DrawerSnapPoints -->
      <div kuiExample title="Snap Points">
        <ng-container kuiDrawer [snapPoints]="SNAP_POINTS" showSwipeHandle>
          <button kuiButton kuiDrawerTrigger variant="outline">
            Open Snap Drawer
          </button>
          <div kuiDrawerContent [sx]="styles.maxHCalc100Dvh1Rem">
            <div kuiDrawerHeader>
              <h2 kuiDrawerTitle>Snap points</h2>
              <p kuiDrawerDescription>
                Drag the drawer to snap between a compact peek and a near
                full-height view.
              </p>
            </div>
            <div [sx]="[scrollFade, styles.gridFlex1ScrollFadeGap3O]">
              @for (
                _ of Array.from({ length: 16 });
                track index;
                let index = $index
              ) {
                <div [sx]="styles.h12BgMuted"></div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DrawerNested -->
      <div kuiExample title="Nested">
        <div [sx]="styles.flexFlexWrapGap2">
          @for (side of DRAWER_SIDES; track side) {
            <ng-container kuiDrawer [swipeDirection]="side" showSwipeHandle>
              <button
                kuiButton
                kuiDrawerTrigger
                variant="outline"
                [sx]="styles.capitalize"
              >
                {{ side }}
              </button>
              <div kuiDrawerContent>
                <div kuiDrawerHeader>
                  <h2 kuiDrawerTitle [sx]="styles.capitalize">
                    {{ side }}
                    drawer
                  </h2>
                  <p kuiDrawerDescription>
                    Open another drawer from the same direction.
                  </p>
                </div>
                <div [sx]="styles.flex1P4">
                  <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                </div>
                <div kuiDrawerFooter>
                  <ng-container kuiDrawer [swipeDirection]="side">
                    <button kuiButton kuiDrawerTrigger>
                      Open nested drawer
                    </button>
                    <div kuiDrawerContent>
                      <div kuiDrawerHeader>
                        <h2 kuiDrawerTitle>Nested drawer</h2>
                        <p kuiDrawerDescription>
                          The parent drawer stays mounted behind this one.
                        </p>
                      </div>
                      <div [sx]="styles.flex1P4">
                        <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                      </div>
                      <div kuiDrawerFooter>
                        <ng-container kuiDrawer [swipeDirection]="side">
                          <button kuiButton kuiDrawerTrigger>
                            Open third drawer
                          </button>
                          <div kuiDrawerContent>
                            <div kuiDrawerHeader>
                              <h2 kuiDrawerTitle>Third drawer</h2>
                              <p kuiDrawerDescription>
                                This is the frontmost drawer in the stack.
                              </p>
                            </div>
                            <div [sx]="styles.flex1P4">
                              <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                            </div>
                            <div kuiDrawerFooter>
                              <button
                                kuiButton
                                kuiDrawerClose
                                variant="outline"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </ng-container>
                        <button kuiButton kuiDrawerClose variant="outline">
                          Close
                        </button>
                      </div>
                    </div>
                  </ng-container>
                  <button kuiButton kuiDrawerClose variant="outline">
                    Close
                  </button>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- DrawerNonModal -->
      <div kuiExample title="Non Modal">
        <ng-container
          kuiDrawer
          [modal]="false"
          disable-pointer-dismissal
          swipeDirection="right"
        >
          <button kuiButton kuiDrawerTrigger variant="outline">
            Non Modal
          </button>
          <div kuiDrawerContent>
            <div kuiDrawerHeader>
              <h2 kuiDrawerTitle>Non Modal Drawer</h2>
            </div>
            <div [sx]="styles.flex1P4">
              <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
            </div>
            <div kuiDrawerFooter>
              <button kuiButton kuiDrawerClose variant="outline">Close</button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class DrawerExample {
  protected readonly styles = styles
  protected readonly PARAGRAPHS = PARAGRAPHS
  protected readonly DRAWER_SIDES = DRAWER_SIDES
  protected readonly SNAP_POINTS = SNAP_POINTS
  protected readonly scrollFade = scrollFade
  protected readonly Array = Array
}
