import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CursoComponent from '@/components/CursoComponent.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { createStore } from 'vuex'
import { useRoute } from 'vue-router'

vi.mock('axios')
vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn() }
}))
vi.mock('vue-router', () => ({
  useRoute: vi.fn()
}))

describe('CursoComponent', () => {
  let wrapper: any
  let store: any
  let actions: any

  const mockCurso = {
    id: 1,
    titulo: 'Curso Test',
    descripcion: 'Desc Test',
    valoracionMedia: 4.8,
    precio: 100,
    fechaCreacion: '2023-01-01',
    fechaActualizacion: '2023-02-01',
    instructor: {
      nombre: 'Instructor',
      apellidos: 'Test',
      descripcion: 'Expert'
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRoute as any).mockReturnValue({
      params: { id: '1' }
    })
    
    actions = {
      addCursoCarrito: vi.fn()
    }
    store = createStore({
      actions
    })
    
    ;(axios.get as any).mockResolvedValue({ data: mockCurso })
  })

  it('renders course details correctly', async () => {
    wrapper = mount(CursoComponent, {
      global: {
        plugins: [store]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Curso Test')
    expect(wrapper.text()).toContain('Desc Test')
    expect(wrapper.text()).toContain('Instructor Test')
    expect(wrapper.text()).toContain('Expert')
  })

  it('adds course to cart and shows alert', async () => {
    wrapper = mount(CursoComponent, {
      global: {
        plugins: [store]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(actions.addCursoCarrito).toHaveBeenCalled()
    // Verifying the fix structure
    expect(actions.addCursoCarrito.mock.calls[0][1]).toEqual({
        curso: expect.objectContaining({ id: 1 }),
        precio: 100
    })
    
    expect(Swal.fire).toHaveBeenCalledWith({ title: 'Curso añadido al carrito' })
  })
})
