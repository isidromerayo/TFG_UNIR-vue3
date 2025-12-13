import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RegistroComponent from '@/components/RegistroComponent.vue'
import Swal from 'sweetalert2'
import axios from 'axios'

// Test constants - NOT for production use
const TEST_DATA = {
  VALID_PASSWORD: 'testPass123', // Test password - not for production
  SHORT_PASSWORD: '123', // Test password - not for production
  VALID_EMAIL: 'juan.perez@example.com',
  INVALID_EMAIL: 'email-invalido',
  FIRST_NAME: 'Juan',
  LAST_NAME: 'Pérez García'
} as const

// Mock de sweetalert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}))

// Mock de axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}))

// Mock de router
const mockRouter = {
  push: vi.fn()
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter
}))

describe('RegistroComponent', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(RegistroComponent)
    vi.clearAllMocks()
  })

  it('renderiza correctamente el formulario de registro', () => {
    // Verificar título
    expect(wrapper.text()).toContain('Registro de usuario')
    
    // Verificar campos del formulario
    expect(wrapper.find('input[name="nombre"]').exists()).toBe(true)
    expect(wrapper.find('input[name="apellidos"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.find('input[name="pass"]').exists()).toBe(true)
    
    // Verificar botones
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.find('button.borrar-form').exists()).toBe(true)
    
    // Verificar texto de campos obligatorios
    expect(wrapper.text()).toContain('(*) campos obligatorios')
  })

  it('valida campos obligatorios', async () => {
    // Intentar enviar formulario vacío
    await wrapper.find('form').trigger('submit.prevent')
    
    // Esperar a que se procese la validación
    await wrapper.vm.$nextTick()
    
    // Verificar que aparecen errores de validación
    // (Los errores específicos dependen de la implementación de Yup)
    expect(wrapper.vm.formError).toBeDefined()
  })

  it('limpia el formulario al hacer click en Borrar', async () => {
    // Llenar el formulario
    await wrapper.find('input[name="nombre"]').setValue(TEST_DATA.FIRST_NAME)
    await wrapper.find('input[name="apellidos"]').setValue('Pérez')
    await wrapper.find('input[name="email"]').setValue('juan@example.com')
    await wrapper.find('input[name="pass"]').setValue(TEST_DATA.VALID_PASSWORD)
    
    // Verificar que los campos tienen valores
    expect(wrapper.vm.formData.nombre).toBe(TEST_DATA.FIRST_NAME)
    expect(wrapper.vm.formData.apellidos).toBe('Pérez')
    
    // Hacer click en borrar
    await wrapper.find('button.borrar-form').trigger('click')
    
    // Verificar que los campos se limpiaron
    expect(wrapper.vm.formData.nombre).toBe('')
    expect(wrapper.vm.formData.apellidos).toBe('')
    expect(wrapper.vm.formData.email).toBe('')
    expect(wrapper.vm.formData.password).toBe('')
  })

  it('registra usuario correctamente con datos válidos', async () => {
    // Llenar formulario con datos válidos
    await wrapper.find('input[name="nombre"]').setValue(TEST_DATA.FIRST_NAME)
    await wrapper.find('input[name="apellidos"]').setValue(TEST_DATA.LAST_NAME)
    await wrapper.find('input[name="email"]').setValue(TEST_DATA.VALID_EMAIL)
    await wrapper.find('input[name="pass"]').setValue(TEST_DATA.VALID_PASSWORD)
    
    // Mock respuesta exitosa
    vi.mocked(axios.post).mockResolvedValue({ data: { id: 1 } })
    
    // Enviar formulario
    await wrapper.find('form').trigger('submit.prevent')
    
    // Esperar a que se procese
    await vi.waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/usuarios'),
        {
          nombre: TEST_DATA.FIRST_NAME,
          apellidos: TEST_DATA.LAST_NAME,
          email: TEST_DATA.VALID_EMAIL,
          password: TEST_DATA.VALID_PASSWORD
        }
      )
    })
    
    // Verificar éxito
    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Alta',
        'Se ha registrado su usuario correctamente, recibirá un correo para confirmar el alta'
      )
      expect(mockRouter.push).toHaveBeenCalledWith('/acceso')
    })
  })

  it('maneja errores de registro', async () => {
    // Llenar formulario con datos válidos
    await wrapper.find('input[name="nombre"]').setValue(TEST_DATA.FIRST_NAME)
    await wrapper.find('input[name="apellidos"]').setValue('Pérez')
    await wrapper.find('input[name="email"]').setValue('juan@example.com')
    await wrapper.find('input[name="pass"]').setValue(TEST_DATA.VALID_PASSWORD)
    
    // Mock respuesta de error
    const errorResponse = {
      response: {
        data: {
          message: 'El email ya está registrado'
        }
      }
    }
    vi.mocked(axios.post).mockRejectedValue(errorResponse)
    
    // Enviar formulario
    await wrapper.find('form').trigger('submit.prevent')
    
    // Verificar manejo de error
    await vi.waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Alta de usuario',
        'Ha habido problemas con su registro: El email ya está registrado',
        'error'
      )
    })
  })

  it('valida formato de email', async () => {
    // Llenar formulario con email inválido
    await wrapper.find('input[name="nombre"]').setValue(TEST_DATA.FIRST_NAME)
    await wrapper.find('input[name="apellidos"]').setValue('Pérez')
    await wrapper.find('input[name="email"]').setValue(TEST_DATA.INVALID_EMAIL)
    await wrapper.find('input[name="pass"]').setValue(TEST_DATA.VALID_PASSWORD)
    
    // Enviar formulario
    await wrapper.find('form').trigger('submit.prevent')
    
    // Verificar que no se envía la petición HTTP
    expect(axios.post).not.toHaveBeenCalled()
    
    // Verificar que hay errores de validación
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formError.email).toBeDefined()
  })

  it('valida longitud mínima de contraseña', async () => {
    // Llenar formulario con contraseña muy corta
    await wrapper.find('input[name="nombre"]').setValue(TEST_DATA.FIRST_NAME)
    await wrapper.find('input[name="apellidos"]').setValue('Pérez')
    await wrapper.find('input[name="email"]').setValue('juan@example.com')
    await wrapper.find('input[name="pass"]').setValue(TEST_DATA.SHORT_PASSWORD) // Menos de 4 caracteres
    
    // Enviar formulario
    await wrapper.find('form').trigger('submit.prevent')
    
    // Verificar que no se envía la petición HTTP
    expect(axios.post).not.toHaveBeenCalled()
    
    // Verificar que hay errores de validación
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formError.password).toBeDefined()
  })

  it('muestra errores de validación en la interfaz', async () => {
    // Enviar formulario vacío para generar errores
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    
    // Los errores específicos dependen de la configuración de Yup
    // pero deberían aparecer spans con clase error-form
    const errorSpans = wrapper.findAll('.error-form')
    expect(errorSpans.length).toBeGreaterThan(0)
  })
})