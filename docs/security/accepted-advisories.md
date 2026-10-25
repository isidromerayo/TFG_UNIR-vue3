# 📌 Advisories aceptados (sin parche upstream)

**Regla**: un advisory sólo se "acepta" cuando **no existe** versión parcheada publicada. Se registra
aquí y se **vuelve a revisar en cada iteración** (cualquier PR que toque dependencias/seguridad y la
ejecución programada de `security.yml`). En cuanto haya parche, se retira el silencio y se actualiza
la dependencia **en la misma PR**.

**Chequeo automático**: `./scripts/check-accepted-advisories.sh` (`pnpm security:accepted`, paso
*Accepted advisories recheck* de `security.yml`). Consulta OSV y **falla** si algún advisory aceptado
ya tiene versión parcheada, o si ya no aplica a la versión registrada.

**Un advisory CON parche nunca se acepta**: se corrige con un override (`pnpm-workspace.yaml` →
`overrides`) — ver `AGENTS.md` → *pnpm & security*.

## Cómo se acepta (checklist)

1. Comprobar que es *unfixable*: `first_patched_version: null` / `patched_versions: <0.0.0`, y que
   OSV no publique un evento `fixed` para nuestro paquete/ecosistema.
2. Silenciarlo de forma quirúrgica (nunca por severidad ni con un `--ignore-unfixable` global):
   `ACCEPTED` del gate o `dismissed_reason` en Dependabot.
3. Añadir la entrada al bloque JSON de abajo con motivo, alcance (dev/prod) y ruta de dependencia.
4. Registrar la decisión en `README.md` / `AGENTS.md` si cambia el estado de seguridad del repo.

## Cómo se revisa (cada iteración)

```bash
pnpm security:accepted          # o: ./scripts/check-accepted-advisories.sh
```

- ✅ Si sigue sin parche: nada que hacer.
- ❌ Si ya hay parche, o si ya no aplica a la versión registrada: subir la dependencia, retirar el
  silencio (`ACCEPTED` / dismissal) y **borrar la entrada de este registro**.

## Registro

```json accepted-advisories
{
  "ecosystem": "npm",
  "advisories": [
    {
      "id": "GHSA-jmr9-qjv8-65gv",
      "package": "extract-zip",
      "version": "2.0.1",
      "route": ".>pa11y-ci>puppeteer>@puppeteer/browsers>extract-zip",
      "severity": "high",
      "scope": "dev",
      "reason": "Sin parche upstream: todas las versiones (<=2.0.1) vulnerables (patched <0.0.0). Dev-only via pa11y-ci/puppeteer. Extraccion de zips de Chromium en CI, sin entrada controlada por atacante."
    },
    {
      "id": "GHSA-7pqw-9j4j-h8q3",
      "package": "extract-zip",
      "version": "2.0.1",
      "route": ".>pa11y-ci>puppeteer>@puppeteer/browsers>extract-zip",
      "severity": "high",
      "scope": "dev",
      "reason": "Sin parche upstream: todas las versiones (<=2.0.1) vulnerables (patched <0.0.0). Dev-only via pa11y-ci/puppeteer. Extraccion de zips de Chromium en CI, sin entrada controlada por atacante."
    }
  ]
}
```
