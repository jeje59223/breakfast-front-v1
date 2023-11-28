import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../../../components/atoms/button/Button.vue';

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonWithLeftIcon: Story = {
    args: {
        text: "I'm the button",
        variant: 'elevated',
        color: 'red',
        size: 'x-large',
        withIcon: true,
        leftIcon: true,
        icon: 'mdi-cancel',
        tnrId: 'the-button',
    },
};

export const PrimaryRightIcon: Story = {
    args: {
        text: "I'm the button with right icon",
        variant: 'elevated',
        color: '#34495e',
        size: 'x-small',
        withIcon: true,
        leftIcon: true,
        icon: 'mdi-heart',
        tnrId: 'the-button',
    },
};
