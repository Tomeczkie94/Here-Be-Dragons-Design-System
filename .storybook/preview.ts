import React from 'react'
import type { Preview } from '@storybook/react'
import '../colors_and_type.css'

;(globalThis as any).React = React

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'parchment',
      values: [
        { name: 'parchment', value: '#f5ecd7' },
        { name: 'ink', value: '#1a1410' }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
