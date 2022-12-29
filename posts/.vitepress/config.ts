import { defineConfig } from 'vitepress'
import markdownItMermaidx from './plugin/markdown-it-mermaidx'
import { fabricSidebar } from './sidebar/fabric'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

export default defineConfig({
  title: 'zhDocs',
  lang: 'zh-CN',
  base: '/',
  outDir: '../dist',
  lastUpdated: true,
  head: [
    ['link', { rel: 'shortcut icon', type:"image/png", href:"/favicon.png"}],
    ['link', { rel: 'stylesheet', href:"https://at.alicdn.com/t/c/font_3805125_g7vhmszhwhq.css"}],
    ['meta', { name: 'baidu-site-verification', content: 'code-ba8rWWSLaq' }],
    ['meta', { name: 'google-site-verification', content: 'YqU4J_mHcs31yFT50uAtgZXtmZKROaIfx8OU99aZRlc' }],
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-HTB2VJ8RJL' }],
    ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HTB2VJ8RJL');
  `]
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
    algolia: {
      appId: 'LQDYDCVDD1',
      apiKey: 'b67b07549fbcb9a70f3c53b1c3a699ac',
      indexName: 'docs',
    }
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
  buildEnd(siteConfig) {
    buildSitemap(siteConfig.pages, siteConfig.outDir)
  }
})

function buildSitemap(pages: string[], outDir: string) {
  const host = 'https://docs.hzzzh.tech/'
  const sites: string[] = pages.map(str => host + str.replace('.md', '.html'))
  writeFileSync(join(outDir, 'sitemap.txt') ,sites.join('\n'))
}
