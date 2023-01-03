const perfix = '/fabric'
const t = (path: string) => `${perfix}/tutorial/${path}`
const s = (path: string) => `${perfix}/source/${path}`
// demo path
const d = (path: string) => `${perfix}/demos/${path}/index.md`

export const fabricSidebar = [
  {
    text: '教程',
    collapsible: true,
    items: [
      {
        text: '介绍',
        link: t('index')
      },
      {
        text: '初始化',
        link: t('init')
      },
      {
        text: '绘制图形',
        link: t('shape')
      },
      {
        text: '绘制路径',
        link: t('path')
      },
      {
        text: '绘制文字',
        link: t('text')
      },
      {
        text: '绘制图片',
        link: t('image')
      },
      {
        text: '图片滤镜',
        link: t('imageFilter')
      },
      {
        text: '组合',
        link: t('group')
      },
      {
        text: '画笔',
        link: t('freeDraw')
      },
      {
        text: '交互',
        link: t('interaction')
      },
      {
        text: '事件',
        link: t('event')
      },
      {
        text: '动画',
        link: t('animation')
      },
      {
        text: '自定义样式',
        link: t('customization')
      },
      {
        text: '自定义图形',
        link: t('createClass')
      },
      {
        text: '自定义控制点',
        link: t('customControl')
      },
      {
        text: '序列化',
        link: t('serialization')
      },
    ]
  },
  {
    text: '源码解析',
    collapsible: true,
    items: [
      {
        text: '目录结构',
        link: s('structure')
      },
      {
        text: '初始化',
        link: s('canvas')
      },
      {
        text: '对象',
        link: s('object'),
      },
      {
        text: '图形',
        items: [
          {
            text: '矩形',
            link: s('rect')
          },
          {
            text: '圆形',
            link: s('circle')
          },
          {
            text: '三角形',
            link: s('triangle')
          },
          {
            text: '椭圆形',
            link: s('ellipse')
          },
          {
            text: '线段',
            link: s('line')
          },
          {
            text: '多边形&折线',
            link: s('polygon')
          },
          {
            text: '路径',
            link: s('path')
          },
        ]
      },
      {
        text: '笔刷',
        link: s('brush')
      },
      {
        text: '图片',
        link: s('image')
      },
      {
        text: '文字',
        link: s('text')
      },
      {
        text: '组合',
        link: s('group')
      },
      {
        text: '渲染',
        link: s('renderer')
      },
      {
        text: '事件',
        link: s('event')
      },
      {
        text: '动画',
        link: s('animation')
      },
    ]
  },
  {
    text: 'Demos',
    items: [
      {
        text: 'MiniMap',
        link: d('minimap'),
      },
      {
        text: '范围限制',
        link: d('limits'),
      }
    ]
  },
  {
    text: '相关链接',
    items: [
      {
        text: 'Fabricjs官网',
        link: 'http://fabricjs.com/'
      }
    ]
  }
]
