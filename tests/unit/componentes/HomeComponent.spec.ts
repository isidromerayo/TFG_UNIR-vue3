import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import HomeComponent from '@/components/HomeComponent.vue'
import axios from 'axios'

// Mock dependencies
vi.mock('axios')
vi.mock('@/components/SliderComponent.vue', () => ({
  default: { name: 'SliderComponent', template: '<div data-testid="slider-component"></div>' }
}))

describe('HomeComponent', () => {
  let wrapper: any

  const mockCursos = [
    { id: '1', titulo: 'Curso Vue', descripcion: 'Aprende Vue 3', fechaActualizacion: '2023-01-01', valoracionMedia: '4.5' },
    { id: '2', titulo: 'Curso React', descripcion: 'Aprende React', fechaActualizacion: '2023-02-01', valoracionMedia: '4.0' }
  ]
  const mockOpiniones = [
    { id: '1', comentario: 'Excelente curso', puntuacion: '5' },
    { id: '2', comentario: 'Muy bueno', puntuacion: '4' }
  ]
  const mockActualizaciones = [
    { id: '3', titulo: 'Curso Node', descripcion: 'Aprende Node', fechaActualizacion: '2023-03-01' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup axios mocks
    ;(axios.get as any).mockImplementation((url: string) => {
        if (url.includes('selectMorePoints')) {
            return Promise.resolve({ data: { _embedded: { cursos: mockCursos } } })
        }
        if (url.includes('selectLastOpinions')) {
            return Promise.resolve({ data: { _embedded: { valoraciones: mockOpiniones } } })
        }
        if (url.includes('selectLastUpdates')) {
            return Promise.resolve({ data: { _embedded: { cursos: mockActualizaciones } } })
        }
        return Promise.reject(new Error(`URL not mocked: ${url}`))
    })
  })

  it('renders basic structure and SliderComponent', () => {
    wrapper = mount(HomeComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.find('[data-testid="slider-component"]').exists()).toBe(true)
    expect(wrapper.find('.cursos-destacados h1').text()).toBe('Cursos destacados')
    expect(wrapper.find('.cursos-opiniones h1').text()).toBe('Opiniones')
    expect(wrapper.find('.cursos-actualizaciones h1').text()).toBe('Ultimas actualizaciones')
  })

  it('fetches and displays courses, opinions, and updates', async () => {
    wrapper = mount(HomeComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    // Wait for API calls to resolve and DOM to update
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()

    // Check Cursos
    const cursoItems = wrapper.findAll('.cursos-destacados .service-item')
    // Note: The initial state has 1 empty item. If the API returns 2, and it REPLACES the array, we expect 2.
    // If it appends... code says "this.cursos = ...", so it replaces.
    expect(cursoItems).toHaveLength(2)
    expect(wrapper.text()).toContain('Curso Vue')
    expect(wrapper.text()).toContain('Curso React')
    expect(wrapper.text()).toContain('4.5/5')

    // Check Opiniones
    const opinionItems = wrapper.findAll('.cursos-opiniones .service-item')
    expect(opinionItems).toHaveLength(2)
    expect(wrapper.text()).toContain('Excelente curso')
    expect(wrapper.text()).toContain('5/5')

    // Check Actualizaciones
    const actualizacionItems = wrapper.findAll('.cursos-actualizaciones .service-item')
    expect(actualizacionItems).toHaveLength(1)
    expect(wrapper.text()).toContain('Curso Node')
    expect(wrapper.text()).toContain('2023-03-01')
  })

  it('handles API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    ;(axios.get as any).mockRejectedValue(new Error('API Error'))

    wrapper = mount(HomeComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()

    expect(consoleSpy).toHaveBeenCalledTimes(3) // 3 API calls
    
    // Should still render initial empty state or nothing (depending on implementation)
    // Code has initial state with empty strings
    expect(wrapper.text()).toContain('Cursos destacados')
  })
})
