import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "../ui/attachment"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../ui/bubble"
import { Button } from "../ui/button"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "../ui/message"
import { Spinner } from "../ui/spinner"

const styles = {
  whitespacePreWrap: css({ whiteSpace: "pre-wrap" }),
  flexWFullMaxWMdMinW0Flex: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    minWidth: space[0],
    flexDirection: "column",
    gap: { "*": null, base: space[10] },
  }),
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[10] },
  }),
  grayscale: css({ filter: "grayscale(100%)" }),
  spaceY2: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  medium: css({ fontWeight: fontWeight.medium }),
  flexWFullMaxWMdFlexColGa2: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[12] },
  }),
  justifyEnd: css({ justifyContent: "flex-end" }),
  gap2: css({ gap: { "*": null, base: space[2] } }),
  mlAutoFontNormal: css({
    marginLeft: "auto",
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
  }),
  w80: css({ width: { "*": null, base: "80%" } }),
  full: css({ width: "100%" }),
  w64: css({ width: { "*": null, base: space[64] } }),
  fontNormalTextDestructiv: css({
    fontWeight: { "*": null, base: fontWeight.normal },
    color: theme.destructive,
  }),
}

const text1 = `I found the following error in the logs:

- Error: No users found
- Stack trace:
  - at src/users/services/user-service.ts:123
  - at src/users/services/get-user.ts:230

Can you check if the users are being created?`

