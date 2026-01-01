import { describe, it, expect, beforeEach } from 'vitest'
import store from '@/stores/index'

describe('Vuex Store', () => {
  beforeEach(() => {
    // Reset state before each test
    store.commit('setCarrito', [])
    store.commit('setUsuario', null)
    store.commit('setTotalCarrito', 0)
    store.commit('setIsLoggedIn', false)
  })

  it('has correct initial state', () => {
    expect(store.state.carrito).toEqual([])
    expect(store.state.usuario).toBeNull()
    expect(store.state.totalCarrito).toBe(0)
    expect(store.state.isLoggedIn).toBe(false)
  })

  describe('mutations', () => {
    it('setCarrito updates carrito state', () => {
      const mockCarrito = [{ curso: { id: 1 }, precio: 10 }]
      store.commit('setCarrito', mockCarrito)
      expect(store.state.carrito).toEqual(mockCarrito)
    })

    it('setUsuario updates usuario state', () => {
      const mockUser = { id: 1, name: 'Test' }
      store.commit('setUsuario', mockUser)
      expect(store.state.usuario).toEqual(mockUser)
    })

    it('setTotalCarrito updates totalCarrito state', () => {
      store.commit('setTotalCarrito', 100)
      expect(store.state.totalCarrito).toBe(100)
    })

    it('setIsLoggedIn updates isLoggedIn state', () => {
      store.commit('setIsLoggedIn', true)
      expect(store.state.isLoggedIn).toBe(true)
    })
  })

  describe('getters', () => {
    it('returns state values via getters', () => {
      store.commit('setTotalCarrito', 50)
      expect(store.getters.totalCarrito).toBe(50)
    })
  })

  describe('actions', () => {
    it('addCursoCarrito adds item and updates total', async () => {
      const curso = { id: 1, titulo: 'Vue' }
      await store.dispatch('addCursoCarrito', { curso, precio: 20 })
      
      expect(store.state.carrito).toHaveLength(1)
      expect(store.state.carrito[0]).toEqual({ curso, precio: 20 })
      expect(store.state.totalCarrito).toBe(20)
    })

    it('removeCursoCarrito removes item and updates total', async () => {
      const curso1 = { id: 1 }
      const curso2 = { id: 2 }
      
      store.commit('setCarrito', [
        { curso: curso1, precio: 10 },
        { curso: curso2, precio: 20 }
      ])
      store.commit('setTotalCarrito', 30)

      // Get the exact reference from state to avoid Proxy comparison issues
      const cursoToToRemove = store.state.carrito[0].curso

      await store.dispatch('removeCursoCarrito', { curso: cursoToToRemove, precio: 10 })

      expect(store.state.carrito).toHaveLength(1)
      expect(store.state.carrito[0].curso).toStrictEqual(curso2)
      expect(store.state.totalCarrito).toBe(20)
    })

    it('cleanCarrito resets carrito and total', async () => {
      store.commit('setCarrito', [{ curso: {}, precio: 10 }])
      store.commit('setTotalCarrito', 10)

      await store.dispatch('cleanCarrito')

      expect(store.state.carrito).toEqual([])
      expect(store.state.totalCarrito).toBe(0)
    })
  })
})
