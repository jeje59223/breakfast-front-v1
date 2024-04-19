import type { Meta, StoryObj } from '@storybook/vue3'
import French from '@/components/atoms/french/French.vue'

const meta: Meta<typeof French> = {
    component: French
}

export default meta
type Story = StoryObj<typeof French>

export const FrenchDefault: Story = {
    args: {
        isSelected: true
    }
}
