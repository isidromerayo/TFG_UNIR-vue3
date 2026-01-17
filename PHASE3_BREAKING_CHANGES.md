# Fase 3: Análisis de Breaking Changes

## 🔴 Vite 7.0 - Breaking Changes Críticos

### Requisitos de Sistema
- **Node.js**: Requiere 20.19+ o 22.12+ (actualmente tenemos que verificar)
- **Vitest**: Requiere versión 3.2+ (actualmente tenemos 4.0.16 ✅)

### Cambios Importantes
1. **Default Browser Target**: Cambió de 'modules' a 'baseline-widely-available'
   - Chrome: 87 → 107
   - Edge: 88 → 107
   - Firefox: 78 → 104
   - Safari: 14.0 → 16.0

2. **Sass API Legacy**: Eliminado soporte para legacy Sass API

3. **Features Removidos**:
   - `splitVendorChunkPlugin` eliminado
   - Deprecated features removidos

4. **JavaScript Transforms**: Ahora usa Oxc en lugar de esbuild (esbuild deprecado)

### Nuevas Features
- **Rolldown Bundler**: Disponible como reemplazo (opcional)
- **Environment API**: Mejorado con nuevo hook `buildApp`

### Impacto en Nuestro Proyecto
- ✅ Vitest 4.0.16 es compatible
- ⚠️ Necesitamos verificar versión de Node.js
- ⚠️ Revisar si usamos Sass (no parece que lo usemos)
- ⚠️ Revisar `vite.config.ts` para features deprecados

---

## 🟡 @vitejs/plugin-vue 6.0 - Breaking Changes

### Cambios Principales
1. **Reactivity Transform**: Ya NO soportado (removido en coordinación con Vue 3.4)
   - Si se usaba, migrar a VueMacros
   
2. **Option Renamed**: `refTransform` → `reactivityTransform` (pero ya no se usa)

3. **HMR Hook**: `hmr: handleHotUpdate` ahora recibe un solo argumento `HmrContext`

4. **Requisitos**:
   - Vue: `^3.2.25` (tenemos 3.5.26 ✅)
   - Vite: 5+ (vamos a 7 ✅)
   - Node.js: 18+ eliminado soporte para 14 y 16

### Impacto en Nuestro Proyecto
- ✅ Vue 3.5.26 es compatible
- ⚠️ Revisar si usamos Reactivity Transform (probablemente no)
- ⚠️ Revisar `vite.config.ts` para opciones deprecadas

---

## 🟢 vue-tsc 3.0 - Cambios

### Cambios Principales
1. **Nuevas Opciones**:
   - `strictVModel` option
   - `strictCssModules` option

2. **Features Mejorados**:
   - Mejor soporte para eventos con `v-on`
   - Mejor type support para slot children
   - Autocomplete para props con union types

3. **Removido**: `defineProp` support eliminado

4. **Refactor**: Comunicación con tsserver basada en request forwarding

### Impacto en Nuestro Proyecto
- ✅ Cambios principalmente son mejoras
- ⚠️ Verificar si usamos `defineProp` (probablemente no)
- ✅ Las nuevas opciones son opcionales

---

## 📋 Plan de Acción Recomendado

### Pre-requisitos
1. ✅ Verificar versión de Node.js
2. ✅ Revisar `vite.config.ts` actual
3. ✅ Identificar features deprecados en uso

### Orden de Actualización
1. **Vite 7.0** primero (base del ecosistema)
2. **@vitejs/plugin-vue 6.0** después (depende de Vite)
3. **vue-tsc 3.2.1** al final (type checking)

### Riesgos Identificados
- 🟢 **BAJO**: vue-tsc 3.x (principalmente mejoras)
- 🟡 **MEDIO**: @vitejs/plugin-vue 6.x (cambios en HMR hook)
- 🟡 **MEDIO**: Vite 7.x (cambios en browser targets y APIs)

### Mitigación
- Hacer cada actualización por separado
- Verificar build y tests después de cada una
- Tener plan de rollback listo
