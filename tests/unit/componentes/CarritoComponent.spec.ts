import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useAppStore } from '@/stores/app'
import CarritoComponent from '@/components/CarritoComponent.vue'
import { getToken } from '@/services/session'
import Swal from 'sweetalert2'
import { setActivePinia } from 'pinia'

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
  let wrapper: any
  let store: any

  beforeEach(() => {
    vi.clearAllMocks()

    const pinia = createTestingPinia({
      initialState: {
        app: {
          carrito: [
            { curso: { id: 1, titulo: 'Curso 1' }, precio: 100 },
            { curso: { id: 2, titulo: 'Curso 2' }, precio: 200 }
          ],
          totalCarrito: 300
        }
      },
      stubActions: false,
    })
    setActivePinia(pinia)

    wrapper = mount(CarritoComponent, {
      global: {
        plugins: [pinia],
      }
    })

    store = useAppStore()
  })

  it('muestra alerta de éxito al realizar la compra correctamente', async () => {
    vi.mocked(getToken).mockReturnValue('fake-token')
    vi.mocked(Swal.fire).mockResolvedValue({ isConfirmed: true, isDenied: false, isDismissed: false } as any)

    await wrapper.vm.comprar()

    expect(store.cleanCarrito).toHaveBeenCalled()
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
    const pinia = createTestingPinia({
      initialState: {
        app: {
          carrito: [],
          totalCarrito: 0
        }
      }
    })
    setActivePinia(pinia)

    wrapper = mount(CarritoComponent, {
      global: {
        plugins: [pinia],
      }
    })

    expect(wrapper.text()).toContain('No hay productos en el carrito')
  })

  it('borra un producto del carrito', async () => {
    const item = { curso: { id: 1, titulo: 'Curso 1' }, precio: 100 }
    await wrapper.vm.borrarProducto(item)
    expect(store.removeCursoCarrito).toHaveBeenCalledWith(item)
  })

  it('muestra el total correcto del carrito', () => {
    expect(wrapper.text()).toContain('300')
    expect(wrapper.find('.total-carrito').text()).toContain('300')
  })

  it('ejecuta setup correctamente', () => {
    expect(wrapper.vm.carrito).toHaveLength(2)
    expect(wrapper.vm.totalCompra).toBe(300)
  })
})