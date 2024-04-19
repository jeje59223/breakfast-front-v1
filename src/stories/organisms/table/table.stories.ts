import type { Meta, StoryObj } from '@storybook/vue3'
import Table from '@/components/organisms/table/Table.vue'
import { fakeUsers2 } from '../../../../tests/data/user'

const meta: Meta<typeof Table> = {
    component: Table
}

export default meta
type Story = StoryObj<typeof Table>

export const TableDefault: Story = {
    args: {
        users: fakeUsers2
    }
}
