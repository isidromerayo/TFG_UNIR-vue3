import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ValoracionComponent from '@/components/ValoracionComponent.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

vi.mock('axios')
vi.mock('vue-router', () => ({
  useRoute: vi.fn()
}))

describe('ValoracionComponent', () => {
  let wrapper: any

  const mockValoracion = {
    id: 1,
    puntuacion: 5,
    fecha: '2023-01-01',
    comentario: 'Excelente'
  }
  const mockCurso = {
    id: 101,
    titulo: 'Curso Vue',
    fechaActualizacion: '2023-02-01',
    valoracionMedia: 4.5,
    instructor: {
      nombre: 'Profe',
      apellidos: 'Sor'
    }
  }
  const mockAlumno = {
    nombre: 'Juan',
    apellidos: 'Alumno'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRoute as any).mockReturnValue({
      params: { id: '1' }
    })
    
    ;(axios.get as any).mockImplementation((url: string) => {
        if (url.endsWith('valoraciones/1')) return Promise.resolve({ data: mockValoracion })
        if (url.endsWith('/curso')) return Promise.resolve({ data: mockCurso })
        if (url.endsWith('/estudiante')) return Promise.resolve({ data: mockAlumno })
        return Promise.reject(new Error(`Unknown URL: ${url}`))
    })
  })

  it('renders rating details correctly', async () => {
    wrapper = mount(ValoracionComponent, {
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>'
          },
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Juan Alumno')
    expect(wrapper.text()).toContain('5/5')
    expect(wrapper.text()).toContain('Excelente')
    expect(wrapper.text()).toContain('Curso Vue')
    expect(wrapper.text()).toContain('Profe Sor')
  })

  it('handles API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    ;(axios.get as any).mockRejectedValue(new Error('API Error'))

    wrapper = mount(ValoracionComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()

    expect(consoleSpy).toHaveBeenCalledTimes(3)
  })
})
