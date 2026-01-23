# 🤖 AGENTS.md - Contexto Completo del Proyecto Vue3

## 📋 Información General

**Proyecto**: TFG UNIR - Frontend Vue3  
**Framework**: Vue 3.5.26 + Vite 7.3.0  
**Lenguaje**: TypeScript 5.9.2  
**Package Manager**: pnpm  
**Propósito**: Aplicación web frontend para sistema de gestión de cursos online

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

**Core**:
- Vue 3.5.26 (Composition API)
- Vite 7.3.0 (Build tool)
- TypeScript 5.9.2 (Strict Mode)
- Vue Router 4.6.4
- Pinia 3.0.4 (State management)

**UI/UX**:
- SweetAlert2 11.26.17 (Alertas)
- CSS/SCSS personalizado

**HTTP Client**:
- Axios 1.10.0

**Testing**:
- Vitest 4.0.16 (Unit tests)
- @vitest/ui 4.0.16 (Test UI)
- @vitest/coverage-v8 4.0.16 (Coverage)
- @testing-library/vue 8.1.0
- @testing-library/jest-dom 6.6.3
- Cypress 15.8.1 (E2E & Component Testing)

**Linting & Formatting**:
- ESLint 9.39.2
- eslint-plugin-vue 10.3.0
- Prettier 3.7.4

**Validation**:
- Yup 1.6.1

---

## 📁 Estructura del Proyecto

```
TFG_UNIR-vue3/
├── .github/
│   ├── workflows/
│   │   ├── node.js.yml          # CI/CD workflow
│   │   ├── security.yml         # Security audit workflow
│   │   └── codeql.yml          # CodeQL analysis
│   └── dependabot.yml          # Dependabot configuration
│
├── cypress/                     # E2E tests
│   ├── e2e/                    # Test specs
│   ├── fixtures/               # Test data
│   └── support/                # Support files
│
├── public/                      # Static assets
│   └── favicon.ico
│
├── scripts/                     # Utility scripts
│   └── security-check.sh       # Multi-tool security audit
│
├── src/
│   ├── assets/                 # Images, fonts, etc.
│   ├── components/             # Vue components
│   │   ├── AccesoComponent.vue
│   │   ├── BusquedaComponent.vue
│   │   ├── CarritoComponent.vue
│   │   ├── CategoriaComponent.vue
│   │   ├── CursoComponent.vue
│   │   ├── FooterComponent.vue
│   │   ├── HeaderComponent.vue
│   │   ├── HomeComponent.vue
│   │   ├── MisCursosComponent.vue
│   │   ├── MisDatosComponent.vue
│   │   ├── RegistroComponent.vue
│   │   ├── SliderComponent.vue
│   │   └── ValoracionComponent.vue
│   │
│   ├── model/                  # Data models
│   ├── router/                 # Vue Router configuration
│   │   └── index.ts
│   ├── services/               # API services
│   │   └── session.ts
│   ├── stores/                 # Pinia stores
│   │   └── app.ts
│   ├── types/                  # TypeScript types & interfaces
│   │   └── models.ts
│   ├── utils/                  # Utility functions
│   ├── views/                  # Page views
│   ├── App.vue                 # Root component
│   └── main.ts                 # Application entry point
│
├── tests/
│   ├── unit/                   # Unit tests
│   │   └── componentes/
│   │       ├── AccesoComponent.spec.ts
│   │       ├── AppComponent.spec.ts    # Minimalist test for structural coverage
│   │       ├── BusquedaComponent.spec.ts
│   │       ├── CarritoComponent.spec.ts
│   │       ├── FooterComponent.spec.ts  # Minimalist test for structural coverage
│   │       └── SliderComponent.spec.ts
│   └── setup.ts                # Test setup
│
├── .eslintrc.cjs               # ESLint config (legacy)
├── .gitignore                  # Git ignore rules
├── .npmrc                      # pnpm configuration
├── .prettierrc.json            # Prettier config
├── cypress.config.ts           # Cypress configuration
├── env.d.ts                    # Environment types
├── eslint.config.ts            # ESLint config (flat)
├── index.html                  # HTML entry point
├── migrate-to-pnpm.sh          # Migration script
├── package.json                # Dependencies & scripts
├── pnpm-lock.yaml              # pnpm lockfile
├── pnpm-workspace.yaml         # pnpm workspace config
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.node.json          # Node TypeScript config
├── tsconfig.vitest.json        # Vitest TypeScript config
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest configuration
├── vitest.setup.ts             # Vitest setup
└── vuex.d.ts                   # Vuex type declarations
```

