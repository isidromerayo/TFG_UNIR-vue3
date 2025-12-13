import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterComponent from '@/components/FooterComponent.vue'

describe('FooterComponent', () => {
  it('renderiza correctamente el contenido del footer', () => {
    const wrapper = mount(FooterComponent)

    // Verificar que se muestra el copyright
    expect(wrapper.text()).toContain('© Copyright')
    expect(wrapper.text()).toContain('UNIR TFG - Frameworks frontend JavaScript: Análisis y estudio práctico')
    expect(wrapper.text()).toContain('All Rights Reserved')
    
    // Verificar que se muestra el crédito de diseño
    expect(wrapper.text()).toContain('Designed by')
    expect(wrapper.text()).toContain('BootstrapMade')
  })

  it('tiene la estructura HTML correcta', () => {
    const wrapper = mount(FooterComponent)

    // Verificar elementos principales
    expect(wrapper.find('#footer').exists()).toBe(true)
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.copyright').exists()).toBe(true)
    expect(wrapper.find('.credits').exists()).toBe(true)
  })

  it('contiene el enlace a BootstrapMade', () => {
    const wrapper = mount(FooterComponent)

    // Verificar que existe el enlace
    const link = wrapper.find('a[href="https://bootstrapmade.com/"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('BootstrapMade')
  })

  it('muestra el texto del proyecto TFG correctamente', () => {
    const wrapper = mount(FooterComponent)

    // Verificar texto específico del proyecto
    expect(wrapper.text()).toContain('TFG - Frameworks frontend JavaScript')
    expect(wrapper.text()).toContain('Análisis y estudio práctico')
  })

  it('es un componente estático sin lógica compleja', () => {
    const wrapper = mount(FooterComponent)

    // Verificar que no hay datos reactivos complejos
    expect(wrapper.vm.$data).toEqual({})
    
    // Verificar que el componente se monta sin errores
    expect(wrapper.exists()).toBe(true)
  })
})