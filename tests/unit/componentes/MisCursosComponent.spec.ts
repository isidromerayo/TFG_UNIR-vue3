import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MisCursosComponent from '@/components/MisCursosComponent.vue'
import { USER } from '@/utils/constants'

describe('MisCursosComponent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('renders correctly', () => {
    const wrapper = mount(MisCursosComponent)
    expect(wrapper.find('h1').text()).toBe('Mis cursos')
    expect(wrapper.find('.detalle-curso').exists()).toBe(true)
  })

  it('initializes with local storage values', () => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem(USER, 'Test User')

    const wrapper = mount(MisCursosComponent)
    const vm = wrapper.vm as any

    expect(vm.isLogin).toBe('true')
    expect(vm.usuario).toBe('Test User')
  })
})
