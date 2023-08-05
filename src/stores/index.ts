import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: [],
    carrito: [],
    totalCarrito: 0
  },
  getters: {
    carrito: state => state.carrito,
    usuario: state => state.usuario,
    totalCarrito: state => state.totalCarrito
  },
  mutations: { // actualiza estados
    setCarrito(state, payload) {
      state.carrito = payload
    },
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setTotalCarrito(state, payload) {
      state.totalCarrito = payload
    }
  },
  actions: {
    addCursoCarrito({ commit }, params) {
      try {
        const resultTemp = [] as any[];
        let total = 0;
        this.state.carrito.forEach((curso: any, index: number) => {
          if (curso.id !== params.id) {
            resultTemp.push(curso)
            total += curso.precio
          }
        })
        resultTemp.push(params)
        total += params.precio
        commit("setCarrito", resultTemp)
        commit("setTotalCarrito", total)
      } catch (error) {
        console.log(error)
      }
    },
    removeCursoCarrito({ commit }, params) {
      try {
        const resultTemp = [] as any[];
        let total = 0;
        this.state.carrito.forEach((curso: any, index: number) => {
          if (curso.id !== params.id) {
            resultTemp.push(curso)
            total += curso.precio
          }

        })
        commit("setCarrito", resultTemp)
        commit("setTotalCarrito", total)

      }
      catch (error) {
        console.log(error)
      }
    },
    cleanCarrito({ commit }, params) {
      commit("setCarrito", [])
      commit("setTotalCarrito", 0)
    }

  },
  modules: {
  }
})