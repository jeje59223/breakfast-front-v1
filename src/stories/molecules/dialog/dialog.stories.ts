import type { Meta, StoryObj } from '@storybook/vue3'
import Dialog from '../../../components/molecules/dialog-alert/Dialog.vue'

const meta: Meta<typeof Dialog> = {
    component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogDefault: Story = {
    args: {
        title: 'This is a Dialog component',
        content: 'I am a dialog component',
        displayDialog: true,
    }
}
