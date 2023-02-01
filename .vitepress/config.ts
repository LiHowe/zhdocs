import baseConfig from './config/baseConfig'
import fabric from '../docs/fabric/config/sidebar'

export default baseConfig({
  themeConfig: {
    sidebar: {
      '/fabric/': fabric
    }
  }
})