---

## 🔧 Scripts Disponibles

### Desarrollo

```bash
# Servidor de desarrollo (http://localhost:5173)
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

### Testing

```bash
# Tests unitarios con watch mode
pnpm test:unit

# Tests unitarios headless
pnpm test-headless

# Tests con coverage
pnpm test-headless-cc

# Cypress E2E (interactivo)
pnpm cypress:open

# Cypress E2E (headless)
pnpm cypress:run

# Cypress Component (headless)
pnpm cypress:component

# Cypress Component (interactivo)
pnpm cypress:component:open

# Cypress Component con coverage
pnpm cypress:component:coverage
```

### Calidad de Código

```bash
# Type checking
pnpm type-check

# Linter (con autofix)
pnpm lint

# Formatter
pnpm format
```

### Seguridad

```bash
# Auditoría completa multi-herramienta
pnpm security

# Solo pnpm audit
pnpm security:audit

# Ver dependencias desactualizadas
pnpm security:outdated
```

---

## 🎨 Componentes Principales

### 1. HomeComponent.vue
- **Propósito**: Página principal con slider y listado de cursos
- **Features**: Categorías, cursos destacados, actualizaciones
- **Estado**: Usa Vuex store

### 2. AccesoComponent.vue
- **Propósito**: Login de usuarios
- **Features**: Validación de formulario, gestión de sesión
- **Servicios**: session.ts

### 3. RegistroComponent.vue
- **Propósito**: Registro de nuevos usuarios
- **Features**: Validación con Yup, formulario multi-campo
- **Validación**: Email, contraseña, términos

### 4. CarritoComponent.vue
- **Propósito**: Carrito de compras
- **Features**: Gestión de items, cálculo de totales, checkout
- **Estado**: Vuex store

### 5. CursoComponent.vue
- **Propósito**: Detalle de curso individual
- **Features**: Información completa, añadir al carrito
- **Routing**: Parámetro dinámico `:id`

### 6. BusquedaComponent.vue
- **Propósito**: Búsqueda de cursos
- **Features**: Filtrado, resultados dinámicos
- **Routing**: Query parameter

### 7. CategoriaComponent.vue
- **Propósito**: Listado de cursos por categoría
- **Features**: Filtrado por categoría
- **Routing**: Parámetro `:id`

### 8. ValoracionComponent.vue
- **Propósito**: Sistema de valoraciones de cursos
- **Features**: Rating, comentarios
- **Routing**: Parámetro `:id`

### 9. MisCursosComponent.vue
- **Propósito**: Cursos del usuario autenticado
- **Features**: Listado personal, acceso a contenido

### 10. MisDatosComponent.vue
- **Propósito**: Perfil y datos del usuario
- **Features**: Edición de información personal

### 11. HeaderComponent.vue
- **Propósito**: Navegación principal
- **Features**: Menú, carrito, usuario

### 12. FooterComponent.vue
- **Propósito**: Pie de página
- **Features**: Links, información

### 13. SliderComponent.vue
- **Propósito**: Carrusel de imágenes
- **Features**: Navegación automática/manual

---

## 🔄 Estado Global (Pinia)

### Store Structure

```typescript
// stores/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({ ... }),
  actions: { ... },
  getters: { ... }
})
```

### Uso en Componentes

```typescript
import { useAppStore } from '@/stores/app'

const store = useAppStore()
// Acceder al estado directamente
store.property
// Ejecutar acciones directamente
store.actionName(payload)
```

---

## 🛣️ Routing

### Configuración (router/index.ts)

```typescript
const routes = [
  { path: '/', component: HomeComponent },
  { path: '/acceso', component: AccesoComponent },
  { path: '/registro', component: RegistroComponent },
  { path: '/carrito', component: CarritoComponent },
  { path: '/curso/:id', component: CursoComponent },
  { path: '/busqueda', component: BusquedaComponent },
  { path: '/categoria/:id', component: CategoriaComponent },
  { path: '/valoracion/:id', component: ValoracionComponent },
  { path: '/mis-cursos', component: MisCursosComponent },
  { path: '/mis-datos', component: MisDatosComponent },
]
```

### Navegación Programática

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/path')
router.push({ name: 'routeName', params: { id: 123 } })
```

---

## 🌐 Servicios API

### session.ts

```typescript
// Gestión de sesión de usuario
export const sessionService = {
  login(credentials),
  logout(),
  getCurrentUser(),
  isAuthenticated()
}
```

### Axios Configuration

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

---

## ✅ Testing

### Unit Tests (Vitest)

