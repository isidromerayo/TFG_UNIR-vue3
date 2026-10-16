#!/usr/bin/env bash
#
# check-accepted-advisories.sh
#
# Comprueba que los advisories "aceptados" (aquellos sin parche upstream cuando
# se aceptaron) sigan sin solución publicada. Regla y registro:
# docs/security/accepted-advisories.md
#
# Si OSV ya publica una versión parcheada para nuestro paquete/ecosistema, este
# script falla: hay que actualizar la dependencia, retirar el silencio
# (pnpm.auditConfig.ignoreCves / ACCEPTED del gate / dismissal de Dependabot) y
# borrar la entrada del registro en la misma iteración.
#
# Uso:      ./scripts/check-accepted-advisories.sh [ruta-al-registro]
# Requiere: bash, curl, jq  (OSV_API=https://api.osv.dev configurable)
#
set -uo pipefail

REGISTRY="${1:-docs/security/accepted-advisories.md}"
OSV_API="${OSV_API:-https://api.osv.dev}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

die() { echo "❌ $*" >&2; exit 1; }

[ -f "$REGISTRY" ] || die "no existe el registro de advisories aceptados: $REGISTRY"

REGISTRY_JSON="$(awk '/^```json accepted-advisories$/{f=1;next} f && /^```$/{f=0} f' "$REGISTRY")"
[ -n "$REGISTRY_JSON" ] || die "no se encontró el bloque de registro (json accepted-advisories) en $REGISTRY"
printf '%s' "$REGISTRY_JSON" | jq -e . >/dev/null 2>&1 || die "el bloque json del registro no es JSON válido"

ECOSYSTEM="$(printf '%s' "$REGISTRY_JSON" | jq -r '.ecosystem // ""')"
[ -n "$ECOSYSTEM" ] || die "el registro debe declarar \"ecosystem\""

TOTAL="$(printf '%s' "$REGISTRY_JSON" | jq -r '.advisories | length')"
echo "🔎 Advisories aceptados en el registro: $TOTAL (ecosystem: $ECOSYSTEM)"
echo

if [ "$TOTAL" -eq 0 ]; then
  echo "✅ No hay advisories aceptados: nada que revisar."
  exit 0
fi

FAILS=0
OFFLINE=0

while IFS=$'\t' read -r ID PKG VER ROUTE; do
  ADV=""

  # 1) Advisory por id (GHSA / OSV / CVE)
  HTTP="$(curl -sS -o "$TMP/adv.json" -w '%{http_code}' "$OSV_API/v1/vulns/$ID" 2>/dev/null)"
  RC=$?
  if [ "$RC" -eq 0 ] && [ "$HTTP" = "200" ]; then
    ADV="$(cat "$TMP/adv.json")"
  elif [ "$RC" -ne 0 ]; then
    OFFLINE=1
    break
  fi

  # 2) Fallback / comprobación de alcance: consulta por paquete+versión y cruce de id o alias
  QUERY_PAYLOAD="$(jq -nc --arg n "$PKG" --arg e "$ECOSYSTEM" --arg v "$VER" \
    '{package:{name:$n,ecosystem:$e},version:$v}')"
  HTTPQ="$(curl -sS -o "$TMP/query.json" -w '%{http_code}' -X POST "$OSV_API/v1/query" \
    -H 'Content-Type: application/json' -d "$QUERY_PAYLOAD" 2>/dev/null)"
  RCQ=$?
  if [ "$RCQ" -ne 0 ] || [ "$HTTPQ" != "200" ]; then
    OFFLINE=1
    break
  fi

  if [ -z "$ADV" ]; then
    ADV="$(jq -c --arg id "$ID" \
      '[.vulns[]? | select(.id == $id or ((.aliases // []) | index($id)))] | first // empty' "$TMP/query.json")"
  fi

  if [ -z "$ADV" ] || [ "$ADV" = "null" ]; then
    echo "❌ $ID ($PKG@$VER): OSV no devuelve ese advisory. Revisa el id del registro."
    FAILS=$((FAILS + 1))
    continue
  fi

  # ¿Hay ya una versión parcheada publicada para NUESTRO paquete/ecosistema?
  FIXED="$(printf '%s' "$ADV" | jq -r --arg pkg "$PKG" --arg eco "$ECOSYSTEM" \
    '[.affected[]? | select(.package.name == $pkg and .package.ecosystem == $eco) | .ranges[]?.events[]?.fixed? // empty] | unique | join(", ")')"

  if [ -n "$FIXED" ]; then
    echo "❌ $ID ($PKG@$VER): YA HAY PARCHE publicado → $FIXED"
    echo "   Acción: sube $PKG (override), retira el silencio y borra la entrada de $REGISTRY."
    FAILS=$((FAILS + 1))
    continue
  fi

  # ¿El advisory sigue afectando a la versión registrada? (si no, el registro está obsoleto)
  STILL="$(jq -r --arg id "$ID" \
    '[.vulns[]? | select(.id == $id or ((.aliases // []) | index($id)))] | length' "$TMP/query.json")"

  if [ "$STILL" = "0" ]; then
    echo "⚠️  $ID ($PKG@$VER): OSV ya no lo asocia a esa versión. Revisa el registro (¿dependencia actualizada?)."
    FAILS=$((FAILS + 1))
  else
    echo "✅ $ID ($PKG@$VER): sigue sin parche publicado. Ruta: $ROUTE"
  fi
done < <(printf '%s' "$REGISTRY_JSON" | jq -r '.advisories[] | [.id, .package, .version, (.route // "-")] | @tsv')

echo
if [ "$OFFLINE" -eq 1 ]; then
  echo "⚠️  No se pudo consultar OSV (¿sin red?). Revisión de advisories aceptados omitida."
  echo "::warning::check-accepted-advisories: OSV no accesible, revisión omitida"
  exit 0
fi

if [ "$FAILS" -gt 0 ]; then
  echo "❌ $FAILS advisory(ies) aceptado(s) requieren acción (ver arriba)."
  echo "   Regla: docs/security/accepted-advisories.md"
  exit 1
fi

echo "✅ Todos los advisories aceptados siguen sin parche publicado."
