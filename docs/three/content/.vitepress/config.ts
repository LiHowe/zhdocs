import { defineConfig } from 'vitepress'

import baseConfig from '@zhdocs/config'
import { resolve } from 'node:path'

// https://vitepress.dev/reference/site-config
export default {
  ...baseConfig({
    title: "Three Tutorial",
    description: "Three.js Toturial",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' }
      ],

      sidebar: [
        {
          text: '教程',
          items: [
            { text: '起步', link: '/startup' },
            {
              text: '相机',
              link: '/camera/camera',
              items: [
                { text: '正交相机', link: '/camera/orthographic_camera' },
                { text: '透视相机', link: '/camera/perspective_camera' },
                { text: '相机阵列', link: '/camera/array_camera' },
                { text: '立方相机', link: '/camera/cube_camera' },
                { text: '立体相机', link: '/camera/stereo_camera' },
              ]
            },
            { text: '加载模型', link: '/load_model' },
          ]
        }
      ],
    }
  })
}
