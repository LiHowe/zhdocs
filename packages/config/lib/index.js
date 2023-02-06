"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitepress_1 = require("vitepress");
const markdown_it_mermaidx_1 = require("./markdown-it-mermaidx");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const head_1 = require("./head");
const baseConfig = {
    title: 'zhDocs',
    titleTemplate: ':title - zhDocs',
    lang: 'zh-CN',
    base: '/',
    outDir: '/dist',
    lastUpdated: true,
    cleanUrls: 'with-subfolders',
    head: [
        ...head_1.GTM,
        ...head_1.Verification,
        ...head_1.Icon,
        ...head_1.Algolia,
        ['link', { rel: 'shortcut icon', type: "image/png", href: "/favicon.png" }],
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
            md.use(markdown_it_mermaidx_1.default);
        }
    },
    buildEnd(siteConfig) {
        buildSitemap(siteConfig.pages, siteConfig.outDir);
    }
};
function buildSitemap(pages, outDir) {
    const host = 'https://docs.hzzzh.tech/';
    const sites = pages.map(str => host + str.replace('.md', ''));
    (0, node_fs_1.writeFileSync)((0, node_path_1.join)(outDir, 'sitemap.txt'), sites.join('\n'));
}
function deepMerge(o, n) {
    const res = {};
    for (let key in o) {
        if (Object.prototype.toString.call(o[key]).slice(8, -1) === 'Object' && n[key] !== undefined) {
            res[key] = deepMerge(o[key], n[key]);
        }
        else {
            res[key] = n[key] ?? o[key];
        }
    }
    return res;
}
exports.default = (config) => (0, vitepress_1.defineConfig)(deepMerge(baseConfig, config));
