import { IUserInfo } from '@/apis/types/common'
import { App, InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import { StorageEnum } from '@/enum/storageEnum'
export interface State {
  isCollapse: boolean
  user: ({ token: string } & IUserInfo) | null
}
export const key: InjectionKey<Store<State>> = Symbol('store')
export const store = createStore<State>({
  state() {
    return {
      isCollapse: false,
      user: getItem<IUserInfo & { token: string }>(StorageEnum.USER)
    }
  },
  mutations: {
    setIsCollapse(state, payload) {
      state.isCollapse = payload
    },
    setUser(state, payload) {
      state.user = payload
      setItem(StorageEnum.USER, state.user)
    }
  }
})
export function setupStore(app: App) {
  app.use(store, key)
}
export function useStore() {
  return baseUseStore(key)
}
