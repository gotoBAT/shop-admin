import { AliasOptions } from 'vite'
import * as path from 'path'

const alias: AliasOptions = {
  '@': path.resolve(__dirname, '../src')
}
export default alias
