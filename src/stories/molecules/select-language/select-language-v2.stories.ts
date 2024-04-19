import type { Meta, StoryObj } from '@storybook/vue3'
import SelectLanguageV2 from '@/components/molecules/select-language/SelectLanguageV2.vue'
import { fakeUsers2 } from '../../../../tests/data/user'

const meta: Meta<typeof SelectLanguageV2> = {
    component: SelectLanguageV2
}

export default meta
type Story = StoryObj<typeof SelectLanguageV2>

export const SelectLanguageV2Default: Story = {
    args: {}
}
