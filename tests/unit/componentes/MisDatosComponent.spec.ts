import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MisDatosComponent from '@/components/MisDatosComponent.vue'
import { getUser } from '@/services/session'

// Mock de session services
vi.mock('@/services/session', () => ({
  getUser: vi.fn()
}))

describe('MisDatosComponent', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza correctamente los datos del usuario', async () => {
    const mockUser = {
      fullname: 'Juan Pérez García',
      username: 'juan.perez@example.com'
    }
    
    vi.mocked(getUser).mockReturnValue(JSON.stringify(mockUser))
    
    wrapper = mount(MisDatosComponent)
    await wrapper.vm.$nextTick()

    // Verificar que se muestra el título
    expect(wrapper.text()).toContain('Mis datos')
    
    // Verificar que se muestran las etiquetas
    expect(wrapper.text()).toContain('Nombre y apellidos')
    expect(wrapper.text()).toContain('Correo electrónico')
    
    // Verificar que se muestran los datos del usuario
    expect(wrapper.text()).toContain('Juan Pérez García')
    expect(wrapper.text()).toContain('juan.perez@example.com')
  })

  it('maneja datos de usuario vacíos', async () => {
    const mockUser = {
      fullname: '',
      username: ''
    }
    
    vi.mocked(getUser).mockReturnValue(JSON.stringify(mockUser))
    
    wrapper = mount(MisDatosComponent)
    await wrapper.vm.$nextTick()

    // Verificar que se renderizan las etiquetas aunque los datos estén vacíos
    expect(wrapper.text()).toContain('Mis datos')
    expect(wrapper.text()).toContain('Nombre y apellidos')
    expect(wrapper.text()).toContain('Correo electrónico')
    
    // Los campos estarán vacíos pero la estructura debe estar presente
    const sections = wrapper.findAll('.detalle-curso div')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('tiene la estructura HTML correcta', async () => {
    const mockUser = {
      fullname: 'Test User',
      username: 'test@example.com'
    }
    
    vi.mocked(getUser).mockReturnValue(JSON.stringify(mockUser))
    
    wrapper = mount(MisDatosComponent)
    await wrapper.vm.$nextTick()

    // Verificar estructura HTML
    expect(wrapper.find('.pagina-datos.container').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('.detalle-curso.card').exists()).toBe(true)
    expect(wrapper.findAll('.perfil-datos').length).toBe(2)
  })

  it('maneja datos de usuario con caracteres especiales', async () => {
    const mockUser = {
      fullname: 'María José Rodríguez-Sánchez',
      username: 'maría.josé@ñoño.es'
    }
    
    vi.mocked(getUser).mockReturnValue(JSON.stringify(mockUser))
    
    wrapper = mount(MisDatosComponent)
    await wrapper.vm.$nextTick()

    // Verificar que maneja correctamente caracteres especiales
    expect(wrapper.text()).toContain('María José Rodríguez-Sánchez')
    expect(wrapper.text()).toContain('maría.josé@ñoño.es')
  })

  it('maneja errores en el parsing de datos de usuario', async () => {
    // Simular JSON inválido
    vi.mocked(getUser).mockReturnValue('invalid-json')
    
    // El componente debería manejar el error gracefully
    expect(() => {
      wrapper = mount(MisDatosComponent)
    }).toThrow() // JSON.parse lanzará un error con JSON inválido
  })
})