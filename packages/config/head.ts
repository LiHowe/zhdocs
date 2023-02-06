
import type { HeadConfig } from 'vitepress'
export const Verification: HeadConfig[] = [
  ["meta", { name: "baidu-site-verification", content: "code-ba8rWWSLaq" }],
  [
    "meta",
    {
      name: "google-site-verification",
      content: "YqU4J_mHcs31yFT50uAtgZXtmZKROaIfx8OU99aZRlc",
    },
  ],
];

export const GTM: HeadConfig[] = [
  [
    "script",
    {
      async: "true",
      src: "https://www.googletagmanager.com/gtag/js?id=G-2JY9M01P7D",
    },
  ],
  [
    "script",
    {},
    `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-2JY9M01P7D');
  `,
  ],
  [
    "script",
    {},
    `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W9CGTJN');
    `,
  ],
];


export const Icon: HeadConfig[] = [
  ['link', { rel: 'stylesheet', href:"https://at.alicdn.com/t/c/font_3805125_g7vhmszhwhq.css"}]
]

export const Algolia: HeadConfig[] = [
  ['link', { rel: 'stylesheet', href:"https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" }],
  ['script', {
    async: 'true',
    src: 'https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js'
  }],
  ['script', {
    src: `
    algoliasearchNetlify({
      appId: '50P2UST84K',
      apiKey: '6e1aee62d00eb037fe3e1a27b35e3d35ab9d8c062f6a2ebc5ba89157f637dd80',
      siteId: '1249c6f4-71c3-4983-a0a0-718cc7cf98ed',
      branch: 'master',
      selector: 'div#search',
    });
    `
  }]
]
