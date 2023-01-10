import DefaultTheme from 'vitepress/theme'
import Mermaid from '../components/Mermaid'

import Demo from '../components/Demo.vue'
import Image from '../components/Image.vue'
import Button from '../components/Btn.vue'
import Checkbox from '../components/Cbx.vue'
import Icon from '../components/Icon.vue'

import NotFound from './NotFound.vue'
import Layout from './Layout.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './main.scss'
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
    // TODO: replace the components below to element-plus
    ctx.app.component('Btn', Button)
    ctx.app.component('Cbx', Checkbox)
    ctx.app.use(ElementPlus, { size: 'small' })
  }
}

export default theme
