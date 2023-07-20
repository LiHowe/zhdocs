import baseConfig from '@zhdocs/config'
import { resolve } from 'node:path'

export default {
  ...baseConfig({
    title: "Three.js 笔记",
    base: '/three/',
    description: "Three.js 学习笔记",
    outDir: resolve(__dirname, '../../../../dist/three'),
    themeConfig: {
      sidebar: [
        {
          text: '笔记目录',
          items: [
            { text: '起步', link: '/startup' },
            { text: '弹射起步', link: '/turbo_startup' },
            { text: '3D物体', link: '/object3d' },
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
            {
              text: '场景',
              link: '/scene/index.md'
            },
            {
              text: '渲染器',
              link: '/renderer/index.md'
            },
            {
              text: '灯光',
              link: '/light/index.md'
            },
            {
              text: '模型',
              link: '/model/index.md',
              items: [
                { text: '加载模型', link: '/model/load_model.md'}
              ]
            },
          ]
        }
      ],
    }
  })
}
