import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/HeaderComponent.vue'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getToken, removeToken, removeUser } from '@/services/session'

// Mock de sweetalert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}))

// Mock de axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}))

// Mock de session services
vi.mock('@/services/session', () => ({
  getToken: vi.fn(),
  removeToken: vi.fn(),
  removeUser: vi.fn()
}))

// Mock de router
const mockRouter = {
  push: vi.fn()
}

vi.mock('vue-router', () => ({
  RouterLink: {
    template: '<a><slot /></a>',
    props: ['to', 'active-class']
  },
  useRouter: () => mockRouter
}))

// Mock de location
Object.defineProperty(window, 'location', {
  value: {
    replace: vi.fn()
  },
  writable: true
})

describe('HeaderComponent', () => {
  let wrapper: any

  const mockCategorias = [
    { id: 1, nombre: 'Programación' },
    { id: 2, nombre: 'Diseño' },
    { id: 3, nombre: 'Marketing' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock successful API response for categories
    vi.mocked(axios.get).mockResolvedValue({
      data: {
        _embedded: {
          categorias: mockCategorias
        }
      }
    })
  })

  it('renderiza correctamente cuando el usuario no está logueado', async () => {
    vi.mocked(getToken).mockReturnValue(null)
    
    wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Verificar que se muestran los enlaces de registro y acceso
    expect(wrapper.text()).toContain('Registro')
    expect(wrapper.text()).toContain('Acceso')
    
    // Verificar que NO se muestra el menú privado
    expect(wrapper.text()).not.toContain('Privado')
  })

  it('renderiza correctamente cuando el usuario está logueado', async () => {
    vi.mocked(getToken).mockReturnValue('fake-token')
    
    wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Verificar que se muestra el menú privado
    expect(wrapper.text()).toContain('Privado')
    expect(wrapper.text()).toContain('Mis datos')
    expect(wrapper.text()).toContain('Mis cursos')
    expect(wrapper.text()).toContain('Desconectar')
    
    // Verificar que NO se muestran los enlaces de registro y acceso
    expect(wrapper.text()).not.toContain('Registro')
    expect(wrapper.text()).not.toContain('Acceso')
  })

  it('carga las categorías correctamente', async () => {
    vi.mocked(getToken).mockReturnValue(null)
    
    wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Verificar que se llamó a la API de categorías
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('categorias?sort=nombre&size=5'))
    
    // Verificar que las categorías se muestran en el componente
    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Programación')
      expect(wrapper.text()).toContain('Diseño')
      expect(wrapper.text()).toContain('Marketing')
    })
  })

  it('maneja el logout correctamente', async () => {
    vi.mocked(getToken).mockReturnValue('fake-token')
    
    wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Simular click en desconectar
    const logoutLink = wrapper.find('a[href="#"]')
    await logoutLink.trigger('click')

    // Verificar que se llamaron las funciones de logout
    expect(removeToken).toHaveBeenCalled()
    expect(removeUser).toHaveBeenCalled()
    expect(Swal.fire).toHaveBeenCalledWith('Acceso', 'Cierre de sesion correcta')
    expect(window.location.replace).toHaveBeenCalledWith('/home')
  })

  it('muestra los elementos de navegación principales', async () => {
    vi.mocked(getToken).mockReturnValue(null)
    
    wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Verificar elementos de navegación principales
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Categorias')
    expect(wrapper.text()).toContain('carrito')
    expect(wrapper.text()).toContain('TFG - FFJ: AEP')
  })

  it('maneja errores en la carga de categorías', async () => {
    vi.mocked(getToken).mockReturnValue(null)
    vi.mocked(axios.get).mockRejectedValue(new Error('API Error'))
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Verificar que se manejó el error
    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })
    
    consoleSpy.mockRestore()
  })
})