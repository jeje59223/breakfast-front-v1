import type { Meta, StoryObj } from '@storybook/vue3'
import SlideBar from '../../../components/molecules/slide-bar/SlideBar.vue'
import { userMoke } from '../../../../tests/data/user'

const meta: Meta<typeof SlideBar> = {
    component: SlideBar,
};

export default meta;
type Story = StoryObj<typeof SlideBar>;

export const SlideBarDefault: Story = {
    args: {
        user: userMoke
    }
};
