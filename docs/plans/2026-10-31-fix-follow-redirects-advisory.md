# Plan: subir el override de follow-redirects a 1.16.2 (CVE-2026-116689)

- **Fecha**: 2026-10-31
- **Herramienta/modelo**: opencode (deepseek-v4.1-flash)
- **Estado**: done (rama `fix/security-follow-redirects-vue3`, PR abierta)

## Objetivos

1. Alinear el override de `follow-redirects` con la versión parcheada en los tres frontends.
2. Evitar que el árbol dev (`axios` está en `devDependencies` aquí) arrastre una versión vulnerable.

## Contexto

El advisory `GHSA-mrwp-f3q8-3g9p` (`CVE-2026-116689`, high, CVSS 5.9) se publicó el 2026-10-30 a
las 22:59 UTC. En este proyecto **no rompió el CI**: `axios` es `devDependency`, así que
`pnpm audit --prod` no lo ve y la ejecución programada del 2026-10-31 pasó.

Aun así el lockfile resolvía `follow-redirects@1.16.1` (vulnerable `>=1.16.0 <=1.16.1`) porque el
override `>=1.16.1` permitía justo esa versión. Misma causa que en Angular y React, donde sí tumbó
el gate de producción.

## Cambios

- `pnpm-workspace.yaml`: override `follow-redirects` `'>=1.16.1'` → `'>=1.16.2'`.
- `pnpm-lock.yaml`: `follow-redirects` 1.16.1 → 1.16.2.

## Decisiones de diseño

- Se corrige igualmente aunque el gate de producción pase: es un advisory **con** parche, y la regla
  del proyecto es corregir con override, no aceptar ni ignorar. Además mantiene los tres frontends
  con el mismo pin y deja limpio el `pnpm audit` local (`pnpm security`).
- `1.16.2` es un patch de la propia librería; `axios` lo acepta (`^1.15.6`).

## Verificación

- `pnpm install` → lockfile con `follow-redirects@1.16.2`.
- `pnpm audit --prod` → `No known vulnerabilities found`.
- `pnpm lint` → 0 errores (8 warnings preexistentes).
- `pnpm type-check` → OK.
- `pnpm test-headless` → 20 ficheros / 70 tests OK.
- `pnpm build` → OK.
- Pendiente: `workflow_dispatch` de `Security Audit` tras el merge (opcional, ya estaba verde).
