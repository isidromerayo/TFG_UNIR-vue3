import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BusquedaComponent from '@/components/BusquedaComponent.vue';

// Mocks
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

// Mock vue-router
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn()
  })),
  RouterLink: {
    template: '<a :href="to"><slot></slot></a>',
    props: ['to']
  }
}));

// Create a mock component for RouterLink
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot></slot></a>',
  props: ['to']
};

describe('BusquedaComponent', () => {
  let wrapper: VueWrapper;
  const mockRoute = {
    params: {
      search: 'angular'
    }
  };

  const mockCursosResponse = {
    data: {
      _embedded: {
        cursos: [
          {
            id: 1,
            titulo: 'Curso de Angular',
            descripcion: 'Aprende Angular desde cero',
          },
          {
            id: 2,
            titulo: 'Angular Avanzado',
            descripcion: 'Conceptos avanzados de Angular',
          }
        ]
      }
    }
  };

  beforeEach(() => {
    // Configurar el mock de useRoute
    (useRoute as any).mockReturnValue(mockRoute);
    
    // Configurar el mock de axios
    mockedAxios.get.mockResolvedValue(mockCursosResponse);
    
    // Montar el componente
    wrapper = mount(BusquedaComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          })
        ],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el componente correctamente', () => {
    expect(wrapper.text()).toContain('Búsqueda de nuestros cursos');
    expect(wrapper.text()).toContain('angular');
  });

  it('muestra mensaje cuando no hay resultados', async () => {
    // Sobrescribir el mock para simular que no hay resultados
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _embedded: {
          cursos: []
        }
      }
    });

    // Volver a montar el componente con la nueva respuesta
    wrapper = mount(BusquedaComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          })
        ],
        stubs: {
          RouterLink: true
        }
      },
    });

    await flushPromises();
    
    const text = wrapper.text();
    expect(text).toContain('No hay resultados para el texto indicado');
    
    const link = wrapper.findComponent({ name: 'RouterLink' });
    expect(link.exists()).toBe(true);
    expect(link.attributes('to')).toBe('/home');
  });

  it('carga los cursos al montar el componente', async () => {
    await flushPromises();
    
    // Verificar que se llamó a axios con la URL correcta
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('cursos/search/findByTituloContaining?titulo=angular')
    );
    
    // Verificar que se muestran los cursos
    const cursos = wrapper.findAll('.listado-categorias');
    expect(cursos).toHaveLength(2);
    expect(wrapper.text()).toContain('Curso de Angular');
    expect(wrapper.text()).toContain('Aprende Angular desde cero');
    expect(wrapper.text()).toContain('Angular Avanzado');
  });

  it('muestra enlaces a los detalles del curso', async () => {
    await flushPromises();
    
    // Verificar que se muestran los cursos
    const cursos = wrapper.findAll('.listado-categorias');
    expect(cursos).toHaveLength(2);
    
    // Verificar que los títulos de los cursos están presentes
    const titulos = wrapper.findAll('h2');
    expect(titulos[0].text()).toContain('Curso de Angular');
    expect(titulos[1].text()).toContain('Angular Avanzado');
    
    // Verificar que los enlaces RouterLink están presentes (usando el nombre del componente en minúsculas con guión)
    const routerLinks = wrapper.findAll('router-link-stub');
    expect(routerLinks.length).toBe(2);
    
    // Verificar que los enlaces tienen las rutas correctas
    expect(routerLinks[0].attributes('to')).toBe('/curso/1');
    expect(routerLinks[1].attributes('to')).toBe('/curso/2');
  });

  it('maneja correctamente cuando no hay resultados de búsqueda', async () => {
    // Limpiar mocks anteriores
    vi.clearAllMocks();
    
    // Simular una respuesta vacía de la API
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _embedded: {
          cursos: []
        }
      }
    });
    
    // Remontar el componente con un término de búsqueda que no devuelve resultados
    await wrapper.unmount();
    
    const emptyResultsWrapper = mount(BusquedaComponent, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: { params: { search: 'termino_sin_resultados' } }
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    
    await flushPromises();
    
    // Verificar que se muestra el mensaje de "sin resultados"
    const sinResultados = emptyResultsWrapper.find('.sin-resultados');
    expect(sinResultados.exists()).toBe(true);
    
    // Verificar que se muestra el mensaje de error
    expect(sinResultados.text()).toContain('No hay resultados para el texto indicado');
    
    // Verificar que hay un párrafo con un enlace RouterLink
    const parrafo = sinResultados.find('p');
    expect(parrafo.exists()).toBe(true);
    
    const volverInicioLink = parrafo.findComponent(RouterLinkStub);
    expect(volverInicioLink.exists()).toBe(true);
    
    // Restaurar el wrapper original para los demás tests
    wrapper = mount(BusquedaComponent, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: { params: { search: 'angular' } }
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    
    // Restaurar el mock de axios para los demás tests
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _embedded: {
          cursos: [
            { id: 1, titulo: 'Curso de Angular', descripcion: 'Aprende Angular desde cero' },
            { id: 2, titulo: 'Angular Avanzado', descripcion: 'Conceptos avanzados de Angular' }
          ]
        }
      }
    });
    
    await flushPromises();
  });
});
