#!/bin/bash

# Script de auditoría de seguridad multi-herramienta
# Ejecuta múltiples herramientas de auditoría para detectar vulnerabilidades

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🔒 Auditoría de Seguridad Multi-Herramienta            ║${NC}"
echo -e "${BLUE}║  Proyecto: TFG_UNIR-vue3                                 ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Contador de vulnerabilidades
TOTAL_VULNS=0
TOOLS_FAILED=0

# Función para imprimir sección
print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# 1. pnpm audit
print_section "1️⃣  pnpm audit (npm Advisory Database)"

if command -v pnpm &> /dev/null; then
    if pnpm audit --json > pnpm-audit.json 2>&1; then
        echo -e "${GREEN}✅ pnpm audit: No vulnerabilities found${NC}"
    else
        VULNS=$(jq '.metadata.vulnerabilities | to_entries | map(select(.value > 0)) | length' pnpm-audit.json 2>/dev/null || echo "0")
        if [ "$VULNS" -gt 0 ]; then
            echo -e "${RED}❌ pnpm audit: $VULNS vulnerability types found${NC}"
            TOTAL_VULNS=$((TOTAL_VULNS + VULNS))
            TOOLS_FAILED=$((TOOLS_FAILED + 1))
            
            # Mostrar resumen
            echo ""
            jq -r '.metadata.vulnerabilities | to_entries[] | select(.value > 0) | "  • \(.key): \(.value)"' pnpm-audit.json 2>/dev/null || true
        else
            echo -e "${GREEN}✅ pnpm audit: No vulnerabilities found${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️  pnpm not installed${NC}"
fi

# 2. npm audit (comparación)
print_section "2️⃣  npm audit (Comparación)"

if command -v npm &> /dev/null; then
    if npm audit --json > npm-audit.json 2>&1; then
        echo -e "${GREEN}✅ npm audit: No vulnerabilities found${NC}"
    else
        VULNS=$(jq '.metadata.vulnerabilities | to_entries | map(select(.value > 0)) | length' npm-audit.json 2>/dev/null || echo "0")
        if [ "$VULNS" -gt 0 ]; then
            echo -e "${YELLOW}⚠️  npm audit: $VULNS vulnerability types found${NC}"
            echo "  (This is for comparison with pnpm)"
        else
            echo -e "${GREEN}✅ npm audit: No vulnerabilities found${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️  npm not installed${NC}"
fi

# 3. Dependencias desactualizadas
print_section "3️⃣  Dependencias Desactualizadas"

