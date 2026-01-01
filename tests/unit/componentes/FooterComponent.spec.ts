import { shallowMount } from '@vue/test-utils'
import FooterComponent from '@/components/FooterComponent.vue'
import { describe, it, expect } from 'vitest'

describe('FooterComponent.vue', () => {
    it('se renderiza correctamente', () => {
        const wrapper = shallowMount(FooterComponent)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('UNIR TFG')
    })
})
