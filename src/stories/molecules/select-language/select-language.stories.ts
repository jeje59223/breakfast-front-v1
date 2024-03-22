import type { Meta, StoryObj } from '@storybook/vue3'
import SelectLanguage from '../../../components/molecules/select-language/SelectLanguage.vue'

const meta: Meta<typeof SelectLanguage> = {
    component: SelectLanguage,
    decorators: [() => ({ template: '<div style="width: 100%;"><story /></div>' })],
}

export default meta
type Story = StoryObj<typeof SelectLanguage>

export const SelectLanguageDefault: Story = {}
