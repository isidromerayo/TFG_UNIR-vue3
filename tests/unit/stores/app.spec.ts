import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'

describe('App Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('initializes with default state', () => {
        const store = useAppStore()
        expect(store.carrito).toEqual([])
        expect(store.usuario).toBeNull()
        expect(store.totalCarrito).toBe(0)
        expect(store.isLoggedIn).toBe(false)
    })

    it('adds a course to cart', () => {
        const store = useAppStore()
        const curso = { id: 1, titulo: 'Test', precio: 100 }
        store.addCursoCarrito({ curso: curso as any, precio: 100 })

        expect(store.carrito).toHaveLength(1)
        expect(store.carrito[0]).toEqual({ curso, precio: 100 })
        expect(store.totalCarrito).toBe(100)
    })

    it('removes a course from cart', () => {
        const store = useAppStore()
        const curso = { id: 1, titulo: 'Test', precio: 100 }
        store.addCursoCarrito({ curso: curso as any, precio: 100 })
        store.removeCursoCarrito({ curso: curso as any, precio: 100 })

        expect(store.carrito).toHaveLength(0)
        expect(store.totalCarrito).toBe(0)
    })

    it('cleans the cart', () => {
        const store = useAppStore()
        store.addCursoCarrito({ curso: {} as any, precio: 100 })
        store.cleanCarrito()

        expect(store.carrito).toHaveLength(0)
        expect(store.totalCarrito).toBe(0)
    })

    it('sets user login state', () => {
        const store = useAppStore()
        store.setIsLoggedIn(true)
        expect(store.isLoggedIn).toBe(true)
    })
})
