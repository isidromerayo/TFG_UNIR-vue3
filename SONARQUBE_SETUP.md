# SonarQube Configuration for Vue3 Project

Este documento explica la configuración de SonarQube para el proyecto Vue3 frontend.

## Archivos de Configuración

### `sonar-project.properties`
Configuración principal de SonarQube con:
- Exclusión de regla S2068 (hard-coded passwords) para archivos de test
- Configuración de rutas LCOV para cobertura de código
- Exclusiones de cobertura para archivos de test y build

### `vitest.config.ts`
Configuración de Vitest con:
- Reporter LCOV habilitado para SonarQube
- Umbrales de cobertura configurados al 80%
- Exclusiones apropiadas para archivos de configuración

### `.sonarignore`
Patrones de archivos a ignorar completamente por SonarQube.

## Comandos Útiles

### Ejecutar Tests con Cobertura
```bash
# Generar reporte de cobertura completo
pnpm run test:coverage

# Alternativa (mismo comando)
pnpm run test-headless-cc
```

### Verificar Archivos de Cobertura
```bash
# Ver archivo LCOV generado
cat coverage/lcov.info

# Abrir reporte HTML
open coverage/index.html
```

## Integración con SonarQube Cloud

### Configuración en CI/CD
Para que SonarQube Cloud reciba la cobertura correctamente:

1. **Ejecutar tests con cobertura** antes del análisis de SonarQube
2. **Verificar que existe** `coverage/lcov.info`
3. **Configurar las variables** de entorno necesarias

### Variables de Entorno Requeridas
```bash
SONAR_TOKEN=your_sonar_token
SONAR_HOST_URL=https://sonarcloud.io
```

### Ejemplo de GitHub Actions
```yaml
- name: Run tests with coverage
  run: pnpm run test:coverage

- name: SonarCloud Scan
  uses: SonarSource/sonarcloud-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## Métricas de Cobertura Actuales

- **Cobertura Total**: 47.18%
- **Tests**: 41 tests pasando
- **Archivos Cubiertos**: 8/18 componentes principales

### Componentes con 100% Cobertura
- AccesoComponent.vue
- BusquedaComponent.vue  
- FooterComponent.vue
- HeaderComponent.vue
- MisDatosComponent.vue
- SliderComponent.vue

### Componentes Pendientes (0% Cobertura)
- CategoriaComponent.vue
- CategoriasComponent.vue
- CursoComponent.vue
- HomeComponent.vue

## Resolución de Problemas

### Cobertura No Aparece en SonarQube
1. Verificar que `coverage/lcov.info` existe
2. Comprobar rutas en `sonar-project.properties`
3. Asegurar que el análisis se ejecuta después de los tests

### Reglas de Seguridad en Tests
- Los archivos de test están excluidos de la regla S2068
- Usar comentarios `// NOSONAR` para casos específicos
- Mantener constantes de test claramente marcadas

## Comandos de Verificación

```bash
# Verificar configuración de SonarQube
cat sonar-project.properties

# Verificar que LCOV se genera
pnpm run test:coverage && ls -la coverage/lcov.info

# Ver estadísticas de cobertura
pnpm run test:coverage | grep "% Coverage"
```