import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import CarritoComponent from '@/components/CarritoComponent.vue'
import { getToken } from '@/services/session'
import Swal from 'sweetalert2'

// Mock de vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

// Mock de sweetalert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}))

// Mock de session
vi.mock('@/services/session', () => ({
  getToken: vi.fn()
}))

describe('CarritoComponent', () => {
  let store: any
  let wrapper: any

  beforeEach(() => {
    // Limpiar todos los mocks
    vi.clearAllMocks()

    // Crear store con estado inicial
    store = createStore({
      state: {
        carrito: [
          { id: 1, titulo: 'Curso 1', precio: 100 },
          { id: 2, titulo: 'Curso 2', precio: 200 }
        ],
        totalCarrito: 300
      },
      actions: {
        cleanCarrito: vi.fn(),
        removeCursoCarrito: vi.fn()
      }
    })

    // Crear wrapper con store
    wrapper = mount(CarritoComponent, {
      global: {
        plugins: [store],
        mocks: {
          $store: store
        }
      }
    })
  })

  it('muestra alerta de éxito al realizar la compra correctamente', async () => {
    vi.mocked(getToken).mockReturnValue('fake-token')
    vi.mocked(Swal.fire).mockResolvedValue({ isConfirmed: true, isDenied: false, isDismissed: false } as any)
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    await wrapper.vm.comprar()

    expect(dispatchSpy).toHaveBeenCalledWith('cleanCarrito')
    expect(mockPush).toHaveBeenCalledWith('/mis-cursos')
    expect(Swal.fire).toHaveBeenCalledWith('Compra', 'Procesada la compra correctamente')
  })

  it('redirige a acceso cuando no hay token', async () => {
    vi.mocked(getToken).mockReturnValue(null)

    await wrapper.vm.comprar()

    expect(Swal.fire).toHaveBeenCalledWith({ title: 'Debe tener iniciada sesión para comprar' })
    expect(mockPush).toHaveBeenCalledWith('/acceso')
  })

  it('muestra mensaje cuando el carrito está vacío', () => {
    store = createStore({
      state: {
        carrito: [],
        totalCarrito: 0
      },
      actions: {
        cleanCarrito: vi.fn(),
        removeCursoCarrito: vi.fn()
      }
    })

    wrapper = mount(CarritoComponent, {
      global: {
        plugins: [store],
        mocks: {
          $store: store
        }
      }
    })

    expect(wrapper.text()).toContain('No hay productos en el carrito')
  })

  it('borra un producto del carrito', async () => {
    const item = { id: 1, titulo: 'Curso 1', precio: 100 }
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    await wrapper.vm.borrarProducto(item)

    expect(dispatchSpy).toHaveBeenCalledWith('removeCursoCarrito', item)
  })

  it('muestra el total correcto del carrito', () => {
    expect(wrapper.text()).toContain('300')
  })
}) 