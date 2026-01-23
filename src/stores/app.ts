import { defineStore } from 'pinia'
import type { Usuario, Curso } from '../types/models'

interface AppState {
    carrito: { curso: Curso; precio: number }[]
    usuario: Usuario | null
    totalCarrito: number
    isLoggedIn: boolean
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        carrito: [],
        usuario: null,
        totalCarrito: 0,
        isLoggedIn: false
    }),
    getters: {
        getCarrito: (state: AppState) => state.carrito,
        getUsuario: (state: AppState) => state.usuario,
        getTotalCarrito: (state: AppState) => state.totalCarrito,
        getIsLoggedIn: (state: AppState) => state.isLoggedIn
    },
    actions: {
        setCarrito(payload: { curso: Curso; precio: number }[]) {
            this.carrito = payload
        },
        setUsuario(payload: Usuario | null) {
            this.usuario = payload
        },
        setTotalCarrito(payload: number) {
            this.totalCarrito = payload
        },
        setIsLoggedIn(payload: boolean) {
            this.isLoggedIn = payload
        },
        addCursoCarrito(params: { curso: Curso; precio: number }) {
            const { curso, precio } = params
            this.carrito.push({ curso, precio })
            this.totalCarrito += precio
        },
        removeCursoCarrito(params: { curso: Curso; precio: number }) {
            const { curso, precio } = params
            this.carrito = this.carrito.filter((item) => item.curso.id !== curso.id)
            this.totalCarrito -= precio
        },
        cleanCarrito() {
            this.carrito = []
            this.totalCarrito = 0
        }
    }
})
