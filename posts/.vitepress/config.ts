import { defineConfig } from 'vitepress'
import markdownItMermaidx from './plugin/markdown-it-mermaidx'
import { fabricSidebar } from './sidebar/fabric'

export default defineConfig({
  title: 'zhDocs',
  lang: 'zh-CN',
  base: '/',
  outDir: '../dist',
  lastUpdated: true,
  head: [
    ['link', { rel: 'shortcut icon', type:"image/png", href:"/favicon.png"}],
    ['link', { rel: 'stylesheet', href:"https://at.alicdn.com/t/c/font_3805125_cozu3b9g23v.css"}],
    ['meta', { name: 'baidu-site-verification', content: 'code-ba8rWWSLaq' }],
    ['meta', { name: 'google-site-verification', content: 'YqU4J_mHcs31yFT50uAtgZXtmZKROaIfx8OU99aZRlc' }],
  ],
  themeConfig: {
    logo: '/favicon.png',
    sidebar: {
      '/fabric/': fabricSidebar
    },
    footer: {
      message: 'Build with ❤️ in HangZhou',
      copyright: 'Copyright © 2022-present <a href="https://github.com/lihowe">Howe</a>'
    },
    outlineTitle: '目录',
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lihowe/canvas' }
    ],
    docFooter: {
      prev: '上一节',
      next: '下一节'
    },
    lastUpdatedText: '最后更新时间',
  },
  markdown: {
    toc: {
      level: [2, 3]
    },
    lineNumbers: true,
    config: (md) => {
      md.use(markdownItMermaidx)
    }
  },
})
