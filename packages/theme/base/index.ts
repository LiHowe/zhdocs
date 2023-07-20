import DefaultTheme from 'vitepress/theme'
import Mermaid from '../plugins/mermaid'

import { Demo, Image, Icon, Grid } from '@zhdocs/components'

import NotFound from './NotFound.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './main.css'
import type { Theme } from 'vitepress'

const theme: Theme = {
  NotFound,
  Layout: DefaultTheme.Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('Demo', Demo)
    ctx.app.component('h-mermaid', Mermaid)
    ctx.app.component('Image', Image)
    ctx.app.component('Grid', Grid)
    ctx.app.component('Icon', Icon)
    ctx.app.use(ElementPlus, { size: 'small' })
  }
}

export default theme
