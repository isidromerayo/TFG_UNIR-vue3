import { createStore } from 'vuex'

interface RootState {
  carrito: any[]
  usuario: any
  totalCarrito: number
  isLoggedIn: boolean
}

export default createStore<RootState>({
  state: {
    carrito: [],
    usuario: null,
    totalCarrito: 0,
    isLoggedIn: false
  },
  getters: {
    carrito: (state: RootState) => state.carrito,
    usuario: (state: RootState) => state.usuario,
    totalCarrito: (state: RootState) => state.totalCarrito,
    isLoggedIn: (state: RootState) => state.isLoggedIn
  },
  mutations: {
    setCarrito(state: RootState, payload: any[]) {
      state.carrito = payload
    },
    setUsuario(state: RootState, payload: any) {
      state.usuario = payload
    },
    setTotalCarrito(state: RootState, payload: number) {
      state.totalCarrito = payload
    },
    setIsLoggedIn(state: RootState, payload: boolean) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    addCursoCarrito({ commit, state }: { commit: (mutation: string, payload?: any) => void; state: RootState }, params: any) {
      const curso = params.curso
      const precio = params.precio

      commit('setCarrito', [...state.carrito, { curso, precio }])
      commit('setTotalCarrito', state.totalCarrito + precio)
    },
    removeCursoCarrito({ commit, state }: { commit: (mutation: string, payload?: any) => void; state: RootState }, params: any) {
      const curso = params.curso
      const precio = params.precio

      const newCarrito = state.carrito.filter((item: any) => item.curso !== curso)
      commit('setCarrito', newCarrito)
      commit('setTotalCarrito', state.totalCarrito - precio)
    },
    cleanCarrito({ commit }: { commit: (mutation: string, payload?: any) => void }, params: any) {
      commit('setCarrito', [])
      commit('setTotalCarrito', 0)
    }
  },
  modules: {
  }
})