import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import { describe, it, expect, vi } from 'vitest'

// Mock minimal para que la importación en App.vue no falle
vi.mock('vue-router', () => ({
    RouterView: { template: '<div></div>' },
    RouterLink: { template: '<a></a>' }
}))

describe('App.vue', () => {
    it('se renderiza correctamente', () => {
        const wrapper = shallowMount(App, {
            global: {
                stubs: {
                    HeaderComponent: true,
                    FooterComponent: true,
                    RouterView: true
                }
            }
        })
        expect(wrapper.exists()).toBe(true)
    })
})
