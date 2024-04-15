import type { Meta, StoryObj } from '@storybook/vue3'
import SlideBar from '../../../components/molecules/slide-bar/SlideBar.vue'
import { userMoke } from '../../../../tests/data/user'
import { vueRouter } from 'storybook-vue3-router'

const meta: Meta<typeof SlideBar> = {
    component: SlideBar,
    template: `
    <router-view-wrapper>
      <router-view />
    </router-view-wrapper>
  `
};

meta.decorators = [
    vueRouter()
]

export default meta;
type Story = StoryObj<typeof SlideBar>;

export const SlideBarDefault: Story = {
    args: {
        user: userMoke
    }
};
