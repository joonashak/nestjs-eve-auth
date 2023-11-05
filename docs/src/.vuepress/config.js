const { description } = require('../../package')

module.exports = {
  base: '/nestjs-eve-auth/',
  title: 'nestjs-eve-auth',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: 'joonashak/nestjs-eve-auth',
    editLinks: true,
    docsDir: 'docs/src',
    docsBranch: "main",
    editLinkText: '',
    lastUpdated: true,
    nav: [
    ],
    sidebar: {
      // '/guide/': [
      //   {
      //     title: 'Guide',
      //     collapsable: false,
      //     children: [
      //       '',
      //       'using-vue',
      //     ]
      //   }
      // ],
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
