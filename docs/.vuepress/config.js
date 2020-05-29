module.exports = {
  theme: 'default-vue-a11y',
  title: 'Vue accessible multiselect',
  head: [
    ['meta', { name: 'theme-color', content: '#fff' }],
  ],
  themeConfig: {
    home: false,
    repo: 'vue-a11y/vue-accessible-multiselect',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          }
        ],
        sidebar: [
          '/',
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/guide/',
              '/guide/usage.md',
              '/guide/api.md',
              '/guide/keyboard.md',
            ]
          }
        ]
      }
    }
  }
}