import baseConfig from './config/baseConfig'
import sidebar from './config/sidebar'

const config = baseConfig({
  base: '/fabric/',
  title: 'Fabric',
  themeConfig: {
    sidebar
  }
})

export default config
