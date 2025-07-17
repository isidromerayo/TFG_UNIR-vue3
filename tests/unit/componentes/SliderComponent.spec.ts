import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import SliderComponent from '@/components/SliderComponent.vue';

// Mock the router
const mockPush = vi.fn();

// Mock the useRouter composable
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
    currentRoute: { value: { path: '/' } }
  }),
  useRoute: () => ({
    path: '/'
  })
}));

describe('SliderComponent', () => {
  let wrapper;
  
  const createWrapper = () => {
    return mount(SliderComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          })
        ]
      },
    });
  };
  
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    wrapper = createWrapper();
  });

  it('renders the component with correct title and description', () => {
    expect(wrapper.find('h2').text()).toBe('Encuentra tu curso');
    expect(wrapper.find('p').text()).toContain('Facere distinctio molestiae');
  });

  it('has a search input and button', () => {
    const input = wrapper.find('input[type="text"]');
    const button = wrapper.find('button[type="submit"]');
    
    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Buscar');
  });

  it('updates search data when typing in the input', async () => {
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Angular');
    await nextTick();
    
    // In Vue 3 with Composition API, we need to access the component instance differently
    expect(wrapper.vm.search).toBe('Angular');
  });

  it('navigates to search URL when form is submitted with search term', async () => {
    const input = wrapper.find('input[type="text"]');
    const form = wrapper.find('form');
    
    // Set the input value directly in the input element
    await input.setValue('Vue.js');
    
    // Trigger the form submission
    await form.trigger('submit');
    
    // Check if the router push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/buscar/Vue.js');
  });

  it('navigates to search URL with empty query when search is empty', async () => {
    // Make sure the input is empty
    const input = wrapper.find('input[type="text"]');
    await input.setValue('');
    
    // Trigger the form submission
    const form = wrapper.find('form');
    await form.trigger('submit');
    
    // Check that the router push was called with empty search
    expect(mockPush).toHaveBeenCalledWith('/buscar/');
  });
});
