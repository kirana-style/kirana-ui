import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../ui/field"
import { Input } from "../ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../ui/native-select"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"

const styles = {
  inputFieldsSpan: css({
    color: theme.destructive,
  }),
  inputFieldsBadge: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  textareaFieldsTextarea: css({
    minHeight: { "*": null, base: "100px" },
  }),
  textareaFieldsTextarea2: css({
    minHeight: { "*": null, base: "120px" },
  }),
  checkboxFieldsFieldGroup: css({
    gap: { "*": null, base: space[3] },
  }),
  radioFieldsRadioGroup: css({
    gap: { "*": null, base: space[6] },
  }),
  radioFieldsRadioGroup2: css({
    gap: { "*": null, base: space[3] },
  }),
  horizontalFieldsFieldGroup: css({
    [select.descendant('[data-slot="field-content"]')]: {
      minWidth: space[48],
    },
  }),
}

const basicItems = [
  { label: "Choose an option", value: null },
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

const countryItems = [
  { label: "Select your country", value: null },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
]

const timezoneItems = [
  { label: "Select timezone", value: null },
  { label: "UTC", value: "utc" },
  { label: "Eastern Time", value: "est" },
  { label: "Pacific Time", value: "pst" },
]

const invalidItems = [
  { label: "This field has an error", value: null },
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

const disabledItems = [
  { label: "Cannot select", value: null },
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

const horizontalItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
]

@Component({
  selector: "field-example",
  imports: [
    Badge,
    Checkbox,
    Example,
    ExampleWrapper,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
    Input,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Slider,
    Switch,
    Textarea,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- InputFields -->
      <div kuiExample title="Input Fields">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="input-basic">Basic Input</label>
            <input kuiInput id="input-basic" placeholder="Enter text" />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-with-desc"
              >Input with Description</label
            >
            <input
              kuiInput
              id="input-with-desc"
              placeholder="Enter your username"
            />
            <p kuiFieldDescription>
              Choose a unique username for your account.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-desc-first">Email Address</label>
            <p kuiFieldDescription>We'll never share your email with anyone.</p>
            <input
              kuiInput
              id="input-desc-first"
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-required">
              Required Field
              <span [sx]="styles.inputFieldsSpan">*</span>
            </label>
            <input
              kuiInput
              id="input-required"
              placeholder="This field is required"
              required
            />
            <p kuiFieldDescription>This field must be filled out.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-disabled">Disabled Input</label>
            <input
              kuiInput
              id="input-disabled"
              placeholder="Cannot edit"
              disabled
            />
            <p kuiFieldDescription>This field is currently disabled.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-badge">
              Input with Badge
              <span kuiBadge variant="secondary" [sx]="styles.inputFieldsBadge"
                >Recommended</span
              >
            </label>
            <input kuiInput id="input-badge" placeholder="Enter value()" />
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="input-invalid">Invalid Input</label>
            <input
              kuiInput
              id="input-invalid"
              placeholder="This field has an error"
              aria-invalid="true"
            />
            <p kuiFieldDescription>This field contains validation errors.</p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="input-disabled-field"
              >Disabled Field</label
            >
            <input
              kuiInput
              id="input-disabled-field"
              placeholder="Cannot edit"
              disabled
            />
            <p kuiFieldDescription>This field is currently disabled.</p>
          </div>
        </div>
      </div>
      <!-- TextareaFields -->
      <div kuiExample title="Textarea Fields">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="textarea-basic">Basic Textarea</label>
            <textarea
              kuiTextarea
              id="textarea-basic"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-comments">Comments</label>
            <textarea
              kuiTextarea
              id="textarea-comments"
              placeholder="Share your thoughts..."
              [sx]="styles.textareaFieldsTextarea"
            ></textarea>
            <p kuiFieldDescription>Maximum 500 characters allowed.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-bio">Bio</label>
            <p kuiFieldDescription>
              Tell us about yourself in a few sentences.
            </p>
            <textarea
              kuiTextarea
              id="textarea-bio"
              placeholder="I am a..."
              [sx]="styles.textareaFieldsTextarea2"
            ></textarea>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-desc-after">Message</label>
            <textarea
              kuiTextarea
              id="textarea-desc-after"
              placeholder="Enter your message"
            ></textarea>
            <p kuiFieldDescription>
              Enter your message so it is long enough to test the layout.
            </p>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="textarea-invalid">Invalid Textarea</label>
            <textarea
              kuiTextarea
              id="textarea-invalid"
              placeholder="This field has an error"
              aria-invalid="true"
            ></textarea>
            <p kuiFieldDescription>This field contains validation errors.</p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="textarea-disabled-field"
              >Disabled Field</label
            >
            <textarea
              kuiTextarea
              id="textarea-disabled-field"
              placeholder="Cannot edit"
              disabled
            ></textarea>
            <p kuiFieldDescription>This field is currently disabled.</p>
          </div>
        </div>
      </div>
      <!-- SelectFields -->
      <div kuiExample title="Select Fields">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="select-basic">Basic Select</label>
            <ng-container kuiSelect [items]="basicItems">
              <button kuiSelectTrigger id="select-basic">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of basicItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="select-country">Country</label>
            <ng-container kuiSelect [items]="countryItems">
              <button kuiSelectTrigger id="select-country">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of countryItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <p kuiFieldDescription>
              Select the country where you currently reside.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="select-timezone">Timezone</label>
            <p kuiFieldDescription>
              Choose your local timezone for accurate scheduling.
            </p>
            <ng-container kuiSelect [items]="timezoneItems">
              <button kuiSelectTrigger id="select-timezone">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of timezoneItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="select-invalid">Invalid Select</label>
            <ng-container kuiSelect [items]="invalidItems">
              <button kuiSelectTrigger id="select-invalid" aria-invalid="true">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of invalidItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <p kuiFieldDescription>This field contains validation errors.</p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="select-disabled-field"
              >Disabled Field</label
            >
            <ng-container kuiSelect [items]="disabledItems" disabled>
              <button kuiSelectTrigger id="select-disabled-field">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of disabledItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <p kuiFieldDescription>This field is currently disabled.</p>
          </div>
        </div>
      </div>
      <!-- CheckboxFields -->
      <div kuiExample title="Checkbox Fields">
        <div kuiFieldGroup>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="checkbox-basic" defaultChecked></span>
            <label kuiFieldLabel for="checkbox-basic"
              >I agree to the terms and conditions</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <label kuiFieldLabel for="checkbox-right"
              >Accept terms and conditions</label
            >
            <span kuiCheckbox id="checkbox-right"></span>
          </div>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="checkbox-with-desc"></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="checkbox-with-desc"
                >Subscribe to newsletter</label
              >
              <p kuiFieldDescription>
                Receive weekly updates about new features and promotions.
              </p>
            </div>
          </div>
          <label kuiFieldLabel for="checkbox-with-title">
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="checkbox-with-title"></span>
              <div kuiFieldContent>
                <div kuiFieldTitle>Enable Touch ID</div>
                <p kuiFieldDescription>
                  Enable Touch ID to quickly unlock your device.
                </p>
              </div>
            </div>
          </label>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend variant="label">Preferences</legend>
            <p kuiFieldDescription>
              Select all that apply to customize your experience.
            </p>
            <div kuiFieldGroup [sx]="styles.checkboxFieldsFieldGroup">
              <div kuiField orientation="horizontal">
                <span kuiCheckbox id="pref-dark"></span>
                <label kuiFieldLabel for="pref-dark">Dark mode</label>
              </div>
              <div kuiField orientation="horizontal">
                <span kuiCheckbox id="pref-compact"></span>
                <label kuiFieldLabel for="pref-compact">Compact view</label>
              </div>
              <div kuiField orientation="horizontal">
                <span kuiCheckbox id="pref-notifications"></span>
                <label kuiFieldLabel for="pref-notifications"
                  >Enable notifications</label
                >
              </div>
            </div>
          </fieldset>
          <div kuiField data-invalid="true" orientation="horizontal">
            <span kuiCheckbox id="checkbox-invalid" aria-invalid="true"></span>
            <label kuiFieldLabel for="checkbox-invalid">Invalid checkbox</label>
          </div>
          <div kuiField data-disabled="true" orientation="horizontal">
            <span kuiCheckbox id="checkbox-disabled-field" disabled></span>
            <label kuiFieldLabel for="checkbox-disabled-field"
              >Disabled checkbox</label
            >
          </div>
        </div>
      </div>
      <!-- RadioFields -->
      <div kuiExample title="Radio Fields">
        <div kuiFieldGroup>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend variant="label">Subscription Plan</legend>
            <div kuiRadioGroup defaultValue="free">
              <div kuiField orientation="horizontal">
                <span kuiRadioGroupItem value="free" id="radio-free"></span>
                <label kuiFieldLabel for="radio-free">Free Plan</label>
              </div>
              <div kuiField orientation="horizontal">
                <span kuiRadioGroupItem value="pro" id="radio-pro"></span>
                <label kuiFieldLabel for="radio-pro">Pro Plan</label>
              </div>
              <div kuiField orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="enterprise"
                  id="radio-enterprise"
                ></span>
                <label kuiFieldLabel for="radio-enterprise">Enterprise</label>
              </div>
            </div>
          </fieldset>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend variant="label">Battery Level</legend>
            <p kuiFieldDescription>Choose your preferred battery level.</p>
            <div kuiRadioGroup>
              <div kuiField orientation="horizontal">
                <span kuiRadioGroupItem value="high" id="battery-high"></span>
                <label kuiFieldLabel for="battery-high">High</label>
              </div>
              <div kuiField orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="medium"
                  id="battery-medium"
                ></span>
                <label kuiFieldLabel for="battery-medium">Medium</label>
              </div>
              <div kuiField orientation="horizontal">
                <span kuiRadioGroupItem value="low" id="battery-low"></span>
                <label kuiFieldLabel for="battery-low">Low</label>
              </div>
            </div>
          </fieldset>
          <div kuiRadioGroup [sx]="styles.radioFieldsRadioGroup">
            <div kuiField orientation="horizontal">
              <span
                kuiRadioGroupItem
                value="option1"
                id="radio-content-1"
              ></span>
              <div kuiFieldContent>
                <label kuiFieldLabel for="radio-content-1"
                  >Enable Touch ID</label
                >
                <p kuiFieldDescription>
                  Enable Touch ID to quickly unlock your device.
                </p>
              </div>
            </div>
          </div>
          <div kuiRadioGroup [sx]="styles.radioFieldsRadioGroup2">
            <label kuiFieldLabel for="radio-title-1">
              <div kuiField orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="title1"
                  id="radio-title-1"
                ></span>
                <div kuiFieldContent>
                  <div kuiFieldTitle>Enable Touch ID</div>
                  <p kuiFieldDescription>
                    Enable Touch ID to quickly unlock your device.
                  </p>
                </div>
              </div>
            </label>
          </div>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend variant="label">Invalid Radio Group</legend>
            <div kuiRadioGroup>
              <div kuiField data-invalid="true" orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="invalid1"
                  id="radio-invalid-1"
                  aria-invalid="true"
                ></span>
                <label kuiFieldLabel for="radio-invalid-1"
                  >Invalid Option 1</label
                >
              </div>
              <div kuiField data-invalid="true" orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="invalid2"
                  id="radio-invalid-2"
                  aria-invalid="true"
                ></span>
                <label kuiFieldLabel for="radio-invalid-2"
                  >Invalid Option 2</label
                >
              </div>
            </div>
          </fieldset>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend variant="label">Disabled Radio Group</legend>
            <div kuiRadioGroup disabled>
              <div kuiField data-disabled="true" orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="disabled1"
                  id="radio-disabled-1"
                  disabled
                ></span>
                <label kuiFieldLabel for="radio-disabled-1"
                  >Disabled Option 1</label
                >
              </div>
              <div kuiField data-disabled="true" orientation="horizontal">
                <span
                  kuiRadioGroupItem
                  value="disabled2"
                  id="radio-disabled-2"
                  disabled
                ></span>
                <label kuiFieldLabel for="radio-disabled-2"
                  >Disabled Option 2</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <!-- SwitchFields -->
      <div kuiExample title="Switch Fields">
        <div kuiFieldGroup>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="switch-airplane">Airplane Mode</label>
              <p kuiFieldDescription>
                Turn on airplane mode to disable all connections.
              </p>
            </div>
            <span kuiSwitch id="switch-airplane"></span>
          </div>
          <div kuiField orientation="horizontal">
            <label kuiFieldLabel for="switch-dark">Dark Mode</label>
            <span kuiSwitch id="switch-dark"></span>
          </div>
          <div kuiField orientation="horizontal">
            <span kuiSwitch id="switch-marketing"></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="switch-marketing"
                >Marketing Emails</label
              >
              <p kuiFieldDescription>
                Receive emails about new products, features, and more.
              </p>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel>Privacy Settings</label>
            <p kuiFieldDescription>Manage your privacy preferences.</p>
            <div kuiField orientation="horizontal">
              <span kuiSwitch id="switch-profile" defaultChecked></span>
              <label kuiFieldLabel for="switch-profile"
                >Make profile visible to others</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span kuiSwitch id="switch-email"></span>
              <label kuiFieldLabel for="switch-email"
                >Show email on profile</label
              >
            </div>
          </div>
          <div kuiField data-invalid="true" orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="switch-invalid">Invalid Switch</label>
              <p kuiFieldDescription>This switch has validation errors.</p>
            </div>
            <span kuiSwitch id="switch-invalid" aria-invalid="true"></span>
          </div>
          <div kuiField data-disabled="true" orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="switch-disabled-field"
                >Disabled Switch</label
              >
              <p kuiFieldDescription>This switch is currently disabled.</p>
            </div>
            <span kuiSwitch id="switch-disabled-field" disabled></span>
          </div>
        </div>
      </div>
      <!-- SliderFields -->
      <div kuiExample title="Slider Fields">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="slider-volume">Volume</label>
            <div
              kuiSlider
              id="slider-volume"
              [(value)]="volume"
              [max]="100"
              [step]="1"
            ></div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="slider-brightness"
              >Screen Brightness</label
            >
            <div
              kuiSlider
              id="slider-brightness"
              [(value)]="brightness"
              [max]="100"
              [step]="5"
            ></div>
            <p kuiFieldDescription>
              Current brightness:
              {{ brightness()[0] }}%
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="slider-quality">Video Quality</label>
            <p kuiFieldDescription>Higher quality uses more bandwidth.</p>
            <div
              kuiSlider
              id="slider-quality"
              [defaultValue]="[720]"
              [max]="1080"
              [min]="360"
              [step]="360"
            ></div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="slider-temperature"
              >Temperature Range</label
            >
            <div
              kuiSlider
              id="slider-temperature"
              [(value)]="temperature"
              [min]="0"
              [max]="1"
              [step]="0.1"
            ></div>
            <p kuiFieldDescription>
              Range:
              {{ temperature()[0].toFixed(1) }}
              -
              {{ temperature()[1].toFixed(1) }}
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="slider-price-range">Price Range</label>
            <div
              kuiSlider
              id="slider-price-range"
              [(value)]="priceRange"
              [max]="100"
              [step]="5"
            ></div>
            <p kuiFieldDescription>
              \${{ priceRange()[0] }}- \${{ priceRange()[1] }}
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="slider-color-balance"
              >Color Balance</label
            >
            <div
              kuiSlider
              id="slider-color-balance"
              [(value)]="colorBalance"
              [max]="100"
              [step]="10"
            ></div>
            <p kuiFieldDescription>
              Red:
              {{ colorBalance()[0] }}%, Green: {{ colorBalance()[1] }}%, Blue:
              {{ colorBalance()[2] }}%
            </p>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="slider-invalid">Invalid Slider</label>
            <div
              kuiSlider
              id="slider-invalid"
              [defaultValue]="[30]"
              [max]="100"
              aria-invalid="true"
            ></div>
            <p kuiFieldDescription>This slider has validation errors.</p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="slider-disabled-field"
              >Disabled Slider</label
            >
            <div
              kuiSlider
              id="slider-disabled-field"
              [defaultValue]="[50]"
              [max]="100"
              disabled
            ></div>
            <p kuiFieldDescription>This slider is currently disabled.</p>
          </div>
        </div>
      </div>
      <!-- NativeSelectFields -->
      <div kuiExample title="Native Select Fields">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="native-select-basic"
              >Basic Native Select</label
            >
            <div kuiNativeSelect id="native-select-basic">
              <option kuiNativeSelectOption value="">Choose an option</option>
              <option kuiNativeSelectOption value="option1">Option 1</option>
              <option kuiNativeSelectOption value="option2">Option 2</option>
              <option kuiNativeSelectOption value="option3">Option 3</option>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="native-select-country">Country</label>
            <div kuiNativeSelect id="native-select-country">
              <option kuiNativeSelectOption value="">
                Select your country
              </option>
              <option kuiNativeSelectOption value="us">United States</option>
              <option kuiNativeSelectOption value="uk">United Kingdom</option>
              <option kuiNativeSelectOption value="ca">Canada</option>
            </div>
            <p kuiFieldDescription>
              Select the country where you currently reside.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="native-select-timezone">Timezone</label>
            <p kuiFieldDescription>
              Choose your local timezone for accurate scheduling.
            </p>
            <div kuiNativeSelect id="native-select-timezone">
              <option kuiNativeSelectOption value="">Select timezone</option>
              <option kuiNativeSelectOption value="utc">UTC</option>
              <option kuiNativeSelectOption value="est">Eastern Time</option>
              <option kuiNativeSelectOption value="pst">Pacific Time</option>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="native-select-grouped"
              >Grouped Options</label
            >
            <div kuiNativeSelect id="native-select-grouped">
              <option kuiNativeSelectOption value="">Select a region</option>
              <optgroup kuiNativeSelectOptGroup label="North America">
                <option kuiNativeSelectOption value="us">United States</option>
                <option kuiNativeSelectOption value="ca">Canada</option>
                <option kuiNativeSelectOption value="mx">Mexico</option>
              </optgroup>
              <optgroup kuiNativeSelectOptGroup label="Europe">
                <option kuiNativeSelectOption value="uk">United Kingdom</option>
                <option kuiNativeSelectOption value="fr">France</option>
                <option kuiNativeSelectOption value="de">Germany</option>
              </optgroup>
            </div>
            <p kuiFieldDescription>
              Native select with grouped options using optgroup.
            </p>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="native-select-invalid"
              >Invalid Native Select</label
            >
            <div kuiNativeSelect id="native-select-invalid" aria-invalid="true">
              <option kuiNativeSelectOption value="">
                This field has an error
              </option>
              <option kuiNativeSelectOption value="option1">Option 1</option>
              <option kuiNativeSelectOption value="option2">Option 2</option>
              <option kuiNativeSelectOption value="option3">Option 3</option>
            </div>
            <p kuiFieldDescription>This field contains validation errors.</p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="native-select-disabled-field"
              >Disabled Field</label
            >
            <div kuiNativeSelect id="native-select-disabled-field" disabled>
              <option kuiNativeSelectOption value="">Cannot select</option>
              <option kuiNativeSelectOption value="option1">Option 1</option>
              <option kuiNativeSelectOption value="option2">Option 2</option>
              <option kuiNativeSelectOption value="option3">Option 3</option>
            </div>
            <p kuiFieldDescription>This field is currently disabled.</p>
          </div>
        </div>
      </div>
      <!-- InputOTPFields -->
      <div kuiExample title="OTP Input Fields">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="otp-basic">Verification Code</label>
            <div kuiInputOTP id="otp-basic" [maxLength]="6">
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="0"></div>
                <div kuiInputOTPSlot [index]="1"></div>
                <div kuiInputOTPSlot [index]="2"></div>
                <div kuiInputOTPSlot [index]="3"></div>
                <div kuiInputOTPSlot [index]="4"></div>
                <div kuiInputOTPSlot [index]="5"></div>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="otp-with-desc">Enter OTP</label>
            <div
              kuiInputOTP
              id="otp-with-desc"
              [maxLength]="6"
              [(value)]="value"
            >
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="0"></div>
                <div kuiInputOTPSlot [index]="1"></div>
                <div kuiInputOTPSlot [index]="2"></div>
                <div kuiInputOTPSlot [index]="3"></div>
                <div kuiInputOTPSlot [index]="4"></div>
                <div kuiInputOTPSlot [index]="5"></div>
              </div>
            </div>
            <p kuiFieldDescription>
              Enter the 6-digit code sent to your email.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="otp-separator"
              >Two-Factor Authentication</label
            >
            <div kuiInputOTP id="otp-separator" [maxLength]="6">
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="0"></div>
                <div kuiInputOTPSlot [index]="1"></div>
                <div kuiInputOTPSlot [index]="2"></div>
              </div>
              <div kuiInputOTPSeparator></div>
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="3"></div>
                <div kuiInputOTPSlot [index]="4"></div>
                <div kuiInputOTPSlot [index]="5"></div>
              </div>
            </div>
            <p kuiFieldDescription>
              Enter the code from your authenticator app.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="otp-pin">PIN Code</label>
            <div
              kuiInputOTP
              id="otp-pin"
              [maxLength]="4"
              type="numeric"
              [(value)]="pinValue"
            >
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="0"></div>
                <div kuiInputOTPSlot [index]="1"></div>
                <div kuiInputOTPSlot [index]="2"></div>
                <div kuiInputOTPSlot [index]="3"></div>
              </div>
            </div>
            <p kuiFieldDescription>Enter your 4-digit PIN (numbers only).</p>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="otp-invalid">Invalid OTP</label>
            <div kuiInputOTP id="otp-invalid" [maxLength]="6">
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="0" aria-invalid="true"></div>
                <div kuiInputOTPSlot [index]="1" aria-invalid="true"></div>
                <div kuiInputOTPSlot [index]="2" aria-invalid="true"></div>
                <div kuiInputOTPSlot [index]="3" aria-invalid="true"></div>
                <div kuiInputOTPSlot [index]="4" aria-invalid="true"></div>
                <div kuiInputOTPSlot [index]="5" aria-invalid="true"></div>
              </div>
            </div>
            <p kuiFieldDescription>
              This OTP field contains validation errors.
            </p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="otp-disabled-field">Disabled OTP</label>
            <div kuiInputOTP id="otp-disabled-field" [maxLength]="6" disabled>
              <div kuiInputOTPGroup>
                <div kuiInputOTPSlot [index]="0"></div>
                <div kuiInputOTPSlot [index]="1"></div>
                <div kuiInputOTPSlot [index]="2"></div>
                <div kuiInputOTPSlot [index]="3"></div>
                <div kuiInputOTPSlot [index]="4"></div>
                <div kuiInputOTPSlot [index]="5"></div>
              </div>
            </div>
            <p kuiFieldDescription>This OTP field is currently disabled.</p>
          </div>
        </div>
      </div>
      <!-- HorizontalFields -->
      <div kuiExample title="Horizontal Fields">
        <div kuiFieldGroup [sx]="styles.horizontalFieldsFieldGroup">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="horizontal-input">Username</label>
              <p kuiFieldDescription>Enter your preferred username.</p>
            </div>
            <input kuiInput id="horizontal-input" placeholder="johndoe" />
          </div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="horizontal-textarea">Bio</label>
              <p kuiFieldDescription>
                Write a short description about yourself.
              </p>
            </div>
            <textarea
              kuiTextarea
              id="horizontal-textarea"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="horizontal-switch"
                >Email Notifications</label
              >
              <p kuiFieldDescription>
                Receive email updates about your account.
              </p>
            </div>
            <span kuiSwitch id="horizontal-switch"></span>
          </div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="horizontal-select"
                >Favorite Fruit</label
              >
              <p kuiFieldDescription>Choose your favorite fruit.</p>
            </div>
            <ng-container kuiSelect [items]="horizontalItems">
              <button kuiSelectTrigger id="horizontal-select">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of horizontalItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="horizontal-native-select"
                >Country</label
              >
              <p kuiFieldDescription>Select your country.</p>
            </div>
            <div kuiNativeSelect id="horizontal-native-select">
              <option kuiNativeSelectOption value="">Select a country</option>
              <option kuiNativeSelectOption value="us">United States</option>
              <option kuiNativeSelectOption value="uk">United Kingdom</option>
              <option kuiNativeSelectOption value="ca">Canada</option>
            </div>
          </div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="horizontal-slider">Volume</label>
              <p kuiFieldDescription>Adjust the volume() level.</p>
            </div>
            <div
              kuiSlider
              id="horizontal-slider"
              [defaultValue]="[50]"
              [max]="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class FieldExample {
  protected readonly volume = signal([50])
  protected readonly brightness = signal([75])
  protected readonly temperature = signal([0.3, 0.7])
  protected readonly priceRange = signal([25, 75])
  protected readonly colorBalance = signal([10, 20, 70])
  protected readonly value = signal("")
  protected readonly pinValue = signal("")
  protected readonly styles = styles
  protected readonly basicItems = basicItems
  protected readonly countryItems = countryItems
  protected readonly timezoneItems = timezoneItems
  protected readonly invalidItems = invalidItems
  protected readonly disabledItems = disabledItems
  protected readonly horizontalItems = horizontalItems
}
