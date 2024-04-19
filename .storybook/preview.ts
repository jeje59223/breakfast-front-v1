import type { Preview } from '@storybook/vue3'
import { setup } from "@storybook/vue3";
import { registerPlugins } from "../src/plugins"
import { createPinia } from 'pinia'

const pinia = createPinia();

setup((app) => {
  // Registers your app's plugins into Storybook
  registerPlugins(app);
  app.use(pinia);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
