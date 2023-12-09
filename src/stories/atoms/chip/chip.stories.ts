import type { Meta, StoryObj } from '@storybook/vue3'
import Chip from "../../../components/atoms/chip/Chip.vue"

const meta: Meta<typeof Chip> = {
    component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const SimpleChip: Story = {
    args: {
        color: '#2c3e50',
        density: 'compact',
        label: true,
        text: "I'm chip"
    }
}

export const ChipWithLeftIcon: Story = {
    args: {
        color: '#007f8c',
        density: 'default',
        label: true,
        text: "I'm chip with left icon",
        prependIcon: 'mdi-heart'
    }
}

export const ChipWithRightIcon: Story = {
    args: {
        color: 'red',
        density: 'default',
        label: true,
        text: "I'm chip with right icon",
        appendIcon: 'mdi-panda'
    }
}

export const ChipWithRightAndLeftIcon: Story = {
    args: {
        color: 'brown',
        density: 'default',
        label: true,
        text: "I'm chip poop",
        appendIcon: 'mdi-emoticon-poop',
        prependIcon: 'mdi-emoticon-poop'
    }
}
