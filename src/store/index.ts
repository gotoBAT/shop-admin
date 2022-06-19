import { App, InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
  isCollapse: boolean
}
export const key: InjectionKey<Store<State>> = Symbol('store')
export const store = createStore<State>({
  state() {
    return {
      count: 0,
      isCollapse: false
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setIsCollapse(state, payload) {
      state.isCollapse = payload
    }
  }
})
export function setupStore(app: App) {
  app.use(store, key)
}
export function useStore() {
  return baseUseStore(key)
}
