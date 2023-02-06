import { defineConfig, type UserConfig } from 'vitepress'
import markdownItMermaidx from './markdown-it-mermaidx'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { GTM, Verification, Icon, Algolia } from './head'

const baseConfig: UserConfig = {
  title: 'zhDocs',
  titleTemplate: ':title - zhDocs',
  lang: 'zh-CN',
  base: '/',
  outDir: '/dist',
  lastUpdated: true,
  cleanUrls: 'with-subfolders',
  head: [
    ...GTM,
    ...Verification,
    ...Icon,
    ...Algolia,
    ['link', { rel: 'shortcut icon', type:"image/png", href:"/favicon.png"}],
  ],
  themeConfig: {
    logo: '/favicon.png',
    sidebar: [],
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
      appId: '50P2UST84K',
      apiKey: 'b67b07549fbcb9a70f3c53b1c3a699ac',
      indexName: 'netlify_1249c6f4-71c3-4983-a0a0-718cc7cf98ed_master_all',
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
}

function buildSitemap(pages: string[], outDir: string) {
  const host = 'https://docs.hzzzh.tech/'
  const sites: string[] = pages.map(str => host + str.replace('.md', ''))
  writeFileSync(join(outDir, 'sitemap.txt') ,sites.join('\n'))
}

function deepMerge(o: Record<string, any>, n: Record<string, any>): Record<string, any> {
  const res: Record<string, any> = {}
  for (let key in o) {
    if (Object.prototype.toString.call(o[key]).slice(8, -1) === 'Object' && n[key] !== undefined) {
      res[key] = deepMerge(o[key], n[key])
    } else {
      res[key] = n[key] ?? o[key]
    }
  }
  return res
}

export default (config: UserConfig) => defineConfig(deepMerge(baseConfig, config))
