import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ChainTrails | Docs",
  description: "Docs related to node/validator setups.",
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Networks',
          collapsed: false,
          items: [
            {
              text: 'Initia',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/networks/initia/' },
                { text: 'Setup', link: '/networks/initia/setup' },
                { text: 'Snapshots', link: '/networks/initia/snapshots' }
              ]
            },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})