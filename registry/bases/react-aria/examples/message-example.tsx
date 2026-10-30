import { css, select } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"

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

export default function MessageExample() {
  return (
    <ExampleWrapper>
      <MessageDefault />
      <MessageWithAvatar />
      <MessageGroupExample />
      <MessageGroupChat />
      <MessageHeaderFooter />
      <MessageActions />
      <MessageAttachment />
      <MessageAttachmentGroup />
    </ExampleWrapper>
  )
}

function MessageDefault() {
  return (
    <Example title="Message">
      <div sx={styles.flexWFullMaxWMdMinW0Flex}>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Deploying to prod real quick.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>It&apos;s a one-line change.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  It&apos;s always a one-line change 😭. Make sure to run the
                  tests this time.
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>Alright, go for it.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

function MessageWithAvatar() {
  return (
    <Example title="Avatar">
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                sx={styles.grayscale}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>Something went wrong. Any idea?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                I checked the latest deployment and found the build failed
                during dependency installation.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>Something went wrong. Any idea?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://avatar.vercel.sh/shadcn"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent sx={styles.spaceY2}>
                <div>
                  I checked the latest deployment and found the build failed
                  during dependency installation.
                </div>
                <div>Can you share the exact error message from the logs?</div>
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="destructive">
              <BubbleContent>Something went wrong. Any idea?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

function MessageGroupExample() {
  return (
    <Example title="Group">
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <MessageGroup>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <MessageGroup>
          <Message align="end">
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <MessageGroup>
          <Message align="end">
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src="https://avatar.vercel.sh/shadcn"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <MessageGroup>
          <Message>
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src="https://avatar.vercel.sh/shadcn"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
      </div>
    </Example>
  )
}

function MessageGroupChat() {
  return (
    <Example title="Group Chat">
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <Message align="end">
          <MessageContent>
            <Bubble variant="tinted">
              <BubbleContent>
                Why is the dashboard showing zero users
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <MessageGroup>
          <Message>
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>Define &quot;zero.&quot;</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>What do you mean?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <Message align="end">
          <MessageContent>
            <Bubble variant="tinted">
              <BubbleContent>
                <span sx={styles.medium}>@eve</span> can you check?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <Marker role="status">
            <MarkerIcon>
              <Spinner />
            </MarkerIcon>
            <MarkerContent>Checking the logs...</MarkerContent>
          </Marker>
        </Message>
        <Message>
          <MessageContent>
            <MessageHeader>Eve</MessageHeader>
            <Bubble variant="ghost">
              <BubbleContent>
                <span sx={styles.whitespacePreWrap}>
                  {`I found the following error in the logs:

- Error: No users found
- Stack trace:
  - at src/users/services/user-service.ts:123
  - at src/users/services/get-user.ts:230

Can you check if the users are being created?`}
                </span>
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

function MessageHeaderFooter() {
  return (
    <Example title="Header and Footer">
      <div sx={styles.flexWFullMaxWMdFlexColGa2}>
        <Message align="end">
          <MessageContent>
            <MessageHeader sx={styles.justifyEnd}>You</MessageHeader>
            <Bubble>
              <BubbleContent>
                Can we keep this style quiet and send the update today?
              </BubbleContent>
            </Bubble>
            <MessageFooter sx={styles.gap2}>
              <span>Delivered</span>
              <Button variant="ghost" size="xs">
                Undo
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="start">
          <MessageContent>
            <MessageHeader>
              <span>Olivia</span>
              <span sx={styles.mlAutoFontNormal}>1m ago</span>
            </MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>
                I checked the logs. The retry finished and the missing invoices
                are included now.
              </BubbleContent>
              <BubbleReactions>
                <Button variant="ghost" size="xs">
                  Thanks
                </Button>
              </BubbleReactions>
            </Bubble>
            <MessageFooter sx={styles.gap2}>
              <span>From Support queue</span>
              <Button variant="ghost" size="xs">
                Copy
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <MessageHeader>Marina</MessageHeader>
            <Bubble variant="outline">
              <BubbleContent>
                I drafted the reply with the exact filter path and a link to the
                export history.
              </BubbleContent>
            </Bubble>
            <MessageFooter sx={styles.gap2}>
              <span>Draft ready</span>
              <Button variant="outline" size="xs">
                Review
              </Button>
              <Button size="xs">Send</Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="start">
          <MessageContent>
            <MessageHeader>Assistant note</MessageHeader>
            <Bubble variant="ghost">
              <BubbleContent>
                Ghost messages keep long-form assistant notes aligned with the
                surrounding text instead of adding a frame.
              </BubbleContent>
            </Bubble>
            <MessageFooter sx={styles.gap2}>
              <span>Internal only</span>
              <Button variant="ghost" size="xs">
                Pin
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <MessageHeader sx={styles.justifyEnd}>
              Automation warning
            </MessageHeader>
            <Bubble variant="destructive">
              <BubbleContent>
                The old export link expires in 10 minutes. Regenerate before
                sending this transcript externally.
              </BubbleContent>
            </Bubble>
            <MessageFooter sx={styles.gap2}>
              <span>Needs action</span>
              <Button variant="destructive" size="xs">
                Regenerate
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

function MessageAttachment() {
  return (
    <Example title="Attachment">
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Message align="end">
          <MessageContent>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </AttachmentMedia>
            </Attachment>
            <Bubble>
              <BubbleContent>
                Here&apos;s the image. Can you add it to the PDF? Use it for the
                cover page.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Done. Here&apos;s the PDF with the image added as the cover
                page.
              </BubbleContent>
            </Bubble>
            <Attachment>
              <AttachmentMedia>
                <IconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  type="button"
                  aria-label="Download"
                  size="icon-sm"
                  variant="secondary"
                >
                  <IconPlaceholder
                    lucide="DownloadIcon"
                    tabler="IconDownload"
                    hugeicons="Download01Icon"
                    phosphor="DownloadIcon"
                    remixicon="RiDownloadLine"
                  />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Thanks. Looks good.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

function MessageAttachmentGroup() {
  return (
    <Example title="Attachment Group">
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Message align="end">
          <MessageContent>
            <AttachmentGroup sx={styles.w80}>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                    alt="Workspace"
                  />
                </AttachmentMedia>
              </Attachment>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                    alt="Desk"
                  />
                </AttachmentMedia>
              </Attachment>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                    alt="Office"
                  />
                </AttachmentMedia>
              </Attachment>
            </AttachmentGroup>
            <Bubble>
              <BubbleContent>
                Here are the brand photos. Can you add them to the deck?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Done. Here&apos;s the draft deck and the exported assets.
              </BubbleContent>
            </Bubble>
            <AttachmentGroup sx={styles.full}>
              <Attachment sx={styles.w64}>
                <AttachmentMedia>
                  <IconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="FileIcon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>brand-deck.pdf</AttachmentTitle>
                  <AttachmentDescription>PDF · 3.1 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Download brand-deck.pdf"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <IconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment sx={styles.w64}>
                <AttachmentMedia>
                  <IconPlaceholder
                    lucide="PresentationIcon"
                    tabler="IconPresentation"
                    hugeicons="Presentation01Icon"
                    phosphor="PresentationIcon"
                    remixicon="RiSlideshowLine"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>brand-deck.key</AttachmentTitle>
                  <AttachmentDescription>Keynote · 9 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Download brand-deck.key"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <IconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment sx={styles.w64}>
                <AttachmentMedia>
                  <IconPlaceholder
                    lucide="FileArchiveIcon"
                    tabler="IconFileZip"
                    hugeicons="File01Icon"
                    phosphor="FileZipIcon"
                    remixicon="RiFileZipLine"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>brand-assets.zip</AttachmentTitle>
                  <AttachmentDescription>ZIP · 4.2 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Download brand-assets.zip"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <IconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </AttachmentGroup>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

function MessageActions() {
  return (
    <Example title="Actions">
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>
                What is the status of the deployment?
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <Button variant="ghost" size="icon" aria-label="Copy">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Retry">
                <IconPlaceholder
                  lucide="RefreshCcwIcon"
                  tabler="IconRefresh"
                  hugeicons="ReloadIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                The install failure is coming from the workspace package. I can
                open the exact log line or retry the deployment.
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <Button variant="ghost" size="icon" aria-label="Copy">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Like: thumbs up">
                <IconPlaceholder
                  lucide="ThumbsUpIcon"
                  tabler="IconThumbUp"
                  hugeicons="ThumbsUpIcon"
                  phosphor="ThumbsUpIcon"
                  remixicon="RiThumbUpLine"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Like: thumbs down"
              >
                <IconPlaceholder
                  lucide="ThumbsDownIcon"
                  tabler="IconThumbDown"
                  hugeicons="ThumbsDownIcon"
                  phosphor="ThumbsDownIcon"
                  remixicon="RiThumbDownLine"
                />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>
                Okay drop me a link. I&apos;ll check it out.
              </BubbleContent>
            </Bubble>
            <MessageFooter sx={styles.gap2}>
              <span sx={styles.fontNormalTextDestructiv}>Failed to send</span>
              <Button variant="secondary" size="xs">
                Retry
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}
