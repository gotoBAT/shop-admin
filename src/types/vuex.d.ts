import { Store } from 'vuex'
import { State } from '@/store'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  export interface ComponentCustomProperties {
    $store: Store<State>
  }
}
