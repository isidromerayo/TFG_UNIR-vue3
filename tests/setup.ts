import { vi, beforeAll, afterEach } from 'vitest';
import { config } from '@vue/test-utils';

// Configuración global de Vue Test Utils
config.global = {
  ...config.global,
  stubs: {
    'router-link': true,
    'router-view': true,
  },
  mocks: {
    $t: (key: string) => key, // Mock para vue-i18n si lo usas
  },
};

// Mock de axios
const axiosMock = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  create: () => axiosMock,
  interceptors: {
    request: { use: vi.fn(), eject: vi.fn() },
    response: { use: vi.fn(), eject: vi.fn() },
  },
};

vi.mock('axios', () => ({
  __esModule: true,
  default: axiosMock,
  ...axiosMock,
}));

// Mock de vue-router
const mockRoute = {
  params: {},
  query: {},
  path: '/',
  fullPath: '/',
  hash: '',
  name: '',
  matched: [],
  redirectedFrom: undefined,
  meta: {},
};

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  currentRoute: mockRoute,
};

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => mockRouter,
  RouterLink: {
    template: '<a><slot></slot></a>',
  },
}));

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Configuración global antes de las pruebas
beforeAll(() => {
  global.localStorage = localStorageMock;
  
  // Configurar mocks por defecto
  axiosMock.get.mockResolvedValue({ data: {} });
  axiosMock.post.mockResolvedValue({ data: {} });
  axiosMock.put.mockResolvedValue({ data: {} });
  axiosMock.delete.mockResolvedValue({ data: {} });
});

// Limpiar mocks después de cada prueba
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  
  // Restablecer el mock de la ruta
  Object.assign(mockRoute, {
    params: {},
    query: {},
    path: '/',
    fullPath: '/',
    hash: '',
    name: '',
    matched: [],
    redirectedFrom: undefined,
    meta: {},
  });
  
  // Restablecer el mock del router
  Object.assign(mockRouter, {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: mockRoute,
  });
});
