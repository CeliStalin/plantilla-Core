// Script para verificar la exportación del DatePicker
// Ejecutar con: node verify-datepicker-export.js

import fs from 'fs';
import path from 'path';

console.log('🔍 Verificando exportaciones del DatePicker...\n');

// Verificar archivos de exportación
const filesToCheck = [
  'src/core/components/DatePicker/index.ts',
  'src/core/components/index.ts',
  'src/core/index.ts'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} existe`);
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('DatePicker')) {
      console.log(`   📝 Contiene referencia a DatePicker`);
    } else {
      console.log(`   ❌ NO contiene referencia a DatePicker`);
    }
  } else {
    console.log(`❌ ${file} NO existe`);
  }
});

console.log('\n📋 Pasos para solucionar el problema:');
console.log('1. Ejecutar: npm run build');
console.log('2. Verificar que el archivo dist/index.d.ts contenga DatePicker');
console.log('3. En tu app externa, usar: import { DatePicker } from "@consalud/core"');
console.log('4. O usar: import * as ConsaludCore from "@consalud/core" y luego <ConsaludCore.DatePicker />');

console.log('\n🔧 Si el problema persiste:');
console.log('- Verificar que la versión de @consalud/core esté actualizada');
console.log('- Limpiar node_modules y reinstalar: rm -rf node_modules && npm install');
console.log('- Verificar que TypeScript esté configurado correctamente'); 