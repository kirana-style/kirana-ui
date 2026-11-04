import { IconPlaceholder } from "../ui/icon-placeholder"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { page } from "../../../styles/page.styles"

export default function ButtonGroupNested() {
  return (
    <div sx={page.example}>
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput placeholder="Send a message..." />
            <Tooltip>
              <TooltipTrigger
                asChild={(props) => (
                  <InputGroupAddon {...props()} align="inline-end">
                    <IconPlaceholder
                      lucide="AudioLinesIcon"
                      tabler="IconWaveSine"
                      hugeicons="AudioWave01Icon"
                      phosphor="WaveformIcon"
                      remixicon="RiPulseLine"
                    />
                  </InputGroupAddon>
                )}
              />
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}
