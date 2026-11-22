import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AccesoComponent from '@/components/AccesoComponent.vue'
import Swal from 'sweetalert2'
import axios from 'axios'

// Mock de sweetalert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}))


// Mock de router
const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push })
}))

// Mock de location
Object.defineProperty(window, 'location', {
  value: {
    replace: vi.fn()
  },
  writable: true
})

describe('AccesoComponent', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AccesoComponent)
    vi.clearAllMocks()
  })

  it('muestra alerta de éxito al iniciar sesión correctamente', async () => {
    // Simular datos de login usando v-model
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')

    // Simular respuesta exitosa del login
    const mockResponse = { data: { token: 'fake-token' } }
    vi.mocked(axios.post).mockResolvedValue(mockResponse)

    // Simular click en el botón de login
    await wrapper.find('button[type="submit"]').trigger('submit')

    // Esperar a que se resuelva la promesa
    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith('Acceso', 'Logeado correctamente')
    })
  })

  it('muestra alerta de error al fallar el login', async () => {
    // Simular datos de login usando v-model
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('wrong-password')

    // Simular respuesta de error
    vi.mocked(axios.post).mockRejectedValue({ response: { data: { message: 'Credenciales inválidas' } } })

    // Simular click en el botón de login
    await wrapper.find('button[type="submit"]').trigger('submit')

    // Esperar a que se resuelva la promesa
    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith('Problemas acceso', 'No se ha podido logear, revise usuario/contraseña', 'error')
    })
  })

  it('muestra la redacción de credenciales para un 401', async () => {
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('wrong-password')

    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 401, data: { message: 'No autorizado' }, headers: {} }
    })

    await wrapper.find('button[type="submit"]').trigger('submit')

    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith('Problemas acceso', 'No se ha podido logear, revise usuario/contraseña', 'error')
    })
  })

  it('muestra los segundos de Retry-After en un 429', async () => {
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')

    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 429, data: {}, headers: { 'retry-after': '57' } }
    })

    await wrapper.find('button[type="submit"]').trigger('submit')

    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Problemas acceso',
        'Demasiados intentos seguidos, vuelva a intentarlo en 57 segundos',
        'error'
      )
    })
  })

  it('muestra un mensaje de límite genérico en un 429 sin Retry-After', async () => {
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')

    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 429, data: {}, headers: {} }
    })

    await wrapper.find('button[type="submit"]').trigger('submit')

    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Problemas acceso',
        'Demasiados intentos seguidos, espere unos minutos y vuelva a intentarlo',
        'error'
      )
    })
  })

  it('muestra un mensaje propio para un 403', async () => {
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')

    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 403, data: { message: 'Prohibido' }, headers: {} }
    })

    await wrapper.find('button[type="submit"]').trigger('submit')

    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Problemas acceso',
        'No tiene permiso para realizar esta operación',
        'error'
      )
    })
  })
}) 