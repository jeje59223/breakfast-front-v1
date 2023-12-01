import type { Meta, StoryObj } from '@storybook/vue3'
import Connexion from "../../../components/molecules/connexion/Connexion.vue"

const meta: Meta<typeof Connexion> = {
    component: Connexion,
}

export default meta
type Story = StoryObj<typeof Connexion>

export const DefaultConnexion: Story = {}