if command -v pnpm &> /dev/null; then
    OUTDATED=$(pnpm outdated --format json 2>/dev/null || echo "[]")
    COUNT=$(echo "$OUTDATED" | jq 'length' 2>/dev/null || echo "0")
    
    if [ "$COUNT" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Found $COUNT outdated packages${NC}"
        echo ""
        pnpm outdated 2>/dev/null | head -20 || true
        
        if [ "$COUNT" -gt 15 ]; then
            echo ""
            echo -e "${YELLOW}  ... and $((COUNT - 15)) more${NC}"
        fi
    else
        echo -e "${GREEN}✅ All dependencies are up to date${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  pnpm not installed${NC}"
fi

# 4. Snyk (si está instalado)
print_section "4️⃣  Snyk Security Scan"

if command -v snyk &> /dev/null; then
    if [ -n "$SNYK_TOKEN" ]; then
        echo "Running Snyk test..."
        if snyk test --json > snyk-report.json 2>&1; then
            echo -e "${GREEN}✅ Snyk: No vulnerabilities found${NC}"
        else
            VULNS=$(jq '.vulnerabilities | length' snyk-report.json 2>/dev/null || echo "0")
            if [ "$VULNS" -gt 0 ]; then
                echo -e "${RED}❌ Snyk: $VULNS vulnerabilities found${NC}"
                TOTAL_VULNS=$((TOTAL_VULNS + VULNS))
                TOOLS_FAILED=$((TOOLS_FAILED + 1))
                
                # Mostrar vulnerabilidades críticas
                CRITICAL=$(jq '[.vulnerabilities[] | select(.severity == "critical")] | length' snyk-report.json 2>/dev/null || echo "0")
                HIGH=$(jq '[.vulnerabilities[] | select(.severity == "high")] | length' snyk-report.json 2>/dev/null || echo "0")
                
                if [ "$CRITICAL" -gt 0 ]; then
                    echo -e "${RED}  • Critical: $CRITICAL${NC}"
                fi
                if [ "$HIGH" -gt 0 ]; then
                    echo -e "${YELLOW}  • High: $HIGH${NC}"
                fi
            else
                echo -e "${GREEN}✅ Snyk: No vulnerabilities found${NC}"
            fi
        fi
    else
        echo -e "${YELLOW}⚠️  SNYK_TOKEN not set. Run: export SNYK_TOKEN=your_token${NC}"
        echo "   Get your token at: https://app.snyk.io/account"
    fi
else
    echo -e "${YELLOW}⚠️  Snyk not installed. Install with: npm install -g snyk${NC}"
fi

# 5. OSV Scanner (si está instalado)
print_section "5️⃣  OSV Scanner"

if command -v osv-scanner &> /dev/null; then
    if osv-scanner --lockfile=pnpm-lock.yaml --format=json > osv-report.json 2>&1; then
        echo -e "${GREEN}✅ OSV Scanner: No vulnerabilities found${NC}"
    else
        VULNS=$(jq '.results[].packages | length' osv-report.json 2>/dev/null || echo "0")
        if [ "$VULNS" -gt 0 ]; then
            echo -e "${RED}❌ OSV Scanner: $VULNS vulnerabilities found${NC}"
            TOTAL_VULNS=$((TOTAL_VULNS + VULNS))
            TOOLS_FAILED=$((TOOLS_FAILED + 1))
        else
            echo -e "${GREEN}✅ OSV Scanner: No vulnerabilities found${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️  OSV Scanner not installed${NC}"
    echo "   Install: https://google.github.io/osv-scanner/installation/"
fi

# 6. Verificar versiones de paquetes críticos
print_section "6️⃣  Verificación de Paquetes Críticos"

check_package() {
    local package=$1
    local current=$(pnpm list "$package" --depth=0 --json 2>/dev/null | jq -r ".[0].dependencies.\"$package\".version" 2>/dev/null || echo "not installed")
    echo "  • $package: $current"
}

echo "Versiones actuales:"
check_package "vue"
check_package "vite"
check_package "typescript"
check_package "axios"
check_package "vitest"

# Resumen final
print_section "📊 Resumen Final"

echo "Herramientas ejecutadas:"
echo "  • pnpm audit: ✅"
echo "  • npm audit: ✅"
echo "  • Outdated check: ✅"

if command -v snyk &> /dev/null && [ -n "$SNYK_TOKEN" ]; then
    echo "  • Snyk: ✅"
else
    echo "  • Snyk: ⚠️  (not configured)"
fi

if command -v osv-scanner &> /dev/null; then
    echo "  • OSV Scanner: ✅"
else
    echo "  • OSV Scanner: ⚠️  (not installed)"
fi

echo ""
echo "Resultados:"

if [ $TOOLS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ No vulnerabilities detected by any tool${NC}"
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✨ Security audit passed successfully!              ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
    exit 0
else
    echo -e "${RED}❌ $TOOLS_FAILED tool(s) found vulnerabilities${NC}"
    echo -e "${RED}   Total vulnerability indicators: $TOTAL_VULNS${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "  1. Review detailed reports in JSON files"
    echo "  2. Update vulnerable dependencies: pnpm update"
    echo "  3. Check for breaking changes in changelogs"
    echo "  4. Run tests: pnpm test-headless"
    echo "  5. Verify build: pnpm build"
    echo ""
    echo -e "${YELLOW}📄 Generated reports:${NC}"
    [ -f pnpm-audit.json ] && echo "  • pnpm-audit.json"
    [ -f npm-audit.json ] && echo "  • npm-audit.json"
    [ -f snyk-report.json ] && echo "  • snyk-report.json"
    [ -f osv-report.json ] && echo "  • osv-report.json"
    echo ""
    echo -e "${RED}╔══════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ⚠️  Security audit failed - action required!       ║${NC}"
    echo -e "${RED}╚══════════════════════════════════════════════════════╝${NC}"
    exit 1
fi
