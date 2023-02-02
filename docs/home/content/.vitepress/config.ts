import baseConfig from '@zhdocs/config'
import { resolve } from 'node:path'

export default baseConfig({
  outDir: resolve(__dirname, '../../../../dist')
})
