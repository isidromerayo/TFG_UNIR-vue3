#!/bin/bash

# Script de migración de npm a pnpm para proyecto Vue3
# Autor: Sistema de migración automática
# Fecha: 2024-12-06

set -e  # Salir si hay algún error

echo "🚀 Iniciando migración de npm a pnpm..."
echo ""

# Verificar que pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm no está instalado"
    echo "Instala pnpm con: npm install -g pnpm"
    exit 1
fi

echo "✅ pnpm está instalado: $(pnpm --version)"
echo ""

# Backup de archivos importantes
echo "📦 Creando backup de package-lock.json..."
if [ -f "package-lock.json" ]; then
    cp package-lock.json package-lock.json.backup
    echo "✅ Backup creado: package-lock.json.backup"
fi
echo ""

# Limpiar node_modules y lockfile de npm
echo "🧹 Limpiando instalación anterior..."
rm -rf node_modules
rm -f package-lock.json
echo "✅ Limpieza completada"
echo ""

# Instalar dependencias con pnpm
echo "📥 Instalando dependencias con pnpm..."
pnpm install
echo "✅ Dependencias instaladas"
echo ""

# Verificar la instalación
echo "🔍 Verificando instalación..."
if [ -f "pnpm-lock.yaml" ]; then
    echo "✅ pnpm-lock.yaml creado correctamente"
else
    echo "❌ Error: pnpm-lock.yaml no fue creado"
    exit 1
fi
echo ""

# Auditoría de seguridad
echo "🔒 Ejecutando auditoría de seguridad..."
pnpm audit || echo "⚠️  Se encontraron algunas vulnerabilidades (revisar manualmente)"
echo ""

# Verificar que el proyecto compila
echo "🏗️  Verificando build del proyecto..."
pnpm run build
echo "✅ Build exitoso"
echo ""

echo "✨ ¡Migración completada exitosamente!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Revisar que todo funciona: pnpm run dev"
echo "2. Ejecutar tests: pnpm run test-headless"
echo "3. Commit de cambios: git add . && git commit -m 'chore: migrate to pnpm'"
echo ""
echo "💡 Comandos útiles:"
echo "  - pnpm add <pkg>         # Instalar paquete"
echo "  - pnpm remove <pkg>      # Remover paquete"
echo "  - pnpm update            # Actualizar dependencias"
echo "  - pnpm audit             # Auditoría de seguridad"
echo ""
