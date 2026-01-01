import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorComponent from '@/components/ErrorComponent.vue'

describe('ErrorComponent', () => {
  it('renders error message correctly', () => {
    const wrapper = mount(ErrorComponent)
    expect(wrapper.text()).toContain('Página no encontrada')
    expect(wrapper.text()).toContain('error 404')
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
