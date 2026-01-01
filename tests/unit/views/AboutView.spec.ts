import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView', () => {
  it('renders correctly', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.text()).toContain('This is an about page')
  })
})
