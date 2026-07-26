# Seguridad del Proyecto

## Auditorías de vulnerabilidades

### Herramientas

- **pnpm audit**: Escanea la base de datos de advisory de npm
- **Script personalizado**: `./scripts/security-check.sh` ejecuta múltiples herramientas

### Comandos rápidos

```bash
pnpm security          # Auditoría completa multi-herramienta
pnpm security:audit    # Solo pnpm audit
pnpm security:outdated # Dependencias desactualizadas
```

## Última auditoría: 2026-05-01

### Resultado: 47/49 vulnerabilidades resueltas

| Severidad | Antes | Después |
|-----------|-------|---------|
| Crítica   | 1     | 0       |
| Alta      | 28    | 0       |
| Moderada  | 17    | 0       |
| Baja      | 3     | 0       |
| Total     | 49    | 2*      |

\*2 vulnerabilidades residuales en `brace-expansion` (dev tools: nyc/js-beautify) — sin parche disponible para versión 1.x.

### Cambios principales (PR #165)

- **axios**: 1.15.2 → 1.18.1 (15 CVEs)
- **vite**: 7.3.2 → 7.3.6 (2 CVEs)
- 15 overrides añadidos en `pnpm.overrides` para dependencias transitive

### Vulnerabilidades residuales

| Paquete | Versión | Severidad | Razón |
|---------|---------|-----------|-------|
| brace-expansion | 1.1.14 | Alta | Solo afecta nyc/js-beautify (dev tools). La versión parche 5.x es incompatible con minimatch@3.x. No procesa input de usuarios. |

## Proceso de auditoría

1. Ejecutar `pnpm security` o `pnpm audit`
2. Identificar dependencias vulnerables: directas vs transitivas
3. Dependencias directas → actualizar en `package.json`
4. Dependencias transitivas → añadir `pnpm.overrides` en `package.json`
5. Ejecutar `pnpm install`
6. Verificar: `pnpm lint && pnpm type-check && pnpm test-headless && pnpm build`
7. Confirmar con `pnpm audit`
