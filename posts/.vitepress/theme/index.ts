import DefaultTheme from 'vitepress/theme'
import Mermaid from '../components/Mermaid'

import Demo from '../components/Demo.vue'
import Image from '../components/Image.vue'
import Button from '../components/Btn.vue'

import './main.scss'
import './iconfont.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('Demo', Demo)
    ctx.app.component('h-mermaid', Mermaid)
    ctx.app.component('Image', Image)
    ctx.app.component('Btn', Button)
  }
}
