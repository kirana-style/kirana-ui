/** Copy Button's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import CopyButtonDemo from "./copy-button-demo"
import CopyButtonInput from "./copy-button-input"
import CopyButtonText from "./copy-button-text"
import CopyButtonVariants from "./copy-button-variants"

export default function CopyButtonExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <CopyButtonDemo />
      </Example>
      <Example title="Input" data-showcase>
        <CopyButtonInput />
      </Example>
      <Example title="Text" data-showcase>
        <CopyButtonText />
      </Example>
      <Example title="Variants" data-showcase>
        <CopyButtonVariants />
      </Example>
    </ExampleWrapper>
  )
}
