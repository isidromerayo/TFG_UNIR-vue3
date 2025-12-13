# TFG UNIR - Frontend Vue3

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=isidromerayo_TFG_UNIR-vue3&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=isidromerayo_TFG_UNIR-vue3)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=isidromerayo_TFG_UNIR-vue3&metric=coverage)](https://sonarcloud.io/summary/new_code?id=isidromerayo_TFG_UNIR-vue3)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=isidromerayo_TFG_UNIR-vue3&metric=bugs)](https://sonarcloud.io/summary/new_code?id=isidromerayo_TFG_UNIR-vue3)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=isidromerayo_TFG_UNIR-vue3&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=isidromerayo_TFG_UNIR-vue3)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=isidromerayo_TFG_UNIR-vue3&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=isidromerayo_TFG_UNIR-vue3)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=isidromerayo_TFG_UNIR-vue3&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=isidromerayo_TFG_UNIR-vue3)

Aplicación web frontend desarrollada en Vue 3 con Vite para un sistema de gestión de cursos online.

## 🚀 Tecnologías

- **Framework**: Vue 3.5.25
- **Build Tool**: Vite 6.4.1
- **Lenguaje**: TypeScript 5.8.3
- **Package Manager**: pnpm
- **Router**: Vue Router 4.6.3
- **State Management**: Vuex 4.1.0
- **HTTP Client**: Axios 1.13.2
- **UI/Alerts**: SweetAlert2 11.26.4
- **Testing**: Vitest + Testing Library, Cypress

## 📦 Instalación

### Prerequisitos

- Node.js 20.x o superior
- pnpm 8.0.0 o superior

### Instalar pnpm

```bash
npm install -g pnpm
```

### Instalar Dependencias

```bash
pnpm install
```

## 🛠️ Desarrollo

### Servidor de Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build de Producción

```bash
pnpm build
```

### Preview del Build

```bash
pnpm preview
```

### Type Checking

```bash
pnpm type-check
```

### Linter

```bash
pnpm lint
```

### Formatter

```bash
pnpm format
```

## 🧪 Testing

### Tests Unitarios

```bash
# Con watch mode
pnpm test:unit

# Headless (CI/CD)
pnpm test-headless

# Con coverage
pnpm test-headless-cc
```

### Tests E2E (Cypress)

```bash
# Interactivo
pnpm cypress:open

# Headless
pnpm cypress:run
```

## 📁 Estructura del Proyecto

```
TFG_UNIR-vue3/
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── components/      # Componentes Vue
│   ├── model/          # Modelos de datos
│   ├── router/         # Configuración de rutas
│   ├── services/       # Servicios API
│   ├── stores/         # Vuex store
│   ├── types/          # Tipos TypeScript
│   ├── utils/          # Utilidades
│   ├── views/          # Vistas/Páginas
│   ├── App.vue         # Componente raíz
│   └── main.ts         # Punto de entrada
├── tests/              # Tests unitarios
├── cypress/            # Tests E2E
└── public/             # Assets públicos
```

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Preview del build |
| `pnpm type-check` | Verificación de tipos |
| `pnpm test:unit` | Tests con watch mode |
| `pnpm test-headless` | Tests headless |
| `pnpm test-headless-cc` | Tests con coverage |
| `pnpm lint` | Linter con autofix |
| `pnpm format` | Formatter |

## 📚 Documentación

- **[AGENTS.md](./AGENTS.md)** - Contexto completo del proyecto para agentes IA
- **[PULL_REQUEST.md](./PULL_REQUEST.md)** - Documentación de la PR

## 🔒 Seguridad y Mantenimiento

### Auditoría de Seguridad

```bash
# Verificar vulnerabilidades
pnpm audit

# Auditoría con detalles en JSON
pnpm audit --json

# Auditoría con nivel específico
pnpm audit --audit-level=moderate
```

**Estado actual**: ✅ 0 vulnerabilidades conocidas

⚠️ **Importante**: `pnpm audit` solo consulta la npm Advisory Database. Para una seguridad completa, usa el script multi-herramienta:

```bash
pnpm security
```

### Verificar Dependencias Desactualizadas

```bash
# Ver todas las dependencias desactualizadas
pnpm outdated

# Ver solo dependencias de producción
pnpm outdated --prod

# Ver en formato JSON
pnpm outdated --json
```

### Actualizar Dependencias

```bash
# Actualizar todas (respetando semver en package.json)
pnpm update

# Actualizar a últimas versiones (ignora semver)
pnpm update --latest

# Actualizar una dependencia específica
pnpm update <package>

# Actualizar dependencias interactivamente
pnpm update --interactive
```

**Después de actualizar, siempre verificar**:
```bash
pnpm type-check
pnpm lint
pnpm test-headless
pnpm build
```

## 🚀 CI/CD

### GitHub Actions

El proyecto incluye workflows de CI/CD configurados en `.github/workflows/`:

#### Pipeline Principal (node.js.yml)

Se ejecuta automáticamente en:
- Push a `main`
- Pull requests a `main`

**Pasos**:
1. **Checkout** - Descarga el código
2. **Setup Node.js** - Configura Node.js 20.x
3. **Install pnpm** - Instala pnpm 10.x
4. **Cache** - Cachea el store de pnpm
5. **Install** - Instala dependencias con `--frozen-lockfile`
6. **Type Check** - Verifica tipos TypeScript
7. **Build** - Compila el proyecto
8. **Test** - Ejecuta tests con coverage
9. **Audit** - Verifica vulnerabilidades

#### Security Workflow (security.yml)

Auditoría de seguridad multi-herramienta:
- Ejecución diaria automática (2 AM UTC)
- Ejecución en push/PR
- 5 herramientas: pnpm audit, npm audit, Snyk, OSV Scanner, outdated check
- Generación de reportes y alertas automáticas

**Beneficios**:
- ✅ Builds reproducibles con lockfile congelado
- ✅ Instalación rápida con caché de pnpm
- ✅ Verificación automática de calidad de código
- ✅ Detección temprana de errores y vulnerabilidades

## 🔄 Migración a pnpm

Este proyecto ha sido migrado de npm a pnpm.

### Ejecutar Migración

```bash
chmod +x migrate-to-pnpm.sh
./migrate-to-pnpm.sh
```

### Comandos Equivalentes

| npm | pnpm |
|-----|------|
| `npm install` | `pnpm install` |
| `npm install <pkg>` | `pnpm add <pkg>` |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| `npm uninstall <pkg>` | `pnpm remove <pkg>` |
| `npm run <script>` | `pnpm <script>` |
| `npm update` | `pnpm update` |
| `npm audit` | `pnpm audit` |

## 🤝 Contribución

### Workflow de Desarrollo

1. Crear rama para tu feature
2. Hacer cambios
3. Ejecutar type check: `pnpm type-check`
4. Ejecutar linter: `pnpm lint`
5. Ejecutar tests: `pnpm test-headless`
6. Verificar build: `pnpm build`
7. Commit y push
8. Crear Pull Request

### Checklist Pre-Commit

- [ ] ✅ Type check pasa: `pnpm type-check`
- [ ] ✅ Linter pasa: `pnpm lint`
- [ ] ✅ Tests pasan: `pnpm test-headless`
- [ ] ✅ Build exitoso: `pnpm build`
- [ ] ✅ Sin vulnerabilidades: `pnpm audit`

## 💡 IDE Setup Recomendado

### VSCode

**Extensiones**:
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 support
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

**Nota**: Desactiva Vetur si lo tienes instalado (incompatible con Volar)

### Type Support para `.vue` en TypeScript

TypeScript no puede manejar información de tipos para imports `.vue` por defecto. Usamos `vue-tsc` para type checking. En editores, necesitas Volar para que el servicio de lenguaje TypeScript reconozca los tipos `.vue`.

## 📖 Recursos

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vuex Documentation](https://vuex.vuejs.org/)
- [Vitest Documentation](https://vitest.dev/)
- [pnpm Documentation](https://pnpm.io/)

## 📄 Licencia

Este proyecto es parte del TFG de UNIR - Frameworks frontend JavaScript: Análisis y estudio práctico.

---

**Versión**: 0.1.0  
**Node.js**: 20.x  
**Package Manager**: pnpm
