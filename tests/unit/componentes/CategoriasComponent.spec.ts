import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoriasComponent from '@/components/CategoriasComponent.vue'
import axios from 'axios'

vi.mock('axios')

describe('CategoriasComponent', () => {
  const mockCategorias = [
    { id: 1, nombre: 'Programación', descripcion: 'Cursos de código' },
    { id: 2, nombre: 'Diseño', descripcion: 'Cursos de arte' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ;(axios.get as any).mockResolvedValue({
      data: { _embedded: { categorias: mockCategorias } }
    })
  })

  it('renders categories list correctly', async () => {
    const wrapper = mount(CategoriasComponent, {
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toBe('Categorias de nuestros cursos')
    const categoryItems = wrapper.findAll('.listado-categorias')
    expect(categoryItems).toHaveLength(2)
    expect(wrapper.text()).toContain('Programación')
    expect(wrapper.text()).toContain('Diseño')
  })

  it('handles API error', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    ;(axios.get as any).mockRejectedValue(new Error('API Error'))

    mount(CategoriasComponent, {
      global: {
        stubs: { RouterLink: true }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(consoleSpy).toHaveBeenCalled()
  })
})