@Component({
  selector: "message-example",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    BubbleGroup,
    BubbleReactions,
    Button,
    Example,
    ExampleWrapper,
    Marker,
    MarkerContent,
    MarkerIcon,
    Message,
    MessageAvatar,
    MessageContent,
    MessageFooter,
    MessageGroup,
    MessageHeader,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- MessageDefault -->
      <div kuiExample title="Message">
        <div [sx]="styles.flexWFullMaxWMdMinW0Flex">
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble>
                <div kuiBubbleContent>Deploying to prod real quick.</div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>It's 4:55 PM. On a Friday.</div>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble>
                <div kuiBubbleContent>It's a one-line change.</div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageContent>
              <div kuiBubbleGroup>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>
                    It's always a one-line change 😭. Make sure to run the tests
                    this time.
                  </div>
                </div>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>Alright, go for it.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageWithAvatar -->
      <div kuiExample title="Avatar">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiMessage>
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  [attr.src]="'/avatars/kirana.png'"
                  alt="@kirana"
                  [sx]="styles.grayscale"
                />
                <span kuiAvatarFallback>CN</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>Something went wrong. Any idea?</div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <span kuiAvatarFallback>ER</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  I checked the latest deployment and found the build failed
                  during dependency installation.
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <span kuiAvatarFallback>ER</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>Something went wrong. Any idea?</div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  [attr.src]="'/avatars/kirana.png'"
                  alt="@kirana"
                />
                <span kuiAvatarFallback>CN</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent [sx]="styles.spaceY2">
                  <div>
                    I checked the latest deployment and found the build failed
                    during dependency installation.
                  </div>
                  <div>
                    Can you share the exact error message from the logs?
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <span kuiAvatarFallback>CN</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="destructive">
                <div kuiBubbleContent>Something went wrong. Any idea?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageGroupExample -->
      <div kuiExample title="Group">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiMessageGroup>
            <div kuiMessage>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>I checked the registry addresses.</div>
                </div>
              </div>
            </div>
            <div kuiMessage>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>
                    The component and example JSON now live under the UI
                    registry.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div kuiMessageGroup>
            <div kuiMessage align="end">
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>I checked the registry addresses.</div>
                </div>
              </div>
            </div>
            <div kuiMessage align="end">
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>
                    The component and example JSON now live under the UI
                    registry.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div kuiMessageGroup>
            <div kuiMessage align="end">
              <div kuiMessageAvatar></div>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>I checked the registry addresses.</div>
                </div>
              </div>
            </div>
            <div kuiMessage align="end">
              <div kuiMessageAvatar>
                <span kuiAvatar>
                  <img
                    kuiAvatarImage
                    [attr.src]="'/avatars/kirana.png'"
                    alt="@kirana"
                  />
                  <span kuiAvatarFallback>CN</span>
                </span>
              </div>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>
                    The component and example JSON now live under the UI
                    registry.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div kuiMessageGroup>
            <div kuiMessage>
              <div kuiMessageAvatar></div>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>I checked the registry addresses.</div>
                </div>
              </div>
            </div>
            <div kuiMessage>
              <div kuiMessageAvatar>
                <span kuiAvatar>
                  <img
                    kuiAvatarImage
                    [attr.src]="'/avatars/kirana.png'"
                    alt="@kirana"
                  />
                  <span kuiAvatarFallback>CN</span>
                </span>
              </div>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>
                    The component and example JSON now live under the UI
                    registry.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageGroupChat -->
      <div kuiExample title="Group Chat">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble variant="tinted">
                <div kuiBubbleContent>
                  Why is the dashboard showing zero users
                </div>
              </div>
            </div>
          </div>
          <div kuiMessageGroup>
            <div kuiMessage>
              <div kuiMessageAvatar></div>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>Define "zero."</div>
                </div>
              </div>
            </div>
            <div kuiMessage>
              <div kuiMessageAvatar>
                <span kuiAvatar>
                  <img
                    kuiAvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <span kuiAvatarFallback>ER</span>
                </span>
              </div>
              <div kuiMessageContent>
                <div kuiBubble variant="muted">
                  <div kuiBubbleContent>What do you mean?</div>
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble variant="tinted">
                <div kuiBubbleContent>
                  <span [sx]="styles.medium">{{ "@" }}eve</span>
                  can you check?
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMarker role="status">
              <span kuiMarkerIcon>
                <svg kuiSpinner></svg>
              </span>
              <span kuiMarkerContent>Checking the logs...</span>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageContent>
              <div kuiMessageHeader>Eve</div>
              <div kuiBubble variant="ghost">
                <div kuiBubbleContent>
                  <span [sx]="styles.whitespacePreWrap">{{ text1 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageHeaderFooter -->
      <div kuiExample title="Header and Footer">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa2">
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiMessageHeader [sx]="styles.justifyEnd">You</div>
              <div kuiBubble>
                <div kuiBubbleContent>
                  Can we keep this style quiet and send the update today?
                </div>
              </div>
              <div kuiMessageFooter [sx]="styles.gap2">
                <span>Delivered</span>
                <button kuiButton variant="ghost" size="xs">Undo</button>
              </div>
            </div>
          </div>
          <div kuiMessage align="start">
            <div kuiMessageContent>
              <div kuiMessageHeader>
                <span>Olivia</span>
                <span [sx]="styles.mlAutoFontNormal">1m ago</span>
              </div>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  I checked the logs. The retry finished and the missing
                  invoices are included now.
                </div>
                <div kuiBubbleReactions>
                  <button kuiButton variant="ghost" size="xs">Thanks</button>
                </div>
              </div>
              <div kuiMessageFooter [sx]="styles.gap2">
                <span>From Support queue</span>
                <button kuiButton variant="ghost" size="xs">Copy</button>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiMessageHeader>Marina</div>
              <div kuiBubble variant="outline">
                <div kuiBubbleContent>
                  I drafted the reply with the exact filter path and a link to
                  the export history.
                </div>
              </div>
              <div kuiMessageFooter [sx]="styles.gap2">
                <span>Draft ready</span>
                <button kuiButton variant="outline" size="xs">Review</button>
                <button kuiButton size="xs">Send</button>
              </div>
            </div>
          </div>
          <div kuiMessage align="start">
            <div kuiMessageContent>
              <div kuiMessageHeader>Assistant note</div>
              <div kuiBubble variant="ghost">
                <div kuiBubbleContent>
                  Ghost messages keep long-form assistant notes aligned with the
                  surrounding text instead of adding a frame.
                </div>
              </div>
              <div kuiMessageFooter [sx]="styles.gap2">
                <span>Internal only</span>
                <button kuiButton variant="ghost" size="xs">Pin</button>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiMessageHeader [sx]="styles.justifyEnd">
                Automation warning
              </div>
              <div kuiBubble variant="destructive">
                <div kuiBubbleContent>
                  The old export link expires in 10 minutes. Regenerate before
                  sending this transcript externally.
                </div>
              </div>
              <div kuiMessageFooter [sx]="styles.gap2">
                <span>Needs action</span>
                <button kuiButton variant="destructive" size="xs">
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageActions -->
      <div kuiExample title="Actions">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble>
                <div kuiBubbleContent>
                  What is the status of the deployment?
                </div>
              </div>
              <div kuiMessageFooter>
                <button
                  kuiButton
                  variant="ghost"
                  size="icon"
                  aria-label="Copy"
                  title="Copy"
                >
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                </button>
                <button
                  kuiButton
                  variant="ghost"
                  size="icon"
                  aria-label="Retry"
                  title="Retry"
                >
                  <svg
                    iconPlaceholder
                    lucide="RefreshCcwIcon"
                    tabler="IconRefresh"
                    hugeicons="ReloadIcon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <span kuiAvatarFallback>ER</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  The install failure is coming from the workspace package. I
                  can open the exact log line or retry the deployment.
                </div>
              </div>
              <div kuiMessageFooter>
                <button
                  kuiButton
                  variant="ghost"
                  size="icon"
                  aria-label="Copy"
                  title="Copy"
                >
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                </button>
                <button
                  kuiButton
                  variant="ghost"
                  size="icon"
                  aria-label="Like: thumbs up"
                  title="Like: thumbs up"
                >
                  <svg
                    iconPlaceholder
                    lucide="ThumbsUpIcon"
                    tabler="IconThumbUp"
                    hugeicons="ThumbsUpIcon"
                    phosphor="ThumbsUpIcon"
                    remixicon="RiThumbUpLine"
                  ></svg>
                </button>
                <button
                  kuiButton
                  variant="ghost"
                  size="icon"
                  aria-label="Like: thumbs down"
                  title="Like: thumbs down"
                >
                  <svg
                    iconPlaceholder
                    lucide="ThumbsDownIcon"
                    tabler="IconThumbDown"
                    hugeicons="ThumbsDownIcon"
                    phosphor="ThumbsDownIcon"
                    remixicon="RiThumbDownLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble>
                <div kuiBubbleContent>
                  Okay drop me a link. I'll check it out.
                </div>
              </div>
              <div kuiMessageFooter [sx]="styles.gap2">
                <span [sx]="styles.fontNormalTextDestructiv"
                  >Failed to send</span
                >
                <button kuiButton variant="secondary" size="xs">Retry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageAttachment -->
      <div kuiExample title="Attachment">
        <div [sx]="styles.flexWFullMaxWSmFlexColGa">
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiAttachment orientation="vertical">
                <div kuiAttachmentMedia variant="image">
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                    alt="Workspace"
                  />
                </div>
              </div>
              <div kuiBubble>
                <div kuiBubbleContent>
                  Here's the image. Can you add it to the PDF? Use it for the
                  cover page.
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  Done. Here's the PDF with the image added as the cover page.
                </div>
              </div>
              <div kuiAttachment>
                <div kuiAttachmentMedia>
                  <svg
                    iconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="FileIcon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  ></svg>
                </div>
                <div kuiAttachmentContent>
                  <span kuiAttachmentTitle>sales-dashboard.pdf</span>
                  <span kuiAttachmentDescription>PDF · 2.4 MB</span>
                </div>
                <div kuiAttachmentActions>
                  <button
                    kuiAttachmentAction
                    type="button"
                    title="Download"
                    aria-label="Download"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <svg
                      iconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    ></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiBubble>
                <div kuiBubbleContent>Thanks. Looks good.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MessageAttachmentGroup -->
      <div kuiExample title="Attachment Group">
        <div [sx]="styles.flexWFullMaxWSmFlexColGa">
          <div kuiMessage align="end">
            <div kuiMessageContent>
              <div kuiAttachmentGroup [sx]="styles.w80">
                <div kuiAttachment orientation="vertical">
                  <div kuiAttachmentMedia variant="image">
                    <img
                      src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                      alt="Workspace"
                    />
                  </div>
                </div>
                <div kuiAttachment orientation="vertical">
                  <div kuiAttachmentMedia variant="image">
                    <img
                      src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                      alt="Desk"
                    />
                  </div>
                </div>
                <div kuiAttachment orientation="vertical">
                  <div kuiAttachmentMedia variant="image">
                    <img
                      src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                      alt="Office"
                    />
                  </div>
                </div>
              </div>
              <div kuiBubble>
                <div kuiBubbleContent>
                  Here are the brand photos. Can you add them to the deck?
                </div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  Done. Here's the draft deck and the exported assets.
                </div>
              </div>
              <div kuiAttachmentGroup [sx]="styles.full">
                <div kuiAttachment [sx]="styles.w64">
                  <div kuiAttachmentMedia>
                    <svg
                      iconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="FileIcon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    ></svg>
                  </div>
                  <div kuiAttachmentContent>
                    <span kuiAttachmentTitle>brand-deck.pdf</span>
                    <span kuiAttachmentDescription>PDF · 3.1 MB</span>
                  </div>
                  <div kuiAttachmentActions>
                    <button
                      kuiAttachmentAction
                      type="button"
                      title="Download"
                      aria-label="Download brand-deck.pdf"
                      size="icon-sm"
                      variant="secondary"
                    >
                      <svg
                        iconPlaceholder
                        lucide="DownloadIcon"
                        tabler="IconDownload"
                        hugeicons="Download01Icon"
                        phosphor="DownloadIcon"
                        remixicon="RiDownloadLine"
                      ></svg>
                    </button>
                  </div>
                </div>
                <div kuiAttachment [sx]="styles.w64">
                  <div kuiAttachmentMedia>
                    <svg
                      iconPlaceholder
                      lucide="PresentationIcon"
                      tabler="IconPresentation"
                      hugeicons="Presentation01Icon"
                      phosphor="PresentationIcon"
                      remixicon="RiSlideshowLine"
                    ></svg>
                  </div>
                  <div kuiAttachmentContent>
                    <span kuiAttachmentTitle>brand-deck.key</span>
                    <span kuiAttachmentDescription>Keynote · 9 MB</span>
                  </div>
                  <div kuiAttachmentActions>
                    <button
                      kuiAttachmentAction
                      type="button"
                      title="Download"
                      aria-label="Download brand-deck.key"
                      size="icon-sm"
                      variant="secondary"
                    >
                      <svg
                        iconPlaceholder
                        lucide="DownloadIcon"
                        tabler="IconDownload"
                        hugeicons="Download01Icon"
                        phosphor="DownloadIcon"
                        remixicon="RiDownloadLine"
                      ></svg>
                    </button>
                  </div>
                </div>
                <div kuiAttachment [sx]="styles.w64">
                  <div kuiAttachmentMedia>
                    <svg
                      iconPlaceholder
                      lucide="FileArchiveIcon"
                      tabler="IconFileZip"
                      hugeicons="File01Icon"
                      phosphor="FileZipIcon"
                      remixicon="RiFileZipLine"
                    ></svg>
                  </div>
                  <div kuiAttachmentContent>
                    <span kuiAttachmentTitle>brand-assets.zip</span>
                    <span kuiAttachmentDescription>ZIP · 4.2 MB</span>
                  </div>
                  <div kuiAttachmentActions>
                    <button
                      kuiAttachmentAction
                      type="button"
                      title="Download"
                      aria-label="Download brand-assets.zip"
                      size="icon-sm"
                      variant="secondary"
                    >
                      <svg
                        iconPlaceholder
                        lucide="DownloadIcon"
                        tabler="IconDownload"
                        hugeicons="Download01Icon"
                        phosphor="DownloadIcon"
                        remixicon="RiDownloadLine"
                      ></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class MessageExample {
  protected readonly text1 = text1
  protected readonly styles = styles
}
