import type { Meta, StoryObj } from '@storybook/vue3'
import English from '@/components/atoms/english/English.vue'

const meta: Meta<typeof English> = {
    component: English
}

export default meta
type Story = StoryObj<typeof English>

export const EnglishDefault: Story = {
    args: {
        isSelected: false
    }
}
