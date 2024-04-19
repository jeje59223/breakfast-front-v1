import type { Meta, StoryObj } from '@storybook/vue3'
import DataTable from '@/components/organisms/data-table/DataTable.vue'
import { fakeUsers2 } from '../../../../tests/data/user'

const meta: Meta<typeof DataTable> = {
    component: DataTable
}

export default meta
type Story = StoryObj<typeof DataTable>

export const DatatableDefault: Story = {
    args: {
        users: fakeUsers2
    }
}