**Ubicación**: `tests/unit/componentes/`

**Configuración**: `vitest.config.ts`

**Estrategia de Cobertura Minimalista**:
Para componentes estructurales (como `App.vue` o `FooterComponent.vue`) donde el "coste/beneficio" de un test complejo es bajo, se utilizan tests minimalistas que aseguran el renderizado básico. Esto garantiza cobertura de líneas sin introducir complejidad de mocks innecesaria.

**Ejemplo Minimalista (`tests/unit/componentes/AppComponent.spec.ts`)**:
```typescript
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import { describe, it, expect, vi } from 'vitest'

vi.mock('vue-router', () => ({
  RouterView: { template: '<div></div>' },
  RouterLink: { template: '<a></a>' }
}))

describe('App.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: { HeaderComponent: true, FooterComponent: true, RouterView: true }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
```

**Ejecutar**:
```bash
pnpm test:unit          # Watch mode
pnpm test-headless      # Single run
pnpm test-headless-cc   # With coverage report
```

### Component Testing (Cypress)

**Ubicación**: `cypress/component/`

**Mejores Prácticas**:
- **data-cy**: Utilizar siempre atributos `data-cy` para los selectores (ej: `data-cy="header"`) para asegurar la estabilidad de los tests frente a cambios de diseño.
- **Estabilidad**: Evitar selecciones complejas basadas en texto o estructura HTML profunda.

**Ejecutar**:
```bash
pnpm cypress:open   # Interactivo
pnpm cypress:run    # Headless
pnpm cypress:component:coverage # Headless con reporte de cobertura
```

### 🧪 Flujo de Desarrollo de Tests

#### **Proceso para Añadir Tests a Componentes**

**1. Identificar Componentes sin Tests**
```bash
# Ejecutar cobertura para ver qué falta
pnpm run test-headless-cc

# Revisar reporte de cobertura
# Buscar componentes con 0% cobertura
```

**2. Crear Test para Nuevo Componente**
```bash
# Estructura de archivo de test
tests/unit/componentes/[ComponentName].spec.ts
```

**3. Plantilla Base de Test**
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from '@/components/ComponentName.vue'

// Mocks necesarios
vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn() }
}))

describe('ComponentName', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ComponentName)
    vi.clearAllMocks()
  })

  it('renderiza correctamente', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Expected text')
  })

  // Más tests específicos...
})
```

**4. Ejecutar Tests Después de Cada Creación**
```bash
# SIEMPRE ejecutar después de crear/modificar tests
pnpm run test-headless

# Verificar que todos pasan
# Si fallan, arreglar antes de continuar
```

**5. Verificar Cobertura Mejorada**
```bash
# Ejecutar con cobertura
pnpm run test-headless-cc

# Verificar mejora en el reporte
# Objetivo: >80% cobertura por componente
```

#### **Tipos de Tests por Componente**

**Componentes de UI Simples** (Footer, Header):
- Renderizado correcto
- Estructura HTML
- Contenido estático
- Enlaces/navegación

**Componentes con Formularios** (Registro, Acceso):
- Validación de campos
- Envío de formulario
- Manejo de errores
- Estados de carga

**Componentes con Estado** (Carrito, Búsqueda):
- Estado inicial
- Cambios de estado
- Interacciones del usuario
- Integración con store

**Componentes con API** (Cursos, Categorías):
- Carga de datos
- Estados de loading/error
- Manejo de respuestas
- Mocks de axios

#### **Mejores Prácticas de Testing**

**✅ Hacer**:
- Ejecutar tests después de cada cambio
- Mockear dependencias externas (axios, sweetalert2)
- Testear comportamiento, no implementación
- Usar nombres descriptivos para tests
- Verificar cobertura regularmente

**❌ No Hacer**:
- Commitear código con tests fallando
- Testear detalles de implementación
- Ignorar warnings de tests
- Crear tests sin assertions
- Saltarse la verificación de cobertura

#### **Comandos de Testing Workflow**

```bash
# 1. Crear nuevo test
touch tests/unit/componentes/NewComponent.spec.ts

# 2. Ejecutar tests (OBLIGATORIO después de cada cambio)
pnpm run test-headless

# 3. Verificar cobertura
pnpm run test-headless-cc

