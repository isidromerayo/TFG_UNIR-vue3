#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando archivos de cobertura...\n');

const coverageDir = path.join(__dirname, '..', 'coverage');
const expectedFiles = [
  'lcov.info',           // Vitest coverage
  'cypress/lcov.info',   // Cypress coverage
  'merged/lcov.info'     // Merged coverage
];

let allFilesExist = true;

expectedFiles.forEach(file => {
  const filePath = path.join(coverageDir, file);
  const exists = fs.existsSync(filePath);
  
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  
  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`   📊 Tamaño: ${(stats.size / 1024).toFixed(2)} KB`);
    
    // Verificar que el archivo no esté vacío
    if (stats.size === 0) {
      console.log(`   ⚠️  Archivo vacío`);
      allFilesExist = false;
    }
  } else {
    allFilesExist = false;
  }
  console.log('');
});

// Verificar contenido de archivos LCOV
console.log('📋 Verificando contenido de archivos LCOV...\n');

expectedFiles.forEach(file => {
  const filePath = path.join(coverageDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    const sfLines = lines.filter(line => line.startsWith('SF:'));
    
    console.log(`📄 ${file}:`);
    console.log(`   📝 Líneas totales: ${lines.length}`);
    console.log(`   📁 Archivos cubiertos: ${sfLines.length}`);
    
    if (sfLines.length > 0) {
      console.log(`   📂 Primer archivo: ${sfLines[0].replace('SF:', '')}`);
    }
    console.log('');
  }
});

// Verificar configuración de Vite para instrumentación
console.log('🔧 Verificando instrumentación...\n');

const viteConfigPath = path.join(__dirname, '..', 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  console.log('✅ vite.config.ts existe');
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  const hasSourcemap = viteConfig.includes('sourcemap');
  const hasCoverage = viteConfig.includes('__COVERAGE__') || viteConfig.includes('CYPRESS_COVERAGE');
  const hasIstanbul = viteConfig.includes('vite-plugin-istanbul') || viteConfig.includes('istanbul');
  console.log(`${hasSourcemap ? '✅' : '❌'} Sourcemap configurado`);
  console.log(`${hasCoverage ? '✅' : '❌'} Variables de cobertura configuradas`);
  console.log(`${hasIstanbul ? '✅' : '❌'} Plugin Istanbul configurado`);
} else {
  console.log('❌ vite.config.ts no encontrado');
  allFilesExist = false;
}

// Verificar configuración de Vitest
const vitestConfigExists = fs.existsSync(path.join(__dirname, '..', 'vitest.config.ts')) || 
                          fs.readFileSync(viteConfigPath, 'utf8').includes('vitest');
console.log(`${vitestConfigExists ? '✅' : '❌'} Configuración de Vitest`);

console.log('\n' + '='.repeat(50));
console.log(`🎯 Estado general: ${allFilesExist ? '✅ CORRECTO' : '❌ PROBLEMAS DETECTADOS'}`);

if (!allFilesExist) {
  console.log('\n💡 Sugerencias:');
  console.log('   1. Ejecutar: pnpm test:coverage');
  console.log('   2. Ejecutar: pnpm cypress:component:coverage');
  console.log('   3. Ejecutar: pnpm coverage:merge');
}

process.exit(allFilesExist ? 0 : 1);