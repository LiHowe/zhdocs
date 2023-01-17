import DefaultTheme from 'vitepress/theme'
import Mermaid from '../components/Mermaid'

import Demo from '../components/Demo.vue'
import Image from '../components/Image.vue'
import Icon from '../components/Icon.vue'

import NotFound from './NotFound.vue'
// import Layout from './Layout.vue'

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
    ctx.app.component('Icon', Icon)
    ctx.app.use(ElementPlus, { size: 'small' })
  }
}

export default theme