# 4. Si todo pasa, continuar con desarrollo
# 5. Si fallan, arreglar antes de commit
```

#### **Métricas de Calidad**

**Objetivos de Cobertura**:
- **Componentes**: >90%
- **Servicios**: >80%
- **Utils**: >95%
- **General**: >70%

**Estado Actual**:
- Tests totales: 76 (73 Unitarios + 3 Componente)
- Archivos de test: 20
- Cobertura general: ~70% (Progreso activo)
- Componentes testeados: 13/18

---

## 🔒 Seguridad

### Infraestructura Multi-Capa

**1. Local Development**:
```bash
pnpm security              # Auditoría completa
pnpm security:audit        # Solo pnpm audit
pnpm security:outdated     # Dependencias desactualizadas
```

**2. CI/CD** (`.github/workflows/security.yml`):
- Ejecución diaria automática (2 AM UTC)
- Ejecución en push/PR
- 5 herramientas: pnpm audit, npm audit, Snyk, OSV Scanner, outdated check
- Generación de reportes JSON
- Creación automática de issues
- Comentarios en PRs

**3. Dependabot** (`.github/dependabot.yml`):
- Checks diarios
- Agrupación inteligente (Vue, Vite, Testing, TypeScript, ESLint)
- Límite de 10 PRs abiertas

**4. CodeQL**:
- Análisis de código estático
- Detección de vulnerabilidades

### Estado Actual

```
✅ 0 vulnerabilidades conocidas
✅ 668 paquetes instalados
✅ Todas las dependencias actualizadas
✅ Monitoreo continuo activo
```

---

## 🚀 CI/CD

### Workflow Principal (`.github/workflows/node.js.yml`)

**Triggers**:
- Push a `main`
- Pull requests a `main`

**Pipeline**:
1. Checkout code
2. Setup Node.js 20.x
3. Install pnpm 10.x
4. Setup pnpm cache
5. Install dependencies (frozen-lockfile)
6. Type check
7. Build
8. Run tests with coverage
9. Security audit

**Beneficios**:
- ✅ Builds reproducibles
- ✅ Instalación rápida con caché
- ✅ Verificación automática de calidad
- ✅ Detección temprana de errores

---

## 📦 Gestión de Dependencias

### pnpm

**Ventajas**:
- ⚡ Instalación ~2x más rápida que npm
- 💾 Ahorro significativo de espacio en disco
- 🔒 Lockfile más estricto y seguro
- 🎯 Mejor manejo de peer dependencies

**Configuración** (`.npmrc`):
```ini
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
node-linker=isolated
```

**Comandos Comunes**:
```bash
pnpm install              # Instalar dependencias
pnpm add <pkg>           # Añadir dependencia
pnpm add -D <pkg>        # Añadir dev dependency
pnpm remove <pkg>        # Remover dependencia
pnpm update              # Actualizar dependencias
pnpm update --latest     # Actualizar a últimas versiones
pnpm outdated            # Ver dependencias desactualizadas
pnpm audit               # Auditoría de seguridad
```

---

## 🔧 Configuración de TypeScript

### tsconfig.json (Base)
- Target: ES2020
- Module: ESNext
- Strict mode: enabled
- Path aliases: `@/*` → `./src/*`

### tsconfig.app.json
- Configuración para código de aplicación
- Include: `src/**/*`, `env.d.ts`

### tsconfig.node.json
- Configuración para scripts de Node
- Include: `vite.config.ts`, `vitest.config.ts`

### tsconfig.vitest.json
- Configuración para tests
- Include: `tests/**/*`, `vitest.setup.ts`

---

## 🎨 Estilos y CSS

### Estrategia
- CSS/SCSS en componentes Vue (scoped)
- Estilos globales en `src/assets/`
- Variables CSS para temas

### Ejemplo
```vue
<style scoped>
.component {
  /* Estilos específicos del componente */
}
</style>
```

---

## 🐛 Debugging

### Vue DevTools
- Instalar extensión de navegador
- Inspeccionar componentes, estado, eventos

### Vite DevTools
- Plugin: `vite-plugin-vue-devtools`
- Análisis de performance, componentes

### Console Logging
```typescript
console.log('Debug:', data)
console.error('Error:', error)
console.warn('Warning:', warning)
```

---

## 📝 Convenciones de Código

### Nomenclatura

**Componentes**:
- PascalCase: `MyComponent.vue`
- Sufijo Component: `HeaderComponent.vue`

**Archivos TypeScript**:
- camelCase: `myService.ts`
- kebab-case para tests: `my-component.spec.ts`

**Variables y Funciones**:
- camelCase: `myVariable`, `myFunction()`

**Constantes**:
- UPPER_SNAKE_CASE: `API_BASE_URL`

### Estructura de Componentes

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue'

// 2. Props & Emits
const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

// 3. Reactive state
const count = ref(0)

// 4. Computed properties
const doubleCount = computed(() => count.value * 2)

// 5. Methods
const increment = () => {
  count.value++
}

// 6. Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

---

## 🔄 Workflow de Desarrollo

### 1. Crear Feature Branch
```bash
git checkout -b feature/my-feature
```

### 2. Desarrollo
```bash
pnpm dev                 # Servidor de desarrollo
pnpm type-check          # Verificar tipos
pnpm lint                # Linter
```

### 3. Testing (OBLIGATORIO)
```bash
# Si añades/modificas componentes, crear/actualizar tests
# Ubicación: tests/unit/componentes/[ComponentName].spec.ts

