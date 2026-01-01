import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoriaComponent from '@/components/CategoriaComponent.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

vi.mock('axios')
vi.mock('vue-router', () => ({
  useRoute: vi.fn()
}))

describe('CategoriaComponent', () => {
  const mockCategoria = { id: 1, nombre: 'Web' }
  const mockCursos = [
    { id: 101, titulo: 'Vue 3', valoracionMedia: 5, precio: 50 }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRoute as any).mockReturnValue({
      params: { id: '1' }
    })

    ;(axios.get as any).mockImplementation((url: string) => {
      if (url.endsWith('/categorias/1')) return Promise.resolve({ data: mockCategoria })
      if (url.endsWith('/cursos')) return Promise.resolve({ data: { _embedded: { cursos: mockCursos } } })
      return Promise.reject(new Error('Not found'))
    })
  })

  it('renders category details and courses', async () => {
    const wrapper = mount(CategoriaComponent, {
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Categoria Web')
    expect(wrapper.text()).toContain('Vue 3')
    expect(wrapper.text()).toContain('Valoración media: 5')
  })

  it('handles API errors', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    ;(axios.get as any).mockRejectedValue(new Error('API Error'))

    mount(CategoriaComponent, {
      global: {
        stubs: { RouterLink: true }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(consoleSpy).toHaveBeenCalled()
  })
})
