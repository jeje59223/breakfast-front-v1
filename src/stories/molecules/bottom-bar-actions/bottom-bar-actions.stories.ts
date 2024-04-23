import type { Meta, StoryObj } from '@storybook/vue3'
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue'

const meta: Meta<typeof BottomBarActions> = {
    component: BottomBarActions,
}

export default meta;
type Story = StoryObj<typeof BottomBarActions>

export const BottomBarActionsDefault: Story = {
    args: {
        text: 'Sauvegarder'
    },
};
