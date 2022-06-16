import { App, InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}
export const key: InjectionKey<Store<State>> = Symbol('store')
export const store = createStore<State>({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
export function setupStore(app: App) {
  app.use(store)
}
export function useStore() {
  return baseUseStore(key)
}
