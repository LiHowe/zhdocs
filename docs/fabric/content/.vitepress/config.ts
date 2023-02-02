import sidebar from './config/sidebar'
import baseConfig from '@zhdocs/config'

import { resolve } from 'node:path'

const config = baseConfig({
  base: '/fabric/',
  title: 'Fabric',
  themeConfig: {
    sidebar
  },
  outDir: resolve(__dirname, '../../../../dist/fabric')
})

export default config