# 1. Tests unitarios headless
pnpm run test-headless

# 2. Tests de componentes (Cypress)
pnpm run cypress:component

# REGLA: No continuar si los tests fallan
# OBJETIVO: Mantener >70% cobertura general
```

**Flujo de Testing**:
1. **Crear test** para nuevo componente.
2. **Ejecutar** `pnpm run test-headless` y `pnpm run cypress:component`.
3. **Verificar** que todos los tests pasan.
4. **Revisar cobertura** con `pnpm run test-headless-cc`.
5. **Arreglar** cualquier test que falle antes de continuar.

#### **FLUJO OBLIGATORIO PARA AGENTES**:

1. **Linter**: `pnpm lint`
2. **Tests**: `pnpm run test-headless && pnpm run cypress:component`
3. **Build**: `pnpm build`
4. **Commit**: Solo si los pasos anteriores son verdes.

### 4. Build
```bash
pnpm build               # Build de producción
```

### 5. Commit
```bash
git add .
git commit -m "feat: add new feature"
```

### 6. Push y PR
```bash
git push origin feature/my-feature
# Crear Pull Request en GitHub
```

---

## 📚 Recursos

### Documentación Oficial
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)
- [pnpm](https://pnpm.io/)

### Guías del Proyecto
- [PULL_REQUEST.md](./PULL_REQUEST.md) - Documentación de PR
- [README.md](./README.md) - Documentación principal
- [migrate-to-pnpm.sh](./migrate-to-pnpm.sh) - Script de migración

---

## 🤝 Contribución

### Checklist Pre-Commit

- [ ] ✅ Type check pasa: `pnpm type-check`
- [ ] ✅ Linter pasa: `pnpm lint`
- [ ] ✅ Tests pasan: `pnpm test-headless`
- [ ] ✅ Build exitoso: `pnpm build`
- [ ] ✅ Sin vulnerabilidades: `pnpm audit`

### Checklist Pre-PR

- [ ] ✅ Rama actualizada con main
- [ ] ✅ Commits bien estructurados
- [ ] ✅ Documentación actualizada
- [ ] ✅ Tests añadidos/actualizados
- [ ] ✅ Sin conflictos

---

## 🎯 Mejores Prácticas

### Vue 3 Composition API

1. **Usar `<script setup>`** para sintaxis más limpia
2. **Reactive refs** con `ref()` y `reactive()`
3. **Computed properties** con `computed()`
4. **Lifecycle hooks** con `onMounted()`, `onUnmounted()`, etc.
5. **Props typing** con TypeScript

### TypeScript

1. **Tipar todo** - props, emits, variables, funciones
2. **Evitar `any`** - usar tipos específicos
3. **Interfaces** para objetos complejos
4. **Type guards** para validación en runtime

### Testing

1. **Test unitarios** para lógica de negocio
2. **Test de componentes** para UI
3. **E2E tests** para flujos críticos
4. **Coverage** mínimo del 80%

### Performance

1. **Lazy loading** de componentes y rutas
2. **Computed properties** en lugar de methods para cálculos
3. **v-show vs v-if** según caso de uso
4. **Debounce** en inputs de búsqueda

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Componentes | 18 |
| Tests totales | 76 |
| Cobertura | ~70% |
| Dependencias | 668 |
| Vulnerabilidades | 0 |
| Tamaño del build | ~60 KB |

---

## 🔮 Roadmap

### Completado ✅
- [x] Migración a pnpm
- [x] Infraestructura de seguridad
- [x] CI/CD con GitHub Actions
- [x] Tests unitarios básicos
- [x] Documentación completa

### Pendiente 📋
- [ ] Aumentar cobertura de tests (>90%)
- [x] Implementar tests de componentes con Cypress
- [ ] Implementar tests E2E con Cypress (flujos críticos)
- [ ] Optimización de bundle size
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)

---

**Última actualización**: 1 de enero de 2026  
**Versión**: 0.1.0  
**Mantenedor**: @isidromerayo
