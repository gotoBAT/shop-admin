import { AliasOptions } from 'vite'
import path from 'path'

const alias: AliasOptions = {
  '@': path.resolve(__dirname, '../src')
}
export default alias
